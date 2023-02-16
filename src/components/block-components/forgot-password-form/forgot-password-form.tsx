import { Formik, FormikProps, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../../services/utils/request';
import { toast } from 'react-toastify';

import './forgot-password-form.scss';
import { useNavigate } from 'react-router';
import { routeConstants } from '../../../services/constants/route-constants';
import { Link } from 'react-router-dom';
import { Logo } from '../../../assets/images';
import { regexConstants } from '../../../services/constants/validation-regex';

function AdminForgotPasswordForm() {

    const navigate = useNavigate();

    const validate = (values: FormikValues) => {   
        const errors: any = {};
    
        if (!values.email) {
        errors.email = 'Email is required';
        } else if (!regexConstants.emailPattern.test(values.email)) {
        errors.email = 'Invalid email';
        }
        return errors;
    }

    const submitRegistration = (values: any, controls: any) => {
        sendRequest({
            url: 'auth/forgot-password',
            method: 'POST',
            body: {
                email: values.email,
            }
        }, (res: any) => {
            navigate(`/${routeConstants.resetPassword}`);
        }, (err: any) => {
            controls.setSubmitting(false);
            const message = err.error?.emailError || err.message || 'Unable to complete';
            toast.error(message);
        });
    }

    useEffect(() => {
    });

    return (
        <div className='admin-login-box'>
            <div className='spread-info py-3'>
                <Link to={routeConstants.home}>
                    <img src={Logo} width={130} alt="" />
                </Link>
                <span></span>
            </div>
            <Formik initialValues={{
                email: '',
            }}
            validate={(value) => validate(value)}
            onSubmit={(values, controls) => submitRegistration(values, controls)}
            >
                {
                    (props: FormikProps<{
                        email: string,
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
                                <h6 className='pt-4'>Password reset</h6>
                                <div className='reg-card'>
                                    <label className='text-left'>Email</label>
                                    <input
                                        type="email"
                                        placeholder='enter your email'
                                        id='email'
                                        value={values.email}
                                        onBlur={handleBlur}
                                        onFocus={() => errors.email = ''}
                                        onChange={handleChange}
                                        className={(errors.email && touched.email) ? 'im-error' : ''}
                                    />
                                    {
                                        errors.email && touched.email &&
                                        <p className='reduced error-popup pt-1 mb-0'>{errors.email}</p>
                                    }
                                </div>
                                <div className='text-center pt-3 pb-2'>
                                    <button type='submit' className='solid-button rad-3-im mx-0 reduced-im' disabled={isSubmitting}>
                                        {isSubmitting ? 'SUBMITTING..' : 'PROCEED'}
                                    </button>
                                </div>
                                <div className='text-center pb-2'>
                                    <Link to={`/${routeConstants.login}`} className='reduced-x clickable-link'>BACK TO LOGIN</Link>
                                </div>
                            </form>
                        );
                    }
                }
            </Formik>
        </div>
    );
}

export default AdminForgotPasswordForm;
