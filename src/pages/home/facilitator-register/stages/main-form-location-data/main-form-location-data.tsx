import { Formik, FormikProps, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { coreStates, coreLgas, coreWards, getState, getLgas, getWards } from '../../../../../services/utils/core-api-util';
import './main-form-location-data.scss';

function MainFormLocationData(props: any) {

    const [stateList, setStateList] = useState<any>([]);
    const [lgaList, setLgaList] = useState<any>(coreLgas);
    const [wardList, setWardList] = useState<any>(coreWards);

    const goBack = () => {
        props.updateForm({});
    }

    const submit = (values: any, controls: any) => {
        controls.setSubmitting(false);
        props.updateForm(values, true);
    }

    const stateChange = (values: any, change: any) => {
        values.lga = '';
        const id = change.target.value; 
        setLgaList([]);
        if(!id) return
        getLgas(id,(lgas: any)=> {
            setLgaList(lgas);
        });
    }

    const validate = (values: FormikValues) => {   
        const errors: any = {};
    
        if (!values.state) {
        errors.state = 'Required';
        } else if (!values.lga) {
        errors.lga = 'Required';
        }
    
        return errors;
    }

    const lgaChange = (values: any, change: any) => {
        values.lga = '';
        const id = change.target.value; 
        setWardList([]);
        if(!id) return
        getWards(id,(wards: any)=> {
            setWardList(wards);
        });
    }

    useEffect(() => {
        if(coreStates.length === 0) {
            getState((states: any)=> {
                setStateList(states);
            });
        } else {
            setStateList(coreStates);
        }
    }, [props])

    return (
        <div className=''>
            <Formik initialValues={{
                state: props.form?.state || '',
                lga: props.form?.lga || '',
                ward: props.form?.ward || '',
                houseNo: props.form?.houseNo || '',
                streetName: props.form?.streetName || '',
                city: props.form?.city || '',
            }}
            // validationSchema={Yup.object().shape({
            //     state: Yup.string().required('State is required'),
            //     lga: Yup.string().required('LGA is required'),
            //     ward: Yup.string().required('Ward is required'),
            //     houseNo: Yup.string().required('House NUMBER is required'),
            //     streetName: Yup.string().required('Street Name is required'),
            //     city: Yup.string().required('City is required'),
            // })}
            onSubmit={(values, controls) => submit(values, controls)}
            validateOnMount={true}
            validateOnChange={true}
            validate={(value) => validate(value)}
            >
                {
                    (props: FormikProps<{
                        state: string,
                        lga: string,
                        ward: string,
                        houseNo: string,
                        streetName: string,
                        city: string,
                    }>) => {
                        const {
                            values,
                            errors,
                            touched,
                            isSubmitting,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isValid,
                            // validateForm
                        } = props;
                        console.log({isValid, props});
                        return (
                            <form action="" onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <h5 className='text-center pt-3'>Location Data</h5>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>State</label>
                                            <select
                                                id='state'
                                                value={values.state}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.state = ''}
                                                onChange={(change) => {handleChange(change); stateChange(values, change)}}
                                                className={(errors.state && touched.state) ? 'im-error' : ''}
                                            >
                                                <option value='' >Choose State</option>
                                                {stateList.map((state: any, index: number) => <option key={index} value={state.id}>{state.name}</option>)}
                                            </select>
                                            {
                                                errors.state && touched.state &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.state}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>LGA</label>
                                            <select
                                                id='lga'
                                                value={values.lga}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.lga = ''}
                                                onChange={(change) => {handleChange(change); lgaChange(values, change)}}
                                                className={(errors.lga && touched.lga) ? 'im-error' : ''}
                                            >
                                                <option value='' disabled>Choose Lga</option>
                                                {lgaList.map((lga: any, index: number) => <option key={index} value={lga.id}>{lga.name}</option>)}
                                            </select>
                                            {
                                                errors.lga && touched.lga &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.lga}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Ward</label>
                                            <select
                                                id='ward'
                                                value={values.ward}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.ward = ''}
                                                onChange={handleChange}
                                                className={(errors.ward && touched.ward) ? 'im-error' : ''}
                                                >
                                                    <option value='' disabled>Choose Ward</option>
                                                    {wardList.map((ward: any, index: number) => <option key={index} value={ward.id}>{ward.name}</option>)}
                                                </select>
                                            {
                                                errors.ward && touched.ward &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.ward}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>House Number</label>
                                            <input
                                                type="text"
                                                placeholder='enter your house number'
                                                id='houseNo'
                                                value={values.houseNo}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.houseNo = ''}
                                                onChange={handleChange}
                                                className={(errors.houseNo && touched.houseNo) ? 'im-error' : ''}
                                            />
                                            {
                                                errors.houseNo && touched.houseNo &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.houseNo}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Street Name</label>
                                            <input
                                                type="text"
                                                placeholder='Enter your street name'
                                                id='streetName'
                                                value={values.streetName}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.streetName = ''}
                                                onChange={handleChange}
                                                className={(errors.streetName && touched.streetName) ? 'im-error' : ''}
                                            />
                                            {
                                                errors.streetName && touched.streetName &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.streetName}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>City/Town</label>
                                            <input
                                                type="text"
                                                placeholder='Enter your city'
                                                id='city'
                                                value={values.city}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.city = ''}
                                                onChange={handleChange}
                                                className={(errors.city && touched.city) ? 'im-error' : ''}
                                            />
                                            {
                                                errors.city && touched.city &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.city}</p>
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

export default MainFormLocationData;
