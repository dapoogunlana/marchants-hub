import { Formik, FormikProps } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { sendRequest } from '../../../../../services/utils/request';
import './main-form-phone-validation.scss';

function MainFormPhoneValidation(props: any) {

    const submit = (values: any, controls: any) => {
        controls.setSubmitting(false);
        props.updateForm(values, true);
    }

    const submitBvn = (values: any, controls: any) => {
        sendRequest({
            url: 'facilitator/validate-otp',
            method: 'PUT',
            body: {
                otp: values.otp,
                phone_number: props.validationNumber,
            }
        }, (res: any) => {
            controls.setSubmitting(false);
            toast.success(res.message);
            props.updateForm(values, true);
            controls.resetForm();
        }, (err: any) => {
            controls.setSubmitting(false);
            toast.error(err.responseText || 'Unable to verify');
        });
    }

    return (
        <div className=''>
            <Formik initialValues={{
                otp: props.form?.otp || '',
            }}
            // validationSchema={Yup.object().shape({
            //     otp: Yup.string().required('OTP is required'),
            // })}
            onSubmit={(values, controls) => submitBvn(values, controls)}
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
                            handleBlur,
                            handleChange,
                            handleSubmit,
                        } = Props;
                        return (
                            <form action="" onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <h5 className='text-center pt-3'>Confirm Phone Number</h5>
                                    </div>
                                    <div className='col-md-12'>
                                        <div className='reg-card'>
                                            <label>Enter OTP received on <span className='fig'>{props.validationNumber}</span></label>
                                            <input
                                                type="text"
                                                placeholder='Enter your OTP'
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
                                    </div>
                                    <div className='col-md-12 text-center pt-3 pb-2 px-2'>
                                        <button type='submit' className='btn btn-success' disabled={isSubmitting}>{isSubmitting ? 'Processing..' : 'Verify'}</button>
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

export default MainFormPhoneValidation;
