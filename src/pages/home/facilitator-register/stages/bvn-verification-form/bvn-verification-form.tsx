import { Formik, FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { sendRequest } from '../../../../../services/utils/request';
import { toast } from 'react-toastify';

import './bvn-verification-form.scss';
function BvnVerificationForm(props: any) {

    const submitBvn = (values: any, controls: any) => {
        sendRequest({
            url: 'bvn/query?bvn=' + values.bvn,
        }, (res: any) => {
            controls.setSubmitting(false);
            toast.success(res.message);
            controls.resetForm();
            props.populateBvnData({
                dob: res.payload.dob,
                firstName: res.payload.first_name,
                gender: res.payload.gender,
                lastName: res.payload.last_name,
                middleName: res.payload.middle_name,
                bvn_phone: res.payload.phone_number,
                bvn: values.bvn,
            });
        }, (err: any) => {
            controls.setSubmitting(false);
            toast.error(err?.responseText || 'Unable to verify');
        });
    }

    return (
        <div className=''>
            <Formik initialValues={{
                bvn: '',
            }}
            // validationSchema={Yup.object().shape({
            //     bvn: Yup.string().required('BVN is required')
            //         .min(11, 'BVN can not be less than 11 characters')
            //         .max(11, 'BVN can not be more than 11 characters')
            //         .matches(regexConstants.bvnPattern, 'Invalid BVN'),
            // })}
            onSubmit={(values, controls) => submitBvn(values, controls)}
            >
                {
                    (props: FormikProps<{
                        bvn: string,
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
                                        <h5 className='text-center pt-3'>BVN Verification</h5>
                                    </div>
                                    <div className='col-md-12'>
                                        <div className='reg-card'>
                                            <label>BVN</label>
                                            <input
                                                type="number"
                                                placeholder='Enter your bvn'
                                                id='bvn'
                                                value={values.bvn}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.bvn = ''}
                                                onChange={handleChange}
                                                className={(errors.bvn && touched.bvn) ? 'im-error' : ''}
                                            />
                                            {
                                                errors.bvn && touched.bvn &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.bvn}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-12 text-center pt-3 pb-2 px-2'>
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

export default BvnVerificationForm;
