import { Formik, FormikProps, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import StoreFooter from '../../../components/block-components/store-footer/store-footer';
import StoreHeader from '../../../components/block-components/store-header/store-header';
import { Iproduct, sampleProdut } from '../../../services/constants/interfaces/product-and-orders-schema';
import { regexConstants } from '../../../services/constants/validation-regex';
import { sendRequest } from '../../../services/utils/request';
import './vendor-online-store-item.scss';
import { apiKeys } from '../../../config/environment';
import { addCartItem } from '../../../services/actions/cart-actions';
import { IstoreState } from '../../../services/constants/interfaces/data-schemas';
import { removeActiveProduct, setActiveProduct } from '../../../services/actions/product-actions';
import { routeConstants } from '../../../services/constants/route-constants';
import { formatNumber } from '../../../services/utils/data-manipulation-utilits';

function VendorOnlineStoreItem() {
  
  const [product, setProduct] = useState<Iproduct>(sampleProdut);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const id = params.id;
  const slug = params.slug;

  const [storeName, setStoreName] = useState('STORE');
  
  // const activeProduct = useSelector((state: IstoreState) => state.activeProduct);

  const getProduct = () => {
    sendRequest({
        url: `products/` + id
    }, (res: any) => {
        console.log({res})
        setProduct(res.data)
    }, (err: any) => {
    });
    dispatch(removeActiveProduct());
  }

  const goToNext = (values: any, errors: any) => {
    if(!values.quantity || !values.specifications || errors.quantity || errors.specifications) {
      toast.warning('Fill necessary fields to proceed');
      return;
    }
    dispatch(setActiveProduct({...product, quantity: values.quantity, specifications: values.specifications}));
    navigate(`/${routeConstants.checkout}/${slug}`);
  }

  const validate = (values: FormikValues) => {   
      const errors: any = {};

      if (!values.quantity) {
          errors.quantity = 'Order quantity is required';
      } else if (values.quantity > product.availableQuantity) {
        errors.quantity = 'Store doesn\'t have up to this amount left';
      }
      if (!values.specifications) {
          errors.specifications = 'Order specifications is required';
      }
  
      return errors;
  }

  const triggerPurchase = (values: any, control: any) => {}

  const addProductToCart = (product: any) => {
    dispatch(addCartItem(product));
  }

  const previousPage = () => {
    window.history.back();
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getProduct();
    setStoreName((slug?.replace(/-/g, ' ') || storeName).substring(0, 20).toLocaleLowerCase());
  }, []);
  
  return (
    <>
      <StoreHeader storeName={storeName} />
      <div className='single-store-item py-5'>
        <div className='w90 max550'>
          <button className='hollow-button reduced-soft px-3' onClick={() => previousPage()}>Back</button>
        </div>
        <div className='w90 max1200'>
              <Formik
                initialValues={{
                  quantity: '',
                  specifications: '',
                }}
                validate={(values) => validate(values)}
                onSubmit={(values, control) => triggerPurchase(values, control)}
              >
                {
                  (fProps: FormikProps<{
                    quantity: string,
                    specifications: string,
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
                        <div className={'store-card'}>
                          <div className='image-holder imh'>
                            <img src={product.images[0]?.photoUrl} alt="" />
                          </div>
                          <div className='text-holder'>
                            <h6 className=''>{product.name}</h6>
                            <p className='reduced c-dark-grey'>{product.description}</p>
                            <div className='spread-info'>
                              <h6 className='mb-0 increased'>₦{formatNumber(product.amount)}</h6>
                              <p className='mb-0'>{product.availableQuantity} in stock</p>
                            </div>
                            <div className='row pt-4 pb-2'>
                              <div className='col-sm-8'>
                                <textarea
                                    placeholder='Enter order details such as size'
                                    id='specifications'
                                    value={values.specifications}
                                    onBlur={handleBlur}
                                    rows={2}
                                    onFocus={() => errors.specifications = ''}
                                    onChange={handleChange}
                                    className={(errors.specifications && touched.specifications) ? 'im-error' : ''}
                                ></textarea>
                                {
                                    errors.specifications && touched.specifications &&
                                    <p className='reduced error-popup pt-1 mb-0'>{errors.specifications}</p>
                                }
                              </div>
                              <div className='col-sm-4'>
                                <input
                                    type="number"
                                    placeholder='Quantity'
                                    id='quantity'
                                    value={values.quantity}
                                    onBlur={handleBlur}
                                    onFocus={() => errors.quantity = ''}
                                    onChange={handleChange}
                                    className={(errors.quantity && touched.quantity) ? 'im-error' : ''}
                                />
                                {
                                    errors.quantity && touched.quantity &&
                                    <p className='reduced error-popup pt-1 mb-0'>{errors.quantity}</p>
                                }
                              </div>
                            </div>
                            <div className='info-grid pt-2'>
                              <button className='solid-button reduced-soft' type='button' onClick={() => goToNext(values, errors)}>Buy Now</button>
                              <span></span>
                              <button className='hollow-button reduced-soft' type='button' onClick={() => addProductToCart(product)}>Add to Cart</button>
                            </div>
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

export default VendorOnlineStoreItem;
