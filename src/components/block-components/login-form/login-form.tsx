import { Formik, FormikProps, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import * as qs from 'qs';
import { sendRequest } from '../../../services/utils/request';
import { toast } from 'react-toastify';

import './login-form.scss';
import { useNavigate } from 'react-router';
import { routeConstants } from '../../../services/constants/route-constants';
import { Link } from 'react-router-dom';
import { Logo } from '../../../assets/images';
import { useDispatch } from 'react-redux';
import { login } from '../../../services/actions/session-actions';
import UserNavigationComponent from '../../../services/utils/navigation-component';
import { regexConstants } from '../../../services/constants/validation-regex';
// import { login } from '../../../services/actions/session-actions';
// import { regexConstants } from '../../../services/constants/validation-regex';

function AdminLoginForm() {

    const [response, setResponse] = useState<any>();
    const [showPassword, setShowPassword] = useState(false);
    const [useNav, setUseNav] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = (values: FormikValues) => {   
        const errors: any = {};
    
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!regexConstants.emailPattern.test(values.email)) {
            errors.email = 'Invalid email';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 3) {
            errors.password = 'Password can not be lass than 3 characters';
        }
        return errors;
    }

    const submitRegistration = (values: any, controls: any) => {
        sendRequest({
            url: 'auth/login',
            method: 'POST',
            body: {
                email: values.email,
                password: values.password
            }
        }, (res: any) => {
            sessionStorage.setItem('token', res.data);
            getUserData(res.data, controls);
        }, (err: any) => {
            controls.setSubmitting(false);
            const message = err.error?.emailError || err.message || 'Unable to login';
            setResponse(<p className='c-red mb-0 pt-2'>{message}</p>);
            toast.error(message);
        });
    }
    const getUserData = (token: string, controls: any) => {
        sendRequest({
            url: 'auth/profile',
            method: 'GET',
        }, (res: any) => {
            controls.setSubmitting(false);
            setResponse(<p className='c-dark-green mb-0 pt-2'>{res.message}</p>);
            toast.success(res.message);
            controls.resetForm();
            dispatch(login(res.data))
            // navigate(`/${routeConstants.systemAdmin}`);
            setUseNav(true);
        }, (err: any) => {
            setResponse(<p className='c-red mb-0 pt-2'>{err.error?.emailError || err.message || 'Unable to complete'}</p>);
            toast.error(err.error?.emailError || err.message || 'Unable to complete');
        });
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const clearResponse = () => {
        setResponse(undefined);
    }

    useEffect(() => {
    });

    return (
        <div className='admin-login-box' onClick={clearResponse}>
            {useNav && <UserNavigationComponent />}
            <div className='spread-info py-3'>
                <Link to={routeConstants.home}>
                    <img src={Logo} width={100} alt="" />
                </Link>
                <span></span>
            </div>
            <Formik initialValues={{
                email: '',
                password: '',
            }}
            // validationSchema={Yup.object().shape({
            //     email: Yup.string().required('Email is required').matches(regexConstants.emailPattern, 'Invalid email'),
            //     password: Yup.string().required('Password is required'),
            // })}
            validate={(value) => validate(value)}
            onSubmit={(values, controls) => submitRegistration(values, controls)}
            // onSubmit={(values, controls) => console.log('values, controls')}
            >
                {
                    (props: FormikProps<{
                        email: string,
                        password: string,
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
                                <div className='text-center pt-3 pb-2'>
                                    <button type='submit' className='solid-button rad-3-im mx-0 reduced-im' disabled={isSubmitting}>
                                        {isSubmitting ? 'SUBMITTING..' : 'LOGIN'}
                                    </button>
                                </div>
                                <div className='text-right pb-2'>
                                    <Link to={`/${routeConstants.registerVendor}`} className='reduced-x clickable-link'>SIGNUP</Link>
                                    <Link to={`/${routeConstants.forgotPassword}`} className='reduced-x clickable-link ml-5'>FORGOT PASSWORD</Link>
                                </div>
                                <div className='text-center pt-3 pb-2'>
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
    );
}

export default AdminLoginForm;
