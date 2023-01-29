import { Formik, FormikProps, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../../services/utils/request';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Istate } from '../../../services/constants/interfaces/state-schemas';
import './confirm-email-form.scss';
import { useNavigate } from 'react-router';
import { routeConstants } from '../../../services/constants/route-constants';
import { Link } from 'react-router-dom';
import { Logo } from '../../../assets/images';
import UserNavigationComponent from '../../../services/utils/navigation-component';
import { regexConstants } from '../../../services/constants/validation-regex';

function AdminConfirmEmailForm() {

    const [response, setResponse] = useState<any>();
    const [useNav, setUseNav] = useState(false);
    const sessionData = useSelector((state: Istate) => state.session);
    const userRole = sessionData.user?.role;

    const navigate = useNavigate();

    const validate = (values: FormikValues) => {   
        const errors: any = {};
    
        if (!values.code) {
        errors.code = 'Code is required';
        } else if (values.code.length < 4) {
        errors.code = 'Code can not be less than 4 digits';
        }
        return errors;
    }

    const submitRegistration = (values: any, controls: any) => {
        sendRequest({
            url: 'auth/verify-code',
            method: 'POST',
            body: {
                verificationCode: values.code,
            }
        }, (res: any) => {
            toast.error(res.message);
            switch(userRole) {
            // case routeConstants.userLevels.systemAdmin:
            //     navigate(`/${routeConstants.systemAdmin}`);
            //     break;
            case routeConstants.userLevels.vendor:
                navigate(`/${routeConstants.vendor}`);
                break;
            case routeConstants.userLevels.dispatcher:
                navigate(`/${routeConstants.dispatcher}`);
                break;
            }
            setUseNav(true);
        }, (err: any) => {
            controls.setSubmitting(false);
            const message = err.error?.emailError || err.message || 'Unable to complete';
            setResponse(<p className='c-red mb-0 pt-2'>{message}</p>);
            toast.error(message);
        });
    }

    const clearResponse = () => {
        setResponse(undefined);
    }

    useEffect(() => {
    });

    return (
        <div className='admin-login-box' onClick={clearResponse}>
            {/* {useNav && <UserNavigationComponent />} */}
            <div className='spread-info py-3'>
                <Link to={routeConstants.home}>
                    <img src={Logo} width={130} alt="" />
                </Link>
                <span></span>
            </div>
            <Formik initialValues={{
                code: '',
            }}
            validate={(value) => validate(value)}
            onSubmit={(values, controls) => submitRegistration(values, controls)}
            >
                {
                    (props: FormikProps<{
                        code: string,
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
                                <h6 className='pt-4'>Email confirmation</h6>
                                <p className='c-faint-font reduced'>Enter code sent to your email</p>
                                <div className='reg-card'>
                                    <label className='text-left'>Code</label>
                                    <input
                                        type="text"
                                        placeholder='enter your code'
                                        id='code'
                                        value={values.code}
                                        onBlur={handleBlur}
                                        onFocus={() => errors.code = ''}
                                        onChange={handleChange}
                                        className={(errors.code && touched.code) ? 'im-error' : ''}
                                    />
                                    {
                                        errors.code && touched.code &&
                                        <p className='reduced error-popup pt-1 mb-0'>{errors.code}</p>
                                    }
                                </div>
                                <div className='text-center pt-3 pb-2'>
                                    <button type='submit' className='solid-button rad-3-im mx-0 reduced-im' disabled={isSubmitting}>
                                        {isSubmitting ? 'SUBMITTING..' : 'PROCEED'}
                                    </button>
                                </div>
                            </form>
                        );
                    }
                }
            </Formik>
        </div>
    );
}

export default AdminConfirmEmailForm;
