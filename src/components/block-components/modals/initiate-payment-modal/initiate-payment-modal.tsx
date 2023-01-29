import React, { useEffect, useState } from "react";
import { Formik, Field, FormikProps, FormikValues } from 'formik';
import { closeAppModal, openModal } from "../../../../services/utils/app-data-modal-service";
import Select from "react-select";
import { sendRequest } from "../../../../services/utils/request";
import { toast } from "react-toastify";
import { prepareNewProductForm } from "../../../../services/utils/form-preparation-service";

const InitiatePaymentModal = (props: any) => {
  const [response, setResponse] = useState<any>();
  const [otpStatus, setOtpStatus] = useState<'REQUESTING' | 'READY' | 'WAITING'>('READY');
  const id = props.product?._id;
  const closeModal = (feedback: any) => {
    closeAppModal(()=> props.closeModal(feedback));
  };

  const validate = (values: FormikValues) => {   
      const errors: any = {};
  
      if (!values.otp) {
          errors.otp = 'OTP required';
      } else if (values.otp.length < 3) {
        errors.otp = 'OTP can not be less than 3 digits';
      }

      return errors;
  }

  const saveProduct = (values: any, controls: any) => {
    // return closeModal('refresh');
    sendRequest({
      url: 'payment',
      method: 'POST',
      body: {
        otp: values.otp,
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

  const resendOTP = () => {
    setOtpStatus('REQUESTING');
    sendRequest({
      url: 'resend-otp',
      method: 'POST',
      body: {},
    }, (res: any) => {
      toast.success(res.message);
      setOtpStatus('WAITING');
      setTimeout(() => setOtpStatus('READY'), 120000);
      closeModal('refresh');
    }, (err: any) => {
        setOtpStatus('READY');
        toast.error(err.error?.emailError || err.message || 'Unable to complete');
    });
  }

  useEffect(() => {
    openModal();
    console.log({props});
  }, []);

  return (
    <div className="app-data-modal">
      <div className="modal-bg"></div>
      <div className={"modal-container mid-small no-pad"}>
        <div className="modal-content">
          
          {/* Any content goes in here */}
          <div>
             <Formik initialValues={{
                otp: '',
            }}
            validate={(value) => validate(value)}
            onSubmit={(values, controls) => saveProduct(values, controls)}
            // onSubmit={(values, controls) => console.log('values, controls')}
            >
                {
                    (Props: FormikProps<{
                      otp: string,
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
                                <h4 className="pt-3 pb-2 mb-2 px-4 increased">Withdrawal confirmation</h4>
                                <div style={{padding: '20px', borderTop: '1px solid #ddd'}}>
                                  <div className='styled-form2 w90-fl'>
                                      <p className="max300 reduced-soft">Enter OTP sent to your email to confirm this withdrawal</p>
                                      
                                      <Field
                                            type="text"
                                            placeholder=''
                                            id='otp'
                                            value={values.otp}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.otp = ''}
                                            onChange={handleChange}
                                            className={(errors.otp && touched.otp) ? 'im-error' : ''}
                                        />
                                      {
                                          errors.otp && touched.otp &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.otp}</p>
                                      }
                                  </div>
                                  <p className="mt-4">
                                    {otpStatus === 'READY' && <span className="underlined-link" onClick={resendOTP}>Resend OTP</span>}
                                    {otpStatus === 'WAITING' && <span className="reduced-soft">You can resend OTP after 3mins</span>}
                                    {otpStatus === 'REQUESTING' && <span className="reduced-soft">Requesting....</span>}
                                  </p>
                                </div>
                              <div className='text-center pt-3 pb-2 lighter-grey pb-3' style={{padding: '20px'}}>
                                  <button type='button' onClick={closeModal} className='solid-button-danger mx-0 px-3 rad-10 mr-3' disabled={isSubmitting}><i className="fa-solid fa-circle-xmark mr-2"></i>Cancel</button>
                                  <button type='submit' className='solid-button mx-0 px-4' disabled={isSubmitting}>{isSubmitting ? 'Processing..' : <><i className="fa-solid fa-circle-check mr-2"></i> Proceed</>}</button>
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

export default InitiatePaymentModal;
