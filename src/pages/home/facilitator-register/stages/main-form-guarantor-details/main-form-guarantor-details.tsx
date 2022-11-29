import { Formik, FormikProps } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { educationLevelsArray, occupationArray, relationshipArray } from '../../../../../services/constants/general-constants';
import { regexConstants } from '../../../../../services/constants/validation-regex';
import './main-form-guarantor-details.scss';
import { CameraFeed } from '../../../../../components/block-components/webcam/camera';
import { toast } from 'react-toastify';
import { assignUserImage, userImage } from '../../../../../services/utils/facilitator-registration-service';

function MainFormGuarantorDetails(props: any) {

    const [image, setImage] = useState<any>(userImage);

    const goBack = () => {
        props.updateForm({});
    }

    const captureImage = (file: any) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (item) => {
            setImage(item.target?.result);
            assignUserImage(item.target?.result);
        };
    }

    const submit = (values: any, controls: any) => {
        controls.setSubmitting(false);
        if(!image) {
            toast.error('You need to snap your picture to proceed')
            return;
        }
        props.updateForm({...values, image}, true);
    }

    return (
        <div className=''>
            <Formik initialValues={{
                guarantors_name: props.form?.guarantors_name || '',
                guarantors_relationship: props.form?.guarantors_relationship || '',
                guarantors_phone_number: props.form?.guarantors_phone_number || '',
                guarantors_occupation: props.form?.guarantors_occupation || '',
                guarantors_office_address: props.form?.guarantors_office_address || '',
                guarantors_highest_educational_level: props.form?.guarantors_Highest_educational_level || '',
                number_of_depandents: props.form?.number_of_depandents || '',
            }}
            // validationSchema={Yup.object().shape({
            //     guarantors_name: Yup.string().required('Guarantors name is required'),
            //     guarantors_relationship: Yup.string().required('Guarantors relationship is required'),
            //     guarantors_phone_number: Yup.string().required('Guarantors phone number is required')
            //         .matches(regexConstants.phonePattern, 'Invalid phone number')
            //         .max(11, 'phone number can not exceed 11'),
            //     guarantors_occupation: Yup.string().required('Guarantors occupation is required'),
            //     guarantors_office_address: Yup.string().required('Guarantors office address is required'),
            //     guarantors_highest_educational_level: Yup.string().required('Highest educational_level is required'),
            //     number_of_depandents: Yup.number().required('Number of depandents is required'),
            // })}
            onSubmit={(values, controls) => submit(values, controls)}
            >
                {
                    (props: FormikProps<{
                        guarantors_name: string,
                        guarantors_relationship: string,
                        guarantors_phone_number: string,
                        guarantors_occupation: string,
                        guarantors_office_address: string,
                        guarantors_highest_educational_level: string,
                        number_of_depandents: string,
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
                                        <h5 className='text-center pt-3'>Guarantor Details</h5>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Guarantors Name</label>
                                            <input
                                                type="text"
                                                placeholder='Enter your guarantors name'
                                                id='guarantors_name'
                                                value={values.guarantors_name}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.guarantors_name = ''}
                                                onChange={handleChange}
                                                className={(errors.guarantors_name && touched.guarantors_name) ? 'im-error' : ''}
                                            />
                                            {
                                                errors.guarantors_name && touched.guarantors_name &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.guarantors_name}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Guarantors Relationship</label>
                                            <select
                                                id='guarantors_relationship'
                                                value={values.guarantors_relationship}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.guarantors_relationship = ''}
                                                onChange={handleChange}
                                                className={(errors.guarantors_relationship && touched.guarantors_relationship) ? 'im-error' : ''}
                                            >
                                                <option value='' disabled >Choose Relationship</option>
                                                {relationshipArray.map((relationship: any, index: number) => <option key={index} value={relationship.id}>{relationship.name}</option>)}
                                            </select>
                                            {
                                                errors.guarantors_relationship && touched.guarantors_relationship &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.guarantors_relationship}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>guarantors Phone Number</label>
                                            <input
                                                type="text"
                                                max={11}
                                                placeholder='Enter guarantors phone number'
                                                id='guarantors_phone_number'
                                                value={values.guarantors_phone_number}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.guarantors_phone_number = ''}
                                                onChange={handleChange}
                                                className={(errors.guarantors_phone_number && touched.guarantors_phone_number) ? 'im-error' : ''}
                                            />
                                            {
                                                errors.guarantors_phone_number && touched.guarantors_phone_number &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.guarantors_phone_number}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Guarantors Occupation</label>
                                            <select
                                                id='guarantors_occupation'
                                                value={values.guarantors_occupation}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.guarantors_occupation = ''}
                                                onChange={handleChange}
                                                className={(errors.guarantors_occupation && touched.guarantors_occupation) ? 'im-error' : ''}
                                            >
                                                <option value='' disabled >Choose Occupation</option>
                                                {occupationArray.map((guarantors_occupation: any, index: number) => <option key={index} value={guarantors_occupation.id}>{guarantors_occupation.name}</option>)}
                                            </select>
                                            {
                                                errors.guarantors_occupation && touched.guarantors_occupation &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.guarantors_occupation}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Guarantors Office Address</label>
                                            <input
                                                type="text"
                                                placeholder='Enter office addresst'
                                                id='guarantors_office_address'
                                                value={values.guarantors_office_address}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.guarantors_office_address = ''}
                                                onChange={handleChange}
                                                className={(errors.guarantors_office_address && touched.guarantors_office_address) ? 'im-error' : ''}
                                            />
                                            {
                                                errors.guarantors_office_address && touched.guarantors_office_address &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.guarantors_office_address}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Guarantors Highest Educational Level</label>
                                            <select
                                                id='guarantors_highest_educational_level'
                                                value={values.guarantors_highest_educational_level}
                                                onBlur={handleBlur}
                                                onFocus={() => errors.guarantors_highest_educational_level = ''}
                                                onChange={handleChange}
                                                className={(errors.guarantors_highest_educational_level && touched.guarantors_highest_educational_level) ? 'im-error' : ''}
                                            >
                                                <option value='' disabled >Choose Highest Educational Level</option>
                                                {educationLevelsArray.map((level: any, index: number) => <option key={index} value={level.id}>{level.name}</option>)}
                                            </select>
                                            {
                                                errors.guarantors_highest_educational_level && touched.guarantors_highest_educational_level &&
                                                <p className='reduced error-popup pt-1 mb-0'>{errors.guarantors_highest_educational_level}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='reg-card'>
                                            <label>Number of Depandents</label>
                                            <input
                                                type="number"
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
                                    <div className='col-md-12 text-center pt-3 pb-2 px-2'>
                                        <CameraFeed hideResult sendFile={captureImage} />
                                        <div className='imh p-2'>
                                            <img src={image} alt="" />
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

export default MainFormGuarantorDetails;
