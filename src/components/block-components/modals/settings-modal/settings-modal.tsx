import React, { useEffect, useState } from "react";
import { Formik, Field, FormikProps, FormikValues } from 'formik';
import { closeAppModal, openModal } from "../../../../services/utils/app-data-modal-service";
import Select from "react-select";
import { sendRequest } from "../../../../services/utils/request";
import { toast } from "react-toastify";
import { prepareNewProductForm, prepareProfileInfoUpdateForm } from "../../../../services/utils/form-preparation-service";
import { acceptOnlyNumbers, numberUserMode } from "../../../../services/utils/data-manipulation-utilits";
import { useDispatch } from "react-redux";
import { login } from "../../../../services/actions/session-actions";
import { useSelector } from "react-redux";
import { IstoreState } from "../../../../services/constants/interfaces/data-schemas";
import { routeConstants } from "../../../../services/constants/route-constants";

const SettingsModal = (props: any) => {

  const dispatch = useDispatch();
  const sessionData = useSelector((state: IstoreState) => state.session);

  const [response, setResponse] = useState<any>();
  const userMode = numberUserMode(sessionData.role);
  const [banks, setBanks] = useState([]);
  const closeModal = (feedback: any) => {
    closeAppModal(()=> props.closeModal(feedback));
  };

  const getBanks = () => {
      sendRequest({
          url: 'banks',
      }, (res: any) => {
          setBanks(res.data || []);
          console.log({datt: res.data});
      }, (err: any) => {
      });
  }

  const validate = (values: FormikValues) => {   
      const errors: any = {};
  
      if (!values.accountNumber) {
          errors.accountNumber = 'Account number is required';
      } else if (values.accountNumber.length < 10) {
        errors.accountNumber = 'Invalid account number';
    }
      if (!values.bankName) {
          errors.bankName = 'Bank is required';
      }
      if (!values.storeName) {
          errors.storeName = 'Store name required';
      }
      if (!values.address) {
          errors.address = 'Business address is required';
      }
      // if (!values.slug) {
      //     errors.slug = 'Business web Link is required';
      // }
      if (!values.image) {
        // errors.image = 'Image is required';
      }
      if(values.file){
        const format = values.file.name?.substring(values.file.name.lastIndexOf('.') + 1);
        if(format !== 'jpg' && format !== 'jpeg' && format !== 'png' && format !== 'gif' && format !== 'pdf'){
          errors.image = 'Invalid format';
        }else if(values.file.size > 2097152){
          errors.image = 'Image must not be more than 2MB';
        }
      }

      return errors;
  }

  const updateData = (values: any, controls: any) => {
    // controls.setSubmitting(false);
    // return console.log({Nsoku: prepareProfileInfoUpdateForm(values, banks)});
    sendRequest({
      url: 'auth/profile',
      method: 'POST',
      body: prepareProfileInfoUpdateForm(values, banks),
    }, (res: any) => {
      toast.success(res.message);
      controls.setSubmitting(false);
      closeModal('refresh');
      dispatch(login(res.data));
    }, (err: any) => {
        controls.setSubmitting(false);
        setResponse(<p className='c-red mb-0 pt-2'>{err.error?.emailError || err.message || 'Unable to complete'}</p>);
        toast.error(err.error?.emailError || err.message || 'Unable to complete');
    });
  }

  useEffect(() => {
    openModal();
    getBanks();
  }, []);

  return (
    <div className="app-data-modal">
      <div className="modal-bg"></div>
      <div className={"modal-container small no-pad"}>
        <div className="modal-content">
          
          {/* Any content goes in here */}
          <div>
             <Formik initialValues={{
                accountNumber: sessionData?.bankAccount || '',
                bankName: sessionData?.bankCode || '',
                storeName: sessionData?.businessName || '',
                address: sessionData?.address || '',
                // slug: sessionData?.slug || '',
                image: '',
                // image: props.product?.images[0]?.photoId || '',
            }}
            validate={(value) => validate(value)}
            onSubmit={(values, controls) => updateData(values, controls)}
            // onSubmit={(values, controls) => console.log('values, controls')}
            >
                {
                    (Props: FormikProps<{
                      accountNumber: string,
                      bankName: string,
                      storeName: string,
                      address: string,
                      // slug: string,
                      image: string,
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
                        } = Props;
                        return (
                            <form action="" onSubmit={handleSubmit}>
                                <h6 className="increased-soft pt-3 pb-1 modal-space-sect">Settings</h6>
                                <div className="modal-space-sect py-4">
                                  <p className="mb-0 reduced-soft">Bank details</p>
                                  <div className="info-grid">
                                    <div className='styled-form2'>
                                        <label className="mt-2 h-bold">Account number</label>
                                        
                                        <Field
                                              type="text"
                                              // placeholder='name'
                                              id='accountNumber'
                                              value={values.accountNumber}
                                              onBlur={handleBlur}
                                              maxLength={10}
                                              onFocus={() => errors.accountNumber = ''}
                                              onChange={handleChange}
                                              onKeyUp={acceptOnlyNumbers}
                                              className={(errors.accountNumber && touched.accountNumber) ? 'im-error' : ''}
                                          />
                                        {
                                            errors.accountNumber && touched.accountNumber &&
                                            <p className='reduced error-popup pt-1 mb-0'>{errors.accountNumber}</p>
                                        }
                                    </div>
                                    <span></span>
                                    <div className='styled-form2'>
                                        <label className="mt-2 h-bold">Bank name</label>
                                        <select
                                            id='bankName'
                                            style={{borderRadius: '3px', padding: '7px 15px'}}
                                            value={values.bankName}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.bankName = ''}
                                            onChange={handleChange}
                                            className={(errors.bankName && touched.bankName) ? 'im-error' : ''}
                                        >
                                            <option value="" disabled></option>
                                            {
                                                banks.map((item: any, index) => {
                                                    return <option key={index} value={item.code} className="reduced">{item.name}</option>
                                                })
                                            }
                                        </select>
                                        {
                                            errors.bankName && touched.bankName &&
                                            <p className='reduced error-popup pt-1 mb-0'>{errors.bankName}</p>
                                        }
                                    </div>
                                  </div>
                                </div>
                                <div className="modal-space-sect py-4">
                                  {
                                    userMode === 1 ?
                                    <p className="mb-0 reduced-soft">Store details</p> :
                                    <p className="mb-0 reduced-soft">Business details</p>
                                  }
                                  <div className="info-grid">
                                    <div className='styled-form2'>
                                        {
                                          userMode === 1 ?
                                          <label className="mt-3 mb-1 h-bold">Store name</label> :
                                          <label className="mt-0 mb-1 h-bold">Business name</label>
                                        }
                                        
                                        <Field
                                              type="text"
                                              // placeholder='store name'
                                              id='storeName'
                                              value={values.storeName}
                                              onBlur={handleBlur}
                                              onFocus={() => errors.storeName = ''}
                                              onChange={handleChange}
                                              className={(errors.storeName && touched.storeName) ? 'im-error' : ''}
                                          />
                                        {
                                            errors.storeName && touched.storeName &&
                                            <p className='reduced error-popup pt-1 mb-0'>{errors.storeName}</p>
                                        }
                                    </div>
                                    <span></span>
                                    <div className='styled-form2'>
                                        <label className="mt-0 h-bold">
                                          Business address
                                          {
                                            userMode === 1 &&
                                            <span className="reduced">(will serve as pickup address for dispatchers)</span>
                                          }
                                        </label>
                                        
                                        <Field
                                              type="text"
                                              // placeholder='address'
                                              id='address'
                                              value={values.address}
                                              onBlur={handleBlur}
                                              onFocus={() => errors.address = ''}
                                              onChange={handleChange}
                                              className={(errors.address && touched.address) ? 'im-error' : ''}
                                          />
                                        {
                                            errors.address && touched.address &&
                                            <p className='reduced error-popup pt-1 mb-0'>{errors.address}</p>
                                        }
                                    </div>
                                  </div>
                                </div>
                                <div className="modal-space-sect py-4">
                                  {/* <p className="mb-0 reduced-soft c-grey-mid">Add domain name</p>
                                  <div className="info-grid">
                                    <div className='styled-form2'>
                                        <label className="mt-2 h-bold c-grey-mid">Enter domain name</label>
                                        
                                        <Field
                                              type="text"
                                              // placeholder='slug'
                                              id='slug'
                                              value={values.slug}
                                              onBlur={handleBlur}
                                              onFocus={() => errors.slug = ''}
                                              onChange={handleChange}
                                              className={(errors.slug && touched.slug) ? 'im-error' : ''}
                                          />
                                        {
                                            errors.slug && touched.slug &&
                                            <p className='reduced error-popup pt-1 mb-0'>{errors.slug}</p>
                                        }
                                    </div>
                                    <span></span>
                                    <div className='styled-form2 no-select-button'>
                                      <label className="mt-2 h-bold">Image</label>
                                      
                                      <input
                                            type="file"
                                            id='image'
                                            value={values.image}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.image = ''}
                                            // onChange={handleChange}
                                            className={(errors.image && touched.image) ? 'im-error' : ''}
                                            onChange={(event: any) => {
                                              handleChange(event);
                                              setFieldValue("file", event.currentTarget.files[0]);
                                            }}
                                        />
                                      {
                                          errors.image && touched.image &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.image}</p>
                                      }
                                    </div>
                                  </div> */}
                                    <div className='styled-form2 no-select-button'>
                                      <label className="mt-2 h-bold">Image</label>
                                      
                                      <input
                                            type="file"
                                            id='image'
                                            value={values.image}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.image = ''}
                                            // onChange={handleChange}
                                            className={(errors.image && touched.image) ? 'im-error' : ''}
                                            onChange={(event: any) => {
                                              handleChange(event);
                                              setFieldValue("file", event.currentTarget.files[0]);
                                            }}
                                        />
                                      {
                                          errors.image && touched.image &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.image}</p>
                                      }
                                    </div>
                                </div>
                              <div className='text-center pt-3 pb-2 lighter-grey pb-3' style={{padding: '20px'}}>
                                  <button type='button' onClick={closeModal} className='solid-button-danger mx-0 px-3 rad-10 mr-3' disabled={isSubmitting}><i className="fa-solid fa-circle-xmark mr-2"></i>Cancel</button>
                                  <button type='submit' className='btn solid-button mx-0 px-4 rad-10' disabled={isSubmitting}>{isSubmitting ? 'Processing..' : <><i className="fa-solid fa-circle-check mr-2"></i> Proceed</>}</button>
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

export default SettingsModal;
