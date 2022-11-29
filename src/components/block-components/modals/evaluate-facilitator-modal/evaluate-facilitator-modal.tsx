import React, { useEffect, useState } from "react";
import { Formik, FormikProps } from 'formik';
import { closeAppModal, openModal } from "../../../../services/utils/app-data-modal-service";
import { useParams } from 'react-router-dom';
import { sendRequest } from "../../../../services/utils/request";
import { toast } from "react-toastify";

const EvaluateFacilitatorModal = (props: any) => {
  const [response, setResponse] = useState<any>();
  const id = props.id;
  const closeModal = (feedback: any) => {
    closeAppModal(()=> props.closeModal(feedback));
  };

  const moveToEvaluated = (values: any, controls: any) => {
    controls.setSubmitting(true);
    sendRequest({
            url: 'facilitator/evaluate',
            method: 'PUT',
            body: ({
                id: id,
                score: values.score,
            })
        }, (res: any) => {
            // controls.setSubmitting(false);
            console.log(res)
            if (res.responseCode === 1) {
              toast.success(res.payload);
              controls.setSubmitting(false);
              closeModal('refresh');
          }
        }, (err: any) => {
            controls.setSubmitting(false);
            setResponse(<p className='c-red mb-0 pt-2'>{err.error?.emailError || err.message || 'Unable to complete'}</p>);
            toast.error(err.error?.emailError || err.message || 'Unable to complete');
        });
  }

  useEffect(() => {
    openModal();
  }, []);

  return (
    <div className="app-data-modal">
      <div className="modal-bg"></div>
      <div className={"modal-container small"}>
        <div className="modal-content">
          
          {/* Any content goes in here */}
          <div>
             <Formik initialValues={{
                score: ''
            }}
            onSubmit={(values, controls) => moveToEvaluated(values, controls)}
            // onSubmit={(values, controls) => console.log('values, controls')}
            >
                {
                    (props: FormikProps<{
                        score: string
                    }>) => {
                        const {
                            values,
                            errors,
                            touched,
                            isSubmitting,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                        } = props;
                        return (
                            <form action="" onSubmit={handleSubmit} style={{padding: '15px'}}>
                                <div className='styled-form'>
                                  <h4 className="text-center">Evaluate Facilitator</h4>
                                  <label>Enter Score</label>
                                  <input
                                      type="number"
                                      placeholder=''
                                      id='score'
                                      value={values.score}
                                      onBlur={handleBlur}
                                      onFocus={() => errors.score = ''}
                                      onChange={handleChange}
                                      className={(errors.score && touched.score) ? 'im-error' : ''}
                                  />
                                  {
                                      errors.score && touched.score &&
                                      <p className='reduced error-popup pt-1 mb-0'>{errors.score}</p>
                                  }
                              </div>
                              <div className='text-center pt-3 pb-2'>
                                  <button type='button' onClick={closeModal} className='btn btn-danger mx-0 mr-3' disabled={isSubmitting}>Cancel</button>
                                  <button type='submit' className='btn btn-success mx-0' disabled={isSubmitting}>{isSubmitting ? 'Processing..' : 'Submit'}</button>
                                  {
                                      response && <div className=''>{response}</div>
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

export default EvaluateFacilitatorModal;
