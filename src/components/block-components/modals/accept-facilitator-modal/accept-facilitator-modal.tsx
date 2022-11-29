import React, { useEffect, useState } from "react";
import { Formik, FormikProps } from 'formik';
import { closeAppModal, openModal } from "../../../../services/utils/app-data-modal-service";
import Select from "react-select";
import { sendRequest } from "../../../../services/utils/request";
import { toast } from "react-toastify";

const AcceptFacilitatorModal = (props: any) => {
  const [response, setResponse] = useState<any>();
  const [pillars, setPillars] = useState([]);
  const id = props.id;
  const closeModal = (feedback: any) => {
    closeAppModal(()=> props.closeModal(feedback));
  };

  const getPillars = () => {
      sendRequest({
          url: 'pillar',
      }, (res: any) => {
          const modifiedPillars = res.payload?.map((item: any) => {
              item.value = item.id;
              item.label = item.name;
              return item;
          }) || [];
          setPillars(modifiedPillars);
      }, (err: any) => {
          toast.error(err.responseText || 'Unable to verify');
      });
  };

  const moveToAccepted = (values: any, controls: any) => {
    // return closeModal('refresh');
    sendRequest({
      url: 'facilitator/accept-reject',
      method:'PUT',
      body: {
          id, 
          status: "accept",
          pillars: values?.pillar?.map((item: any) => item.value) || []
      },
    }, (res: any) => {
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
    getPillars();
  }, []);

  return (
    <div className="app-data-modal">
      <div className="modal-bg"></div>
      <div className={"modal-container small"}>
        <div className="modal-content">
          
          {/* Any content goes in here */}
          <div>
             <Formik initialValues={{
                pillar: props.form?.pillar || [],
            }}
            onSubmit={(values, controls) => moveToAccepted(values, controls)}
            // onSubmit={(values, controls) => console.log('values, controls')}
            >
                {
                    (props: FormikProps<{
                      pillar: string[],
                    }>) => {
                        const {
                            values,
                            errors,
                            touched,
                            isSubmitting,
                            handleSubmit,
                            setValues,
                        } = props;
                        return (
                            <form action="" onSubmit={handleSubmit} style={{padding: '15px'}}>
                                <div className='styled-form'>
                                  <h4 className="text-center">Accept Facilitator</h4>
                                  <label>Choose Pillars To Accept Facilitator Into</label>
                                  <Select
                                      options={pillars}
                                      placeholder="Choose Pillar"
                                      value={values.pillar}
                                      onChange={(e: any) => setValues({...values, pillar: e})}
                                      isSearchable={true}
                                      isMulti              
                                      closeMenuOnSelect={false}
                                      hideSelectedOptions={false}
                                  />
                                  {
                                      errors.pillar && touched.pillar &&
                                      <p className='reduced error-popup pt-1 mb-0'>{errors.pillar}</p>
                                  }
                              </div>
                              <div className='text-center pt-3 pb-2'>
                                  <button type='button' onClick={closeModal} className='btn btn-danger mx-0 mr-3' disabled={isSubmitting}>Cancel</button>
                                  <button type='submit' className='btn btn-success mx-0' disabled={isSubmitting || values.pillar.length === 0}>{isSubmitting ? 'Processing..' : 'Submit'}</button>
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

export default AcceptFacilitatorModal;
