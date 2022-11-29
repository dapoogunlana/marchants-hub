import { Formik, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { coreBanks, getBanks } from '../../../../../services/utils/core-api-util';
import { acceptOnlyNumbers } from '../../../../../services/utils/data-manipulation-utilits';
import './main-form-financial-information.scss';

function MainFormFinancialInformation(props: any) {

    const [bankList, setBankList] = useState<any>([]);

    const goBack = () => {
        props.updateForm({});
    }

    const submit = (values: any, controls: any) => {
        controls.setSubmitting(false);
        props.updateForm(values, true);
    }

    useEffect(() => {
        if(coreBanks.length === 0) {
            getBanks((banks: any)=> {
                setBankList(banks);
            });
        } else {
            setBankList(coreBanks);
        }
    }, [props])

    return (
        <div className=''>
            <Formik initialValues={{
                bank: props.form?.bank || '',
                account: props.form?.account || '',
            }}
            // validationSchema={Yup.object().shape({
            //     firstName: Yup.string().required('First name is required'),
            //     account: Yup.string().required('Account Number is required'),
            //     email: Yup.string().required('Email is required').matches(regexConstants.emailPattern, 'Invalid email'),
            //     phoneNo: Yup.string().required('Phone number is required').min(8, 'Phone number must be at least 8 characters'),
            // })}
            onSubmit={(values, controls) => submit(values, controls)}
            >
                {
                    (props: FormikProps<{
                        bank: string,
                        account: string,
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
                                        <h5 className='text-center pt-3'>Financial Information</h5>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Bank</label>
                                            <select
                                                id='bank'
                                                value={values.bank}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.bank = ''}
                                                onChange={handleChange}
                                                onKeyUp={acceptOnlyNumbers}
                                                className={(errors.bank && touched.bank) ? 'im-error' : ''}
                                            >
                                                <option value='' disabled >Choose Bank</option>
                                                {bankList.map((bank: any, index: number) => <option key={index} value={bank.id}>{bank.name}</option>)}
                                            </select>
                                            {
                                                errors.bank && touched.bank &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.bank}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Account Number</label>
                                            <input
                                                type="text"
                                                placeholder='Enter your account number'
                                                id='account'
                                                value={values.account}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.account = ''}
                                                onChange={handleChange}
                                                className={(errors.account && touched.account) ? 'im-error' : ''}
                                            />
                                            {
                                                errors.account && touched.account &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.account}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-12 text-center pt-3 pb-2 px-2'>
                                        <button type='button' className='btn btn-warning' onClick={goBack}>Back</button>
                                        <button type='submit' className='btn btn-success' disabled={isSubmitting}>{isSubmitting ? 'Processing..' : 'Next'}</button>
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

export default MainFormFinancialInformation;
