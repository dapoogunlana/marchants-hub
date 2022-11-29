import { Formik, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Select from "react-select";
import { educationLevelsArray, occupationArray } from '../../../../../services/constants/general-constants';
import { regexConstants } from '../../../../../services/constants/validation-regex';
import { coreOcupations, getOcupations } from '../../../../../services/utils/core-api-util';
import { sendRequest } from '../../../../../services/utils/request';

import './main-form-biodata.scss';

function MainFormBiodata(props: any) {

    const [pillars, setPillars] = useState([]);
    const [ocupations, setOcupations] = useState([]);
    const [location, setLocation] = useState('');
    const [selectedPillars, setSelectedPillars] = useState();

    const submit = (values: any, controls: any) => {
        console.log({any: 'Any now'});
        controls.setSubmitting(false);
        if(!location) {
            toast.error('You need to allow location to continue')
            return;
        }
        props.updateForm({...values, location}, true);
    }

    const getPillars = () => {
        sendRequest({
            url: 'pillar',
        }, (res: any) => {
            const modifiedPillars = res.payload?.map((item: any) => {
                item.value = item.id;
                item.label = item.name;
                return item;
            }) || [];
            setPillars(modifiedPillars);
        }, (err: any) => {
            toast.error(err.responseText || 'Unable to verify');
        });
    };

    useEffect(() => {
        if(pillars.length === 0) {
            getPillars();
        }
        if(!coreOcupations || coreOcupations.length === 0) {
            getOcupations((states: any)=> {
                setOcupations(states);
            });
        } else {
            setOcupations(coreOcupations);
        }
        navigator.geolocation.getCurrentPosition((location) => {
        setLocation(`${location.coords.longitude}, ${location.coords.latitude}`);
        }, null, {});
    }, [props]);

    return (
        <div className=''>
            <Formik initialValues={{
                firstName: props.form?.firstName || '',
                middleName: props.form?.middleName || '',
                lastName: props.form?.lastName || '',
                dob: props.form?.dob?.split('T')[0] || '',
                gender: props.form?.gender || '',
                bvn: props.form?.bvn || '',
                bvn_phone: props.form?.bvn_phone || '',
                contact_phone: props.form?.contact_phone || '',
                email: props.form?.email || '',
                current_oucupation: props.form?.current_oucupation || '',
                highest_educational_level: props.form?.highest_educational_level || '',
                number_of_depandents: props.form?.number_of_depandents || '',
                pillar: props.form?.pillar || [],
            }}
            validationSchema={Yup.object({
                firstName: Yup.string().required('First name is required'),
                middleName: Yup.string().required('Middle name is required'),
                lastName: Yup.string().required('Last name is required'),
                dob: Yup.string().required('Date of Birth is required'),
                gender: Yup.string().required('Gender is required'),
                bvn: Yup.string().required('BVN is required'),
                bvn_phone: Yup.string().required('Phone number is required'),
                contact_phone: Yup.string().required('Phone number is required')
                    .min(8, 'Phone number must be at least 8 characters')
                    .matches(regexConstants.phonePattern, 'Invalid phone number'),
                email: Yup.string().required('Email is required').matches(regexConstants.emailPattern, 'Invalid email'),
                current_oucupation: Yup.string().required('First is required'),
                guarantors_office_address: Yup.string().required('Guarantors office address is required'),
                highest_educational_level: Yup.string().required('Highest educational_level is required'),
                // pillar: Yup.string().required('First is required'),
            })}
            onSubmit={(values, controls) => submit(values, controls)}
            >
                {
                    (Props: FormikProps<{
                        firstName: string,
                        middleName: string,
                        lastName: string,
                        dob: string,
                        gender: string,
                        bvn: string,
                        bvn_phone: string,
                        contact_phone: string,
                        email: string,
                        current_oucupation: string,
                        highest_educational_level: string,
                        number_of_depandents: string,
                        pillar: string[],
                    }>) => {
                        const {
                            values,
                            errors,
                            touched,
                            isSubmitting,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setValues,
                            isValid,
                            isInitialValid,
                        } = Props;
                        return (
                            <form action="" onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <h5 className='text-center pt-3'>Biodata</h5>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>First Name</label>
                                            <input
                                                type="text"
                                                placeholder='Enter your first name'
                                                id='firstName'
                                                value={values.firstName}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.firstName = ''}
                                                onChange={handleChange}
                                                disabled={props.form?.firstName !== '' && props.form?.firstName !== undefined}
                                                className={(errors.firstName && touched.firstName) ? 'im-error' : ''}
                                            />
                                            {
                                                errors.firstName && touched.firstName &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.firstName}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Middle Name</label>
                                            <input
                                                type="text"
                                                placeholder='Enter your middle name'
                                                id='middleName'
                                                value={values.middleName}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.middleName = ''}
                                                onChange={handleChange}
                                                disabled={props.form?.middleName?.trim() || props.form?.middleName === 0}
                                                className={(errors.middleName && touched.middleName) ? 'im-error' : ''}
                                            />
                                            {
                                                errors.middleName && touched.middleName &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.middleName}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Last Name</label>
                                            <input
                                                type="text"
                                                placeholder='Enter your last name'
                                                id='lastName'
                                                value={values.lastName}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.lastName = ''}
                                                onChange={handleChange}
                                                disabled={props.form?.lastName !== '' && props.form?.lastName !== undefined}
                                                className={(errors.lastName && touched.lastName) ? 'im-error' : ''}
                                            />
                                            {
                                                errors.lastName && touched.lastName &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.lastName}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Date of Birth</label>
                                            <input
                                                type="date"
                                                placeholder='Enter your Date of Birth'
                                                id='dob'
                                                value={values.dob}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.dob = ''}
                                                onChange={handleChange}
                                                onKeyDown={(e) => e.preventDefault()}
                                                disabled={props.form?.dob !== '' && props.form?.dob !== undefined}
                                                className={(errors.dob && touched.dob) ? 'im-error' : ''}
                                            />
                                            {
                                                errors.dob && touched.dob &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.dob}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Gender</label>
                                            <select
                                                id='gender'
                                                value={values.gender}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.gender = ''}
                                                disabled={props.form?.gender !== '' && props.form?.gender !== undefined}
                                                onChange={handleChange}
                                                className={(errors.gender && touched.gender) ? 'im-error' : ''}
                                            >
                                                <option value='' disabled>Gender</option>
                                                <option value={'Male'}>Male</option>
                                                <option value={'Female'}>Female</option>
                                            </select>
                                            {
                                                errors.gender && touched.gender &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.gender}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>BVN</label>
                                            <input
                                                type="text"
                                                placeholder='Enter your BVN'
                                                id='bvn'
                                                value={values.bvn}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.bvn = ''}
                                                onChange={handleChange}
                                                disabled={props.form?.bvn !== '' && props.form?.bvn !== undefined}
                                                className={(errors.bvn && touched.bvn) ? 'im-error' : ''}
                                            />
                                            {
                                                errors.bvn && touched.bvn &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.bvn}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>BVN Phone Number</label>
                                            <input
                                                type="text"
                                                placeholder='Enter your phone number'
                                                id='bvn_phone'
                                                value={values.bvn_phone}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.bvn_phone = ''}
                                                onChange={handleChange}
                                                disabled={props.form?.bvn_phone !== '' && props.form?.bvn_phone !== undefined}
                                                className={(errors.bvn_phone && touched.bvn_phone) ? 'im-error' : ''}
                                            />
                                            {
                                                errors.bvn_phone && touched.bvn_phone &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.bvn_phone}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Contact Phone Number</label>
                                            <input
                                                type="text"
                                                placeholder='Enter your phone number'
                                                id='contact_phone'
                                                value={values.contact_phone}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.contact_phone = ''}
                                                onChange={handleChange}
                                                className={(errors.contact_phone && touched.contact_phone) ? 'im-error' : ''}
                                            />
                                            {
                                                errors.contact_phone && touched.contact_phone &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.contact_phone}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                placeholder='Enter your email'
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
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Current Occupation</label>
                                            <select
                                                id='current_oucupation'
                                                value={values.current_oucupation}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.current_oucupation = ''}
                                                onChange={handleChange}
                                                className={(errors.current_oucupation && touched.current_oucupation) ? 'im-error' : ''}
                                            >
                                                <option value='' disabled>Choose Occupation</option>
                                                {occupationArray.map((ocupation: any, index: number) => <option key={index} value={ocupation.id}>{ocupation.name}</option>)}
                                            </select>
                                            {
                                                errors.current_oucupation && touched.current_oucupation &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.current_oucupation}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Highest Educational Level</label>
                                            <select
                                                id='highest_educational_level'
                                                value={values.highest_educational_level}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.highest_educational_level = ''}
                                                onChange={handleChange}
                                                className={(errors.highest_educational_level && touched.highest_educational_level) ? 'im-error' : ''}
                                            >
                                                <option value='' disabled >Choose Highest Educational Level</option>
                                                {educationLevelsArray.map((level: any, index: number) => <option key={index} value={level.id}>{level.name}</option>)}
                                            </select>
                                            {
                                                errors.highest_educational_level && touched.highest_educational_level &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.highest_educational_level}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Number of Depandents</label>
                                            <input
                                                type="file"
                                                placeholder='Enter your number of depandents'
                                                id='number_of_depandents'
                                                value={values.number_of_depandents}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.number_of_depandents = ''}
                                                onChange={handleChange}
                                                className={(errors.number_of_depandents && touched.number_of_depandents) ? 'im-error' : ''}
                                            />
                                            {
                                                errors.number_of_depandents && touched.number_of_depandents &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.number_of_depandents}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-12'>
                                        <div className='reg-card'>
                                            <label>Pillars</label>
                                            {/* <select
                                                id='pillar'
                                                value={values.pillar}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.pillar = ''}
                                                onChange={handleChange}
                                                className={(errors.pillar && touched.pillar) ? 'im-error' : ''}
                                            >
                                                <option value='' disabled>Choose Pillar</option>
                                                {pillars.map((pillar: any, index: number) => <option key={index} value={pillar.id}>{pillar.name}</option>)}
                                            </select> */}
                                            <Select
                                                options={pillars}
                                                placeholder="Choose Pillar"
                                                value={values.pillar}
                                                onChange={(e: any) => setValues({...values, pillar: e})}
                                                isSearchable={true}
                                                isMulti              
                                                closeMenuOnSelect={false}
                                                hideSelectedOptions={false}
                                            />
                                            {
                                                errors.pillar && touched.pillar &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.pillar}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-12 text-center pt-3 pb-2 px-2'>
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

export default MainFormBiodata;
