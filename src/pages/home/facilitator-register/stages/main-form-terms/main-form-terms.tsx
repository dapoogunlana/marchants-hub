import { Formik, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { sendRequest } from '../../../../../services/utils/request';
import { toast } from 'react-toastify';

import './main-form-terms.scss';
import { prepareFacilitatorRegForm } from '../../../../../services/utils/facilitator-registration-service';

function MainFormTerms(props: any) {
    
    const goBack = () => {
        props.changeLevel();
    }

    const submitRegistration = (values: any, controls: any) => {
        if(!values.agreement) {
            controls.setSubmitting(false);
            toast.error('You have to agree to terms to proceed');
            return;
        }
        console.log({refined: prepareFacilitatorRegForm(props.form)});
        sendRequest({
            url: 'facilitator',
            method: 'POST',
            body: prepareFacilitatorRegForm(props.form)
        }, (res: any) => {
            controls.setSubmitting(false);
            toast.success(res.message);
            controls.resetForm();
            props.changeLevel(true);
        }, (err: any) => {
            controls.setSubmitting(false);
            if(err.payload){
                const errorList = err.payload.split('|');
                errorList.map((item: string) => {
                    if (item) toast.error(item)
                });
                if(!errorList || errorList.length === 0) {
                    toast.error(err.responseText || 'Unable to complete');
                }
            } else {
                toast.error(err.responseText || 'Unable to complete');
            }
        });
    }

    useEffect(() => {
    });

    return (
        <div className=''>
            <Formik initialValues={{
                agreement: '',
            }}
            // validationSchema={Yup.object().shape({
            //     agreement: Yup.string().required('You have to agree to terms to proceed'),
            // })}
            onSubmit={(values, controls) => submitRegistration(values, controls)}
            // onSubmit={(values, controls) => console.log('values, controls')}
            >
                {
                    (props: FormikProps<{
                        agreement: string,
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
                            <form action="" onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <h5 className='text-center pt-3'>Terms and Conditions</h5>
                                        <p>
                                            By checking the box below, I agree to the following terms and conditions:
                                        </p>
                                        <p>
                                            I attest to the fact that every information I have provided in this form is true and 
                                            accurate to the best of my knowledge, I also agree to be held responsible for any 
                                            damages caused by any false information provided by me.
                                        </p>
                                    </div>
                                    <div className='col-md-12'>
                                        <div className='reg-card'>
                                            <input
                                                type='checkbox'
                                                placeholder='Enter your first name'
                                                id='agreement'
                                                value={values.agreement}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.agreement = ''}
                                                onChange={handleChange}
                                                className={(errors.agreement && touched.agreement) ? 'im-error' : ''}
                                            />
                                            <span>(check this box to agree)</span>
                                            {
                                                errors.agreement && touched.agreement &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.agreement}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-12 text-center pt-3 pb-2 px-2'>
                                        <button type='button' className='btn btn-warning' onClick={goBack}>Back</button>
                                        <button type='submit' className='btn btn-success' disabled={isSubmitting}>{isSubmitting ? 'Processing..' : 'Submit'}</button>
                                    </div>
                                </div>
                            </form>
                        );
                    }
                }
            </Formik>
        </div>
    );
}

export default MainFormTerms;
