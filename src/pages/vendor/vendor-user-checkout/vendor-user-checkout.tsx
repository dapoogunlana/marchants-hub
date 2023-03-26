import { Formik, FormikProps, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import StoreFooter from '../../../components/block-components/store-footer/store-footer';
import StoreHeader from '../../../components/block-components/store-header/store-header';
import { IorderSettings, Iproduct, sampleOrderSettings, sampleProdut } from '../../../services/constants/interfaces/product-and-orders-schema';
import { routeConstants } from '../../../services/constants/route-constants';
import { regexConstants } from '../../../services/constants/validation-regex';
import { sendRequest } from '../../../services/utils/request';
import './vendor-user-checkout.scss';
import { calculateProductCost, prepareCreateOrderPayload } from '../../../services/utils/product-cost-service';
import { IstoreState } from '../../../services/constants/interfaces/data-schemas';
import { formatNumber } from '../../../services/utils/data-manipulation-utilits';
import { removeActiveProduct } from '../../../services/actions/product-actions';
import { clearCart } from '../../../services/actions/cart-actions';
import { Link } from 'react-router-dom';

function VendorUserCheckout() {
  
  const [purchaseStarted, setPurchaseStarted] = useState(1);
  const [buyerData, setBuyerData] = useState<any>({});
  // const
  const [processingPayment, setProcessingPayment] = useState(false);
  const productList = useSelector((item: IstoreState) => item.activeProduct?.amount ? item.cart.concat(item.activeProduct) : item.cart);
  const dispatch = useDispatch();

  const params = useParams();
  const id = params.id;
  const slug = params.slug;

  const [storeName, setStoreName] = useState('STORE');
  const [costs, setCosts] = useState<any>({});
  const [sellerAccountDetails, setSellerAccountDetails] = useState<any>({});
  const [gettingSellerDetails, setGettingSellerDetails] = useState(0);

  const getCostRates = () => {
    sendRequest({
        url: `get/setting`,
        method: 'POST',
    }, (res: any) => {
      getOrderCosts(res.data[0] || sampleOrderSettings);
    }, (err: any) => {});
  }

  const getSellerAccountDetails = () => {
    setGettingSellerDetails(0);
    sendRequest({
        url: `orders/account-details/${slug}`,
        method: 'GET',
    }, (res: any) => {
      setSellerAccountDetails(res.data || {});
      setGettingSellerDetails(1);
    }, (err: any) => {
      if(!sellerAccountDetails.account_name) {
        setGettingSellerDetails(2);
      } else {
        setGettingSellerDetails(1);
      }
    });
  }

  const getOrderCosts = (cost: IorderSettings) => {
    const costEstimate = calculateProductCost(productList, cost);
    setCosts(costEstimate);
  }

  const completePayment = () => {
    // setPurchaseStarted(2);
    setProcessingPayment(true);
    sendRequest({
      url: 'orders',
      method: 'POST',
      body: prepareCreateOrderPayload(productList, costs, buyerData, sellerAccountDetails, slug || ''),
    }, (res: any) => {
      setProcessingPayment(false);
      toast.success(res.message);
      setPurchaseStarted(4);
      dispatch(removeActiveProduct());
      dispatch(clearCart());
    }, (err: any) => {
      setProcessingPayment(false);
      toast.error(err.message);
      setPurchaseStarted(1);
    });
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
    setBuyerData(values);
    setPurchaseStarted(2);
  }

  const proceedToTransfer = () => {
    console.log({sellerAccountDetails})
    setPurchaseStarted(3);
  }

  const previousPage = () => {
    window.history.back();
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getCostRates();
    getSellerAccountDetails();
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
                        <div className='checkout-progress'>
                          <div className={'left' + (purchaseStarted === 1 ? ' active-side' : '')}>
                            <div className='text-holder'>
                              <p>Buyer details</p>
                            </div>
                            <div className='circle'></div>
                          </div>
                          <div className='middle'></div>
                          <div className={'left' + (purchaseStarted > 1 ? ' active-side' : '')}>
                            <div className='text-holder'>
                              <p>Payment</p>
                            </div>
                            <div className='circle'></div>
                          </div>
                        </div>
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

                        <div className={(purchaseStarted !== 2 ? ' full-hidden' : '')}>
                          <div className='w90 max450'>
                            <div className='py-3 px-3 spread-info summary-green-space' style={{borderBottomWidth: 1}}>
                              <div className=''>
                                <p className='reduced-x mb-0'>Total Items</p>
                                <h2 className='h-black mb-0'>{productList.length}</h2>
                              </div>
                              <div className=''>
                                <p className='reduced-x mb-0'>Delivery fee</p>
                                <h2 className='h-black mb-0'>N{formatNumber(costs.deliveryCost)}</h2>
                              </div>
                              <div className=''>
                                <p className='reduced-x mb-0'>Charges</p>
                                <h2 className='h-black mb-0'>N{formatNumber(costs.charges)}</h2>
                              </div>
                            </div>
                            <div className='py-3 px-3 summary-green-space'>
                              <div className=''>
                                <p className='reduced-x mb-0'>Total Amount</p>
                                <h2 className='h-black mb-0'>N{formatNumber(costs.totalCost)}</h2>
                              </div>
                            </div>
                          </div>
                          <div className='store-card2 mt-5'>
                            <h5 className='text-center pt-0 pb-3'>Payment options</h5>
                            <div className='summary-green-space-button clickable' onClick={proceedToTransfer}>
                              <p className='mb-0 reduced'>Bank transfer</p>
                            </div>
                          </div>
                        </div>

                        <div className={'store-card2' + (purchaseStarted !== 3 ? ' full-hidden' : '')}>
                          <div className=''>
                            <div className='pt-3 px-3 spread-info summary-green-grid-space'>
                              <div className=''>
                                <p className='reduced-x mb-0'>Bank</p>
                                <h6 className='h-black mb-0'>Providus Bank</h6>
                              </div>
                              <div className=''>
                                <p className='reduced-x mb-0'>Account Number</p>
                                <h6 className='h-black mb-0'>{sellerAccountDetails.account_number}</h6>
                              </div>
                            </div>
                            <div className='pb-3 pt-2 px-3 spread-info summary-green-space' style={{borderBottomWidth: 1}}>
                              <div className=''>
                                <p className='reduced-x mb-0'>Account Name</p>
                                <h6 className='h-black mb-0'>{sellerAccountDetails.account_name}</h6>
                              </div>
                            </div>
                            <div className='py-3 px-3 summary-green-space'>
                              <div className=''>
                                <p className='reduced-x mb-0'>Total Order Amount</p>
                                <h2 className='h-black mb-0'>N{formatNumber(costs.totalCost)}</h2>
                              </div>
                            </div>
                            {
                              gettingSellerDetails === 0 &&
                              <p className='text-center py-3 reduced-soft'>
                                Requesting seller's account details.
                              </p>
                            }
                            {
                              gettingSellerDetails === 1 &&
                              <p className='text-center py-3 reduced-soft'>
                                Transfer the money to the seller then press the complete button to finish your order.
                              </p>
                            }
                            {
                              gettingSellerDetails === 2 &&
                              <p className='text-center py-3 reduced-soft'>
                                Failed to retrieve seller's account details try to request details again.
                              </p>
                            }
                            <div className={'p-2 text-center summary-green-space-button clickable' + ((processingPayment || gettingSellerDetails === 0) ? ' deactivated' : '')}>
                              {
                                gettingSellerDetails === 1 &&
                                <p className='mb-0 h-bold reduced-soft' onClick={completePayment}>{processingPayment ? 'Processing...' : 'Complete Order'}</p>
                              }
                              {
                                (gettingSellerDetails === 0 || gettingSellerDetails === 2) &&
                                <p className={'mb-0 h-bold reduced-soft' + ((gettingSellerDetails === 0) ? ' deactivated' : '')} onClick={getSellerAccountDetails}>{gettingSellerDetails === 0 ? 'Requesting...' : 'Request Details'}</p>
                              }
                            </div>
                          </div>
                        </div>

                        <div className={'store-card2' + (purchaseStarted !== 4 ? ' full-hidden' : '')}>
                          <div className='text-center py-5'>
                            <h4 className='pb-3'>Order Successful</h4>
                            <Link to={`/${routeConstants.onlineStore}/${slug}`}>
                              <button className='solid-button' type={'button'}>Back to list</button>
                            </Link>
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
    </>
  );
}

export default VendorUserCheckout;
