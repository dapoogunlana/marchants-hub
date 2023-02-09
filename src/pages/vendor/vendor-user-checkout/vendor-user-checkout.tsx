import { Formik, FormikProps, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import StoreFooter from '../../../components/block-components/store-footer/store-footer';
import StoreHeader from '../../../components/block-components/store-header/store-header';
import { IorderSettings, Iproduct, sampleOrderSettings, sampleProdut } from '../../../services/constants/interfaces/product-and-orders-schema';
import { IsessionData } from '../../../services/constants/interfaces/state-schemas';
import { routeConstants } from '../../../services/constants/route-constants';
import { regexConstants } from '../../../services/constants/validation-regex';
import { PaystackButton } from "react-paystack"
import { sendRequest } from '../../../services/utils/request';
import './vendor-user-checkout.scss';
import { apiKeys } from '../../../config/environment';
import { calculateProductCost } from '../../../services/utils/product-cost-service';
import { IstoreState } from '../../../services/constants/interfaces/data-schemas';

function VendorUserCheckout() {
  
  const [purchaseStarted, setPurchaseStarted] = useState(1);
  const [productList, setProductList] = useState<any[]>([]);
  const [settings, setSettings] = useState<IorderSettings>(sampleOrderSettings);
  // const
  const [orderData, setOrderData] = useState<any>({});
  const activeProduct = useSelector((state: IstoreState) => state.activeProduct);

  const params = useParams();
  const id = params.id;
  const slug = params.slug;

  const [storeName, setStoreName] = useState('STORE');

  const paystackComponentProps = {
    email: orderData.customerEmail,
    amount: orderData.totalCost * 100,
    address: orderData.customerAddress,
    reference: orderData.reference,
    metadata: {
      name: orderData.customerName,
      phone: orderData.customerPhoneNumber,
      custom_fields: []
    },
    publicKey: apiKeys.paystackPublicKey,
    text: "Pay Now",
    onSuccess: () => completePayment(),
    onClose: () => console.log('Closed'),
  }

  const completePayment = () => {
    setPurchaseStarted(2);
    sendRequest({
      url: 'orders',
      method: 'POST',
      body: orderData
    }, (res: any) => {
      toast.success(res.message);
      setPurchaseStarted(3);
    }, (err: any) => {
      toast.error(err.message);
      setPurchaseStarted(1);
    });
  }

  const listProducts = (count: any) => {
    const list = [];
    list.push({
        product: 'product._id',
        quantity: count,
        amount: 'product.amount'
    });
    setProductList(list);
  }

  const getCostRates = () => {
    sendRequest({
        url: `get/setting`,
        method: 'POST',
    }, (res: any) => {
      setSettings(res.data[0] || sampleOrderSettings);
    }, (err: any) => {});
  }

  const validate = (values: FormikValues) => {   
      const errors: any = {};

      if (!values.name) {
          errors.name = 'Buyer\'s name is required';
      }
      if(!values.phoneNumber) {
        errors.phoneNumber = 'Phone number is required';
      } else if(!regexConstants.phonePattern.test(values.phoneNumber)) {
        errors.phoneNumber = 'Invalid phone number';
      } else if(values.phoneNumber.length > 11) {
        errors.phoneNumber = 'Invalid phone number';
      }
      if(!values.email) {
        errors.email = 'Email is required';
      } else if(!regexConstants.emailPattern.test(values.email)) {
        errors.email = 'Invalid email';
      }
      if (!values.address) {
          errors.address = 'Address is required';
      }
  
      return errors;
  }

  const triggerPurchase = (values: any, control: any) => {
    
    const deliveryCost = 1000;
    const otherCosts = calculateProductCost(productList, settings);
    const newPayload = {
      customerName: values.name,
      storeSlug: slug,
      deliveryDistance: 5,
      isPaid: true,
      reference: `REF-${new Date().getTime()}-${id}`,
      customerEmail: values.email,
      customerPhoneNumber: values.phoneNumber,
      customerAddress: values.address,
      products: productList,
      deliveryCost: deliveryCost,
      productsCost: otherCosts.productsCost,
      charges: otherCosts.charges, 
      totalCost: otherCosts.totalCost
    }
    setOrderData(newPayload);

    console.log({orderData, values});
    setTimeout(() => {
      console.log({orderData2: orderData})
      const paystack_trigger: HTMLElement | null = document.querySelector('.paystack_trigger');
      paystack_trigger && paystack_trigger.click();
    }, 500);
  }
  const previousPage = () => {
    window.history.back();
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getCostRates();
    setStoreName((slug?.replace(/-/g, ' ') || storeName).substring(0, 20).toLocaleLowerCase());
  }, []);
  
  return (
    <>
      <StoreHeader storeName={storeName} />
      <div className='single-store-item py-5'>
        <div className='w90 max1300'>
          <button className='hollow-button reduced-soft px-3' onClick={() => previousPage()}>Back</button>
        </div>
        <div className='w90 max550'>
          <div className='handle'>
            <div className='handle-end left'></div>
            <div className='handle-line'></div>
            <div className='handle-end right'></div>
          </div>
        </div>
        <div className='w90 max1200'>
              <Formik
                initialValues={{
                  name: '',
                  phoneNumber: '',
                  email: '',
                  address: '',
                }}
                validate={(values) => validate(values)}
                onSubmit={(values, control) => triggerPurchase(values, control)}
              >
                {
                  (fProps: FormikProps<{
                    name: string,
                    phoneNumber: string,
                    email: string,
                    address: string,
                  }>) => {
                    const {
                      values,
                      isSubmitting,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                    } = fProps;
                    return <form action="" onSubmit={handleSubmit}>
                      <div>
                        <div className={'store-card2' + (purchaseStarted !== 1 ? ' full-hidden' : '')}>
                          <h4 className='text-center pt-4 pb-3'>Enter Buyer Details</h4>
                          <div className='reg-card my-3 reduced'>
                              <input
                                  type="text"
                                  placeholder='Enter name'
                                  id='name'
                                  value={values.name}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  className={(errors.name && touched.name) ? 'im-error' : ''}
                              />
                              {
                                  errors.name && touched.name &&
                                  <p className='reduced error-popup pt-1 mb-0'>{errors.name}</p>
                              }
                          </div>
                          <div className='reg-card my-3 reduced'>
                              <input
                                  type="text"
                                  placeholder='Enter phone number'
                                  id='phoneNumber'
                                  value={values.phoneNumber}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  className={(errors.phoneNumber && touched.phoneNumber) ? 'im-error' : ''}
                              />
                              {
                                  errors.phoneNumber && touched.phoneNumber &&
                                  <p className='reduced error-popup pt-1 mb-0'>{errors.phoneNumber}</p>
                              }
                          </div>
                          <div className='reg-card my-3 reduced'>
                              <input
                                  type="text"
                                  placeholder='Enter email'
                                  id='email'
                                  value={values.email}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  className={(errors.email && touched.email) ? 'im-error' : ''}
                              />
                              {
                                  errors.email && touched.email &&
                                  <p className='reduced error-popup pt-1 mb-0'>{errors.email}</p>
                              }
                          </div>
                          <div className='reg-card my-3 reduced'>
                              <input
                                  type="text"
                                  placeholder='Enter address'
                                  id='address'
                                  value={values.address}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  className={(errors.address && touched.address) ? 'im-error' : ''}
                              />
                              {
                                  errors.address && touched.address &&
                                  <p className='reduced error-popup pt-1 mb-0'>{errors.address}</p>
                              }
                          </div>
                          <div className='text-center pt-2'>
                            <button className='solid-button reduced-soft' type='submit'>Proceed</button>
                          </div>
                        </div>

                        <div className={'store-card2' + (purchaseStarted !== 2 ? ' full-hidden' : '')}>
                          <h4 className='text-center py-5'>Processing . . .</h4>
                        </div>

                        <div className={'store-card2' + (purchaseStarted !== 3 ? ' full-hidden' : '')}>
                          <div className='text-center py-5'>
                            <h4 className='pb-3'>Successful</h4>
                            <button className='solid-button' onClick={previousPage}>Finish</button>
                          </div>
                        </div>

                      </div>
                    </form>
                  }
                }
              </Formik>
        </div>
      </div>
      <StoreFooter storeName={storeName} />
      <div className='full-hidden'>
        <PaystackButton className='paystack_trigger' {...paystackComponentProps} />
      </div>
    </>
  );
}

export default VendorUserCheckout;
