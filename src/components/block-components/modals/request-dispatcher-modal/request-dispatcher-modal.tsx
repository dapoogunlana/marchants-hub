import React, { useEffect, useState } from "react";
import { Formik, Field, FormikProps, FormikValues } from 'formik';
import { closeAppModal, openModal } from "../../../../services/utils/app-data-modal-service";
import Select from "react-select";
import { sendRequest } from "../../../../services/utils/request";
import { toast } from "react-toastify";
import { prepareNewProductForm } from "../../../../services/utils/form-preparation-service";
import { acceptOnlyNumbers } from "../../../../services/utils/data-manipulation-utilits";
import { getCities, getStates } from "../../../../services/utils/core-api-util";

const RequestDispatcherModal = (props: any) => {
  const [response, setResponse] = useState<any>();
  const [states, setStates] = useState([]);
  const [pickupLgaList, setPickupLgaList] = useState([]);
  const [deliveryLgaList, setDeliveryLgaList] = useState([]);
  const [dispatcherList, setDispatcherList] = useState([]);
  const id = props.product?._id;
  const closeModal = (feedback: any) => {
    closeAppModal(()=> props.closeModal(feedback));
  };
  const getStateList = () => {
      getStates((states: any)=> {
          setStates(states);
      });
  }

  const statePickupChange = (change: any, setValues: Function, values: FormikValues) => { 
      const stateCode = change.target.value;
      console.log({values, stateCode})
      setValues({...values, pickupState: stateCode, pickupCity: ''})
      setPickupLgaList([]);
      if (stateCode) {
          getCities(stateCode,(lgas: any)=> {
          setPickupLgaList(lgas);
          });
      }
  }

  const stateDeliveryChange = (change: any, setValues: Function, values: FormikValues) => { 
    const stateCode = change.target.value;
    console.log({values, stateCode})
    setValues({...values, deliveryState: stateCode, deliveryCity: ''})
    setDeliveryLgaList([]);
    if (stateCode) {
        getCities(stateCode,(lgas: any)=> {
        setDeliveryLgaList(lgas);
        });
    }
  }

  const getDispatchers = () => {
      sendRequest({
        url: 'get/user?role=Dispatcher',
        method: 'POST',
        body: {
          "fields": "businessName, numOfDeliveries"
        }
      }, (res: any) => {
        setDispatcherList(res.data || []);
      }, (err: any) => {
      });
  }

  const validate = (values: FormikValues) => {   
      const errors: any = {};
  
      if (!values.pickupState) {
          errors.pickupState = 'Pickup state is required';
      }
      if (!values.pickupCity) {
          errors.pickupCity = 'Pickup city is required';
      }
      if (!values.deliveryState) {
          errors.deliveryState = 'Delivery state is required';
      }
      if (!values.deliveryCity) {
          errors.deliveryCity = 'Delivery city is required';
      }
      if (!values.dispatcher) {
        errors.dispatcher = 'Dispatcher is required';
      }

      return errors;
  }

  const saveProduct = (values: any, controls: any) => {
    sendRequest({
      url: 'orders/request-dispatch',
      method: 'POST',
      body: {
        ...values,
        order: props.orderId
      },
    }, (res: any) => {
      toast.success(res.message);
      controls.setSubmitting(false);
      closeModal('refresh');
    }, (err: any) => {
        controls.setSubmitting(false);
        setResponse(<p className='c-red mb-0 pt-2'>{err.error?.emailError || err.message || 'Unable to complete'}</p>);
        toast.error(err.error?.emailError || err.message || 'Unable to complete');
    });
  }

  useEffect(() => {
    getStateList();
    getDispatchers();
    openModal();
  }, []);

  return (
    <div className="app-data-modal">
      <div className="modal-bg"></div>
      <div className={"modal-container small no-pad"}>
        <div className="modal-content">
          
          {/* Any content goes in here */}
          <div>
             <Formik initialValues={{
                pickupState: '',
                pickupCity: '',
                deliveryState: '',
                deliveryCity: '', 
                dispatcher: '', 
            }}
            validate={(value) => validate(value)}
            onSubmit={(values, controls) => saveProduct(values, controls)}
            // onSubmit={(values, controls) => console.log('values, controls')}
            >
                {
                    (Props: FormikProps<{
                      pickupState: string,
                      pickupCity: string,
                      deliveryState: string,
                      deliveryCity: string,
                      dispatcher: string,
                    }>) => {
                        const {
                            values,
                            errors,
                            touched,
                            isSubmitting,
                            handleSubmit,
                            handleBlur,
                            handleChange,
                            setValues,
                            setFieldValue,
                            isValid,
                        } = Props;
                        return (
                            <form action="" onSubmit={handleSubmit}>
                              <h6 className="increased-soft pt-3 pb-1 modal-space-sect">Request dispatcher</h6>
                              <div className="modal-space-sect pt-4 pb-2">
                                <p className="mb-2 reduced-soft">
                                  After making a request, the dispatcher will be notified and they will contact you. If you 
                                  don’t hear from the dispatcher in 30mins. You can make a request to another dispatcher
                                </p>
                                <p className="mb-0 reduced-soft c-grey-mid">Select pickup location</p>
                                <div className="info-grid">
                                  <div className='styled-form2'>
                                      <select
                                          id='pickupState'
                                          style={{borderRadius: '3px', padding: '7px 15px'}}
                                          value={values.pickupState}
                                          onBlur={handleBlur}
                                          onFocus={() => errors.pickupState = ''}
                                          onChange={(change: any) => {handleChange(change); statePickupChange(change, setValues, values)}}
                                          className={(errors.pickupState && touched.pickupState) ? 'im-error' : ''}
                                      >
                                          <option value="" disabled>State</option>
                                          {
                                              states.map((item: any, index) => {
                                                  return <option key={index} value={item.id}>{item.name}</option>
                                              })
                                          }
                                      </select>
                                      {
                                          errors.pickupState && touched.pickupState &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.pickupState}</p>
                                      }
                                  </div>
                                  <span></span>
                                  <div className='styled-form2'>
                                      <select
                                          id='pickupCity'
                                          style={{borderRadius: '3px', padding: '7px 15px'}}
                                          value={values.pickupCity}
                                          onBlur={handleBlur}
                                          onFocus={() => errors.pickupCity = ''}
                                          onChange={handleChange}
                                          className={(errors.pickupCity && touched.pickupCity) ? 'im-error' : ''}
                                      >
                                          <option value="" disabled>LGA</option>
                                          {
                                              pickupLgaList.map((item: any, index) => {
                                                  return <option key={index} value={item}>{item}</option>
                                              })
                                          }
                                      </select>
                                      {
                                          errors.pickupCity && touched.pickupCity &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.pickupCity}</p>
                                      }
                                  </div>
                                </div>
                              </div>
                              <div className="modal-space-clear py-2">
                                <p className="mb-0 reduced-soft c-grey-mid">Select delivery location</p>
                                <div className="info-grid">
                                  <div className='styled-form2'>
                                      <select
                                          id='deliveryState'
                                          style={{borderRadius: '3px', padding: '7px 15px'}}
                                          value={values.deliveryState}
                                          onBlur={handleBlur}
                                          onFocus={() => errors.deliveryState = ''}
                                          onChange={(change: any) => {handleChange(change); stateDeliveryChange(change, setValues, values)}}
                                          className={(errors.deliveryState && touched.deliveryState) ? 'im-error' : ''}
                                      >
                                          <option value="" disabled>State</option>
                                          {
                                              states.map((item: any, index) => {
                                                  return <option key={index} value={item.id}>{item.name}</option>
                                              })
                                          }
                                      </select>
                                      {
                                          errors.deliveryState && touched.deliveryState &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.deliveryState}</p>
                                      }
                                  </div>
                                  <span></span>
                                  <div className='styled-form2'>
                                      <select
                                          id='deliveryCity'
                                          style={{borderRadius: '3px', padding: '7px 15px'}}
                                          value={values.deliveryCity}
                                          onBlur={handleBlur}
                                          onFocus={() => errors.deliveryCity = ''}
                                          onChange={handleChange}
                                          className={(errors.deliveryCity && touched.deliveryCity) ? 'im-error' : ''}
                                      >
                                          <option value="" disabled>LGA</option>
                                          {
                                              deliveryLgaList.map((item: any, index) => {
                                                return <option key={index} value={item}>{item}</option>
                                              })
                                          }
                                      </select>
                                      {
                                          errors.deliveryCity && touched.deliveryCity &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.deliveryCity}</p>
                                      }
                                  </div>
                                </div>
                              </div>
                              <div className="modal-space-clear py-2">
                                <p className="mb-0 reduced-soft c-grey-mid">Select dispatcher</p>
                                <div className='styled-form2'>
                                    <select
                                        id='dispatcher'
                                        style={{borderRadius: '3px', padding: '7px 15px'}}
                                        value={values.dispatcher}
                                        onBlur={handleBlur}
                                        onFocus={() => errors.dispatcher = ''}
                                        onChange={handleChange}
                                        className={(errors.dispatcher && touched.dispatcher) ? 'im-error' : ''}
                                    >
                                        <option value="" disabled>Select dispatcher</option>
                                        {
                                            dispatcherList.map((item: any, index) => {
                                                return <option key={index} value={item._id}>{item.businessName}</option>
                                            })
                                        }
                                    </select>
                                    {
                                        errors.dispatcher && touched.dispatcher &&
                                        <p className='reduced error-popup pt-1 mb-0'>{errors.dispatcher}</p>
                                    }
                                </div>
                              </div>
                              <div className='text-center pt-3 pb-2 lighter-grey pb-3' style={{padding: '20px'}}>
                                  <button type='button' onClick={closeModal} className='solid-button-danger mx-0 px-4 rad-10 mr-3' disabled={isSubmitting}><i className="fa-solid fa-circle-xmark mr-2"></i>Cancel</button>
                                  <button type='submit' className='btn solid-button mx-0 px-4 rad-10' disabled={!isValid || isSubmitting}>{isSubmitting ? 'Processing..' : <><i className="fa-solid fa-circle-check mr-2"></i> Proceed</>}</button>
                                  {
                                      response && <div className='error-popup text-center'>{response}</div>
                                  }
                              </div>
                            </form>
                        );
                    }
                }
            </Formik>
          </div>
          {/* Content ends  here */}

        </div>
      </div>
    </div>
  );
}

export default RequestDispatcherModal;
