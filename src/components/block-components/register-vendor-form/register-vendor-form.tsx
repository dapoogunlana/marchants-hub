import { Formik, FormikProps, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react';
// import * as Yup from 'yup';
import * as qs from 'qs';
import { sendRequest } from '../../../services/utils/request';
import { toast } from 'react-toastify';

import './register-vendor-form.scss';
import { useNavigate } from 'react-router';
import { routeConstants } from '../../../services/constants/route-constants';
import { Link } from 'react-router-dom';
import { Logo } from '../../../assets/images';
import { useDispatch } from 'react-redux';
import { login } from '../../../services/actions/session-actions';
import UserNavigationComponent from '../../../services/utils/navigation-component';
import { regexConstants } from '../../../services/constants/validation-regex';
import { prepareVendorRegisterForm } from '../../../services/utils/form-preparation-service';
import { acceptOnlyNumbers, clearSpaces } from '../../../services/utils/data-manipulation-utilits';
// import { login } from '../../../services/actions/session-actions';
// import { regexConstants } from '../../../services/constants/validation-regex';

function RegisterVendorForm() {

    const [response, setResponse] = useState<any>();
    const [showPassword, setShowPassword] = useState(false);
    const [verifying, setVerifying] = useState(false);
    // let statutoryIdFile: any;
    const [useNav, setUseNav] = useState(false);
    const [accountDetailsVerified, setAccountDetailsVerified] = useState(false);

    const [states, setStates] = useState([]);
    const [banks, setBanks] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = (values: FormikValues, change?: any) => {   
        const errors: any = {};
        console.log({values});
        // if(change) {
        //     const file =change.target.files[0];
        //     console.log('hahahahaha');
        //     if (file) {
        //         const format = file.name.substring(file.name.lastIndexOf('.') + 1);
        //         console.log({change, file, format });
        //         if (format !== 'png' && format !== 'jpg') {
        //             errors.statutoryID = 'Invalid format';
        //         }
        //     } else {

        //     }
        // }
        // const file = change?.target?.files[0];
        // const format = file ? file.name.substring(file.name.lastIndexOf('.') + 1) : '';
        // const fileSize = file ? file.size : '';
        // const invalidFormat = (format !== 'png' && format !== 'jpg' && format !== 'jpeg' && format !== 'pdf') ? true : false;
        // const invalid = invalidFormat && format ? true : false;
        // // console.log({format, invalidFormat, invalid, fileSize})
    
        if (!values.storeName) {
            errors.storeName = 'Store name is required';
        }
        if (!values.email) {
            errors.email = 'Email is required';
        }
        if (!regexConstants.emailPattern.test(values.email)) {
            errors.email = 'Invalid email';
        }
        if (!values.phoneNumber) {
            errors.phoneNumber = 'Phone number is Required';
        } else if (!regexConstants.phonePattern.test(values.phoneNumber)) {
            errors.phoneNumber = 'Invalid phone number';
        }
        if (!values.bizFirstName) {
            errors.bizFirstName = 'Field Required';
        }
        if (!values.bizLastName) {
            errors.bizLastName = 'Field Required';
        }
        if (!values.stateOfOperation) {
            errors.stateOfOperation = 'Field Required';
        }
        if (!values.address) {
            errors.address = 'Field Required';
        }
        if (!values.bankName) {
            errors.bankName = 'Field Required';
        }
        if (!values.bankAccount) {
            errors.bankAccount = 'Field Required';
        } else if (values.bankAccount.length !== 10) {
            errors.bankAccount = 'Invalid account number';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 6) {
            errors.password = 'Password can not be lass than 6 characters';
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Password confirmation is required';
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        if (!values.statutoryID) {
            errors.statutoryID = 'Statutory ID is required';
        }
        if(values.file){
            console.log('there is a file');
            const format = values.file.name?.substring(values.file.name.lastIndexOf('.') + 1);
            if(format !== 'jpg' && format !== 'jpeg' && format !== 'png' && format !== 'gif' && format !== 'pdf'){
                errors.statutoryID = 'Invalid format';
            }else if(values.file.size > 2097152){
                errors.statutoryID = 'Image must not be more than 2MB';
            }
        }
        return errors;
    
    }

    const getBanks = () => {
        sendRequest({
            url: 'banks',
        }, (res: any) => {
            setBanks(res.data || []);
        }, (err: any) => {
        });
    }
    const getStates = () => {
        sendRequest({
            url: 'https://countriesnow.space/api/v0.1/countries/states',
            external: true,
            method: 'POST',
            body: {
                "country": "nigeria"
            }
        }, (res: any) => {
            setStates(res.data.states || []);
        }, (err: any) => {
        });
    }
    
    const verifyAccountDetails = (values: FormikValues) => {
        const payload = {
            account_no: values.bankAccount,
            bank_code: values.bankName.split('|')[0],
            bank_name: values.bankName.split('|')[1],
        }
        setVerifying(true);
        sendRequest({
            url: 'verify-account',
            method: 'POST',
            body: payload
        }, (res: any) => {
            setVerifying(false);
            setAccountDetailsVerified(true);
            toast.success('Account verified successfully');
        }, (err: any) => {
            setVerifying(false);
            toast.error(err.message);
        });
    }

    const submitRegistration = (values: any, controls: any) => {
        if(!accountDetailsVerified) {
            toast.error('Account details have to be verified for you to proceed');
            controls.setSubmitting(false);
            return;
        }
        sendRequest({
            url: 'auth/register',
            method: 'POST',
            body: prepareVendorRegisterForm(values)
        }, (res: any) => {
            controls.setSubmitting(false);
            toast.success(res.message);
            dispatch(login(res.data))
            navigate(`/${routeConstants.confirmEmail}`);
        }, (err: any) => {
            controls.setSubmitting(false);
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
        getBanks();
        getStates();
    }, []);

    return (
        <div className='register-box' onClick={clearResponse}>
            {useNav && <UserNavigationComponent />}
            <div className='spread-info pb-3'>
                <Link to={routeConstants.home}>
                    <img src={Logo} width={130} alt="" />
                </Link>
                <span></span>
            </div>
            <Formik initialValues={{
                storeName: '',
                email: '',
                phoneNumber: '',
                bizFirstName: '',
                bizLastName: '',
                stateOfOperation: '',
                address: '',
                bankName: '',
                bankAccount: '',
                password: '',
                confirmPassword: '',
                statutoryID: '',
            }}
            // validationSchema={Yup.object().shape({
            //     email: Yup.string().required('Email is required').matches(regexConstants.emailPattern, 'Invalid email'),
            //     password: Yup.string().required('Password is required'),
            // })}
            validate={(value) => validate(value)}
            onSubmit={(values, controls) => submitRegistration(values, controls)}
            >
                {
                    (props: FormikProps<{
                        storeName: string,
                        email: string,
                        phoneNumber: string,
                        bizFirstName: string,
                        bizLastName: string,
                        stateOfOperation: string,
                        address: string,
                        bankName: string,
                        bankAccount: string,
                        password: string,
                        confirmPassword: string,
                        statutoryID: string,
                    }>) => {
                        const {
                            values,
                            errors,
                            touched,
                            isSubmitting,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                        } = props;
                        return (
                            <form action="" onSubmit={handleSubmit}>
                                <div className='reg-card'>
                                    <label className='text-left'>Store  Name</label>
                                    <input
                                        type="text"
                                        // placeholder='Eg Azeta Technologies'
                                        id='storeName'
                                        value={values.storeName}
                                        onBlur={handleBlur}
                                        onFocus={() => errors.storeName = ''}
                                        onChange={handleChange}
                                        className={(errors.storeName && touched.storeName) ? 'im-error' : ''}
                                    />
                                    {
                                        errors.storeName && touched.storeName &&
                                        <p className='reduced error-popup pt-1 mb-0'>{errors.storeName}</p>
                                    }
                                </div>
                                <div className='reg-card'>
                                    <label className='text-left'>Email</label>
                                    <input
                                        type="email"
                                        // placeholder='enter your email'
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
                                    <label className='text-left'>Phone Number</label>
                                    <input
                                        type="text"
                                        // placeholder='Enter Phone number'
                                        id='phoneNumber'
                                        value={values.phoneNumber}
                                        onBlur={handleBlur}
                                        onFocus={() => errors.phoneNumber = ''}
                                        onChange={handleChange}
                                        className={(errors.phoneNumber && touched.phoneNumber) ? 'im-error' : ''}
                                    />
                                    {
                                        errors.phoneNumber && touched.phoneNumber &&
                                        <p className='reduced error-popup pt-1 mb-0'>{errors.phoneNumber}</p>
                                    }
                                </div>
                                <div className='info-grid'>
                                    <div className='reg-card'>
                                        <label className='text-left'>Business owner first name</label>
                                        <input
                                            type="text"
                                            // placeholder='Enter first name'
                                            id='bizFirstName'
                                            value={values.bizFirstName}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.bizFirstName = ''}
                                            onChange={handleChange}
                                            onKeyUp={clearSpaces}
                                            className={(errors.bizFirstName && touched.bizFirstName) ? 'im-error' : ''}
                                        />
                                        {
                                            errors.bizFirstName && touched.bizFirstName &&
                                            <p className='reduced error-popup pt-1 mb-0'>{errors.bizFirstName}</p>
                                        }
                                    </div>
                                    <div></div>
                                    <div className='reg-card'>
                                        <label className='text-left'>Business owner last name</label>
                                        <input
                                            type="text"
                                            // placeholder='Enter last name'
                                            id='bizLastName'
                                            value={values.bizLastName}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.bizLastName = ''}
                                            onChange={handleChange}
                                            onKeyUp={clearSpaces}
                                            className={(errors.bizLastName && touched.bizLastName) ? 'im-error' : ''}
                                        />
                                        {
                                            errors.bizLastName && touched.bizLastName &&
                                            <p className='reduced error-popup pt-1 mb-0'>{errors.bizLastName}</p>
                                        }
                                    </div>
                                </div>
                                <div className='info-grid'>
                                    <div className='reg-card'>
                                        <label className='text-left temp-hidden'>State of Operation</label>
                                        <select
                                            id='stateOfOperation'
                                            value={values.stateOfOperation}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.stateOfOperation = ''}
                                            onChange={handleChange}
                                            className={(errors.stateOfOperation && touched.stateOfOperation) ? 'im-error' : ''}
                                        >
                                            <option value="" disabled>State of Operation</option>
                                            {
                                                states.map((item: any, index) => {
                                                    return <option key={index} value={item.state_code}>{item.name}</option>
                                                })
                                            }
                                        </select>
                                        {
                                            errors.stateOfOperation && touched.stateOfOperation &&
                                            <p className='reduced error-popup pt-1 mb-0'>{errors.stateOfOperation}</p>
                                        }
                                    </div>
                                    <div></div>
                                    <div className='reg-card'>
                                        <label className='text-left'>Address</label>
                                        <input
                                            type="text"
                                            // placeholder='Enter address'
                                            id='address'
                                            value={values.address}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.address = ''}
                                            onChange={handleChange}
                                            className={(errors.address && touched.address) ? 'im-error' : ''}
                                        />
                                        {
                                            errors.address && touched.address &&
                                            <p className='reduced error-popup pt-1 mb-0'>{errors.address}</p>
                                        }
                                    </div>
                                </div>
                                <p className='financial-disclaimer'>
                                    Ensure your bank details matches your name as this is a KYC requirement
                                </p>
                                <div className='info-grid'>
                                    <div className='reg-card'>
                                        <label className='text-left temp-hidden'>Bank name</label>
                                        <select
                                            id='bankName'
                                            value={values.bankName}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.bankName = ''}
                                            onChange={(change) => {handleChange(change); setAccountDetailsVerified(false)}}
                                            className={(errors.bankName && touched.bankName) ? 'im-error' : ''}
                                        >
                                            <option value="" disabled>Select Bank Name</option>
                                            {
                                                banks.map((item: any, index) => {
                                                    return <option key={index} value={item.code + '|' + item.name}>{item.name}</option>
                                                })
                                            }
                                        </select>
                                        {
                                            errors.bankName && touched.bankName &&
                                            <p className='reduced error-popup pt-1 mb-0'>{errors.bankName}</p>
                                        }
                                    </div>
                                    <div></div>
                                    <div className='reg-card'>
                                        <label className='text-left'>Bank Account</label>
                                        <input
                                            type="text"
                                            // placeholder='Enter bank account'
                                            id='bankAccount'
                                            value={values.bankAccount}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.bankAccount = ''}
                                            onChange={(change) => {handleChange(change); setAccountDetailsVerified(false)}}
                                            onKeyUp={acceptOnlyNumbers}
                                            className={(errors.bankAccount && touched.bankAccount) ? 'im-error' : ''}
                                        />
                                        {
                                            errors.bankAccount && touched.bankAccount &&
                                            <p className='reduced error-popup pt-1 mb-0'>{errors.bankAccount}</p>
                                        }
                                    </div>
                                </div>
                                {
                                    values.bankName && values.bankAccount.length === 10 && !accountDetailsVerified &&
                                    <div className={'solid-button rad-3-im mx-0 reduced-im my-2 text-center clickable' + (verifying ? ' deactivated' : '')} onClick={() => verifyAccountDetails(values)}>
                                        {
                                            verifying ?
                                            <>Verifying.. Account</> :
                                            <>Verify Account</>
                                        }
                                    </div>
                                }
                                {
                                    (!values.bankName || values.bankAccount.length !== 10) && !accountDetailsVerified &&
                                    <p className='sreduced-im text-center reduced-im mt-1 text-danger'>
                                        Account Details not verified
                                    </p>
                                }
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
                                        onKeyUp={clearSpaces}
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
                                        onKeyUp={clearSpaces}
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
                                <div className='upload-box'>
                                    <label className='text-left'>Upload clear government issued ID card of business owner</label>
                                    <input
                                        type="file"
                                        id='statutoryID'
                                        required
                                        value={values.statutoryID}
                                        onBlur={handleBlur}
                                        onFocus={() => errors.statutoryID = ''}
                                        // onChange={(change) => {handleChange(change); validate(values, change)}}
                                        // onChange={(change: any) => {handleChange(change); setStatutoryIdFile(change?.target?.files[0])}}
                                        onChange={(event: any) => {
                                            handleChange(event);
                                            setFieldValue("file", event.currentTarget.files[0]);
                                        }}
                                        className={(errors.statutoryID && touched.statutoryID) ? 'im-error' : ''}
                                    />
                                    {
                                        errors.statutoryID && touched.statutoryID &&
                                        <p className='reduced error-popup pt-1 mb-0'>{errors.statutoryID}</p>
                                    }
                                </div>
                                <div className='text-center pt-3 pb-2'>
                                    <button type='submit' className='solid-button rad-3-im mx-0 reduced-im' disabled={isSubmitting}>
                                        {isSubmitting ? 'SUBMITTING..' : 'REGISTER STORE'}
                                    </button>
                                </div>
                                <div className='text-right pb-2'>
                                    <Link to={`/${routeConstants.login}`} className='reduced-x clickable-link'>HAVE AN ACCOUNT? SIGN IN</Link>
                                </div>
                            </form>
                        );
                    }
                }
            </Formik>
        </div>
    );
}

export default RegisterVendorForm;
