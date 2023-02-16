import { Formik, FormikProps, FormikValues } from 'formik';
import React, { useState } from 'react';
// import * as Yup from 'yup';
import * as qs from 'qs';
import { sendRequest } from '../../../services/utils/request';
import { toast } from 'react-toastify';

import './reset-password-form.scss';
import { useNavigate } from 'react-router';
import { routeConstants } from '../../../services/constants/route-constants';
import { Link } from 'react-router-dom';
import { Logo } from '../../../assets/images';

function ResetPasswordForm() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validate = (values: FormikValues, change?: any) => {   
        const errors: any = {};
    
        if (!values.token) {
            errors.token = 'Token is required';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 3) {
            errors.password = 'Password can not be lass than 3 characters';
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Password confirmation is required';
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        return errors;
    
    }

    const submitRegistration = (values: any, controls: any) => {
        // setTimeout(() => controls.setSubmitting(false), 2000);
        // return
        sendRequest({
            url: 'auth/reset-password',
            method: 'POST',
            body: {
                token: values.token,
                password: values.password,
                confirmPassword: values.confirmPassword,
            }
        }, (res: any) => {
            controls.setSubmitting(false);
            toast.success(res.message);
            navigate(`/${routeConstants.login}`);
        }, (err: any) => {
            controls.setSubmitting(false);
            toast.error(err.message || 'Unable to complete');
        });
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className='register-box'>
            <div className='spread-info py-3'>
                <Link to={routeConstants.home}>
                    <img src={Logo} width={130} alt="" />
                </Link>
                <span></span>
            </div>
            <Formik initialValues={{
                token: '',
                password: '',
                confirmPassword: '',
            }}
            validate={(value) => validate(value)}
            onSubmit={(values, controls) => submitRegistration(values, controls)}
            // onSubmit={(values, controls) => console.log('values, controls')}
            >
                {
                    (props: FormikProps<{
                        token: string,
                        password: string,
                        confirmPassword: string,
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
                                <h6 className='pt-4'>Reset Password</h6>
                                <p className='reduced-soft'>Enter token sent to your email</p>
                                <div className='reg-card'>
                                    <label className='text-left'>Token</label>
                                    <input
                                        type="token"
                                        placeholder='enter your token'
                                        id='token'
                                        value={values.token}
                                        onBlur={handleBlur}
                                        onFocus={() => errors.token = ''}
                                        onChange={handleChange}
                                        className={(errors.token && touched.token) ? 'im-error' : ''}
                                    />
                                    {
                                        errors.token && touched.token &&
                                        <p className='reduced error-popup pt-1 mb-0'>{errors.token}</p>
                                    }
                                </div>
                                <div className='reg-card'>
                                    <label className='text-left'>Password</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='Enter your password'
                                        id='password'
                                        value={values.password}
                                        onBlur={handleBlur}
                                        onFocus={() => errors.password = ''}
                                        onChange={handleChange}
                                        className={(errors.password && touched.password) ? 'im-error' : ''}
                                    />
                                    <div className='password-shower'>
                                        {
                                            showPassword ? 
                                            <i className="fa-solid fa-eye-slash" onClick={toggleShowPassword}></i> : 
                                            <i className="fa-solid fa-eye" onClick={toggleShowPassword}></i>
                                        }
                                    </div>
                                    {
                                        errors.password && touched.password &&
                                        <p className='reduced error-popup pt-1 mb-0'>{errors.password}</p>
                                    }
                                </div>
                                <div className='reg-card'>
                                    <label className='text-left'>Confirm Password</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='Confirm your password'
                                        id='confirmPassword'
                                        value={values.confirmPassword}
                                        onBlur={handleBlur}
                                        onFocus={() => errors.confirmPassword = ''}
                                        onChange={handleChange}
                                        className={(errors.confirmPassword && touched.confirmPassword) ? 'im-error' : ''}
                                    />
                                    <div className='password-shower'>
                                        {
                                            showPassword ? 
                                            <i className="fa-solid fa-eye-slash" onClick={toggleShowPassword}></i> : 
                                            <i className="fa-solid fa-eye" onClick={toggleShowPassword}></i>
                                        }
                                    </div>
                                    {
                                        errors.confirmPassword && touched.confirmPassword &&
                                        <p className='reduced error-popup pt-1 mb-0'>{errors.confirmPassword}</p>
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

export default ResetPasswordForm;
