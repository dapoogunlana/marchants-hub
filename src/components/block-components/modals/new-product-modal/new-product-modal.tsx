import React, { useEffect, useState } from "react";
import { Formik, Field, FormikProps, FormikValues } from 'formik';
import { closeAppModal, openModal } from "../../../../services/utils/app-data-modal-service";
import Select from "react-select";
import { sendRequest } from "../../../../services/utils/request";
import { toast } from "react-toastify";
import { prepareNewProductForm } from "../../../../services/utils/form-preparation-service";

const NewProductModal = (props: any) => {
  const [response, setResponse] = useState<any>();
  const [pillars, setPillars] = useState([]);
  const id = props.product?._id;
  const closeModal = (feedback: any) => {
    closeAppModal(()=> props.closeModal(feedback));
  };

  const validate = (values: FormikValues) => {   
      const errors: any = {};
  
      if (!values.name) {
          errors.name = 'Product name is required';
      }
      if (!values.description) {
          errors.description = 'Description is required';
      }
      if (!values.amount) {
          errors.amount = 'Amount required';
      } else if (values.amount <= 0) {
        errors.amount = 'Invalin amount';
      }
      if (!values.availableQuantity) {
          errors.availableQuantity = 'Number is required';
      } else if (values.availableQuantity <= 0) {
        errors.availableQuantity = 'Invalin number';
      }
      if (!props.title && !values.image1 && !values.image2 && !values.image3) {
        errors.image1 = 'One image is required';
        errors.image2 = 'One image is required';
        errors.image3 = 'One image is required';
      }
      if(values.file1){
        const format = values.file1.name?.substring(values.file1.name.lastIndexOf('.') + 1);
        if(format !== 'jpg' && format !== 'jpeg' && format !== 'png' && format !== 'gif' && format !== 'pdf'){
          errors.image1 = 'Invalid format';
        }else if(values.file1.size > 2097152){
          errors.image1 = 'Image must not be more than 2MB';
        }
      }
      if(values.file2){
        const format = values.file2.name?.substring(values.file2.name.lastIndexOf('.') + 1);
        if(format !== 'jpg' && format !== 'jpeg' && format !== 'png' && format !== 'gif' && format !== 'pdf'){
          errors.image2 = 'Invalid format';
        }else if(values.file2.size > 2097152){
          errors.image2 = 'Image must not be more than 2MB';
        }
      }
      if(values.file3){
        const format = values.file3.name?.substring(values.file3.name.lastIndexOf('.') + 1);
        if(format !== 'jpg' && format !== 'jpeg' && format !== 'png' && format !== 'gif' && format !== 'pdf'){
          errors.image3 = 'Invalid format';
        }else if(values.file3.size > 2097152){
          errors.image3 = 'Image must not be more than 2MB';
        }
      }

      return errors;
  }

  const saveProduct = (values: any, controls: any) => {
    // return closeModal('refresh');
    sendRequest({
      url: props.title ? 'products/' + id : 'products',
      method:props.title ? 'PATCH' : 'POST',
      body: prepareNewProductForm(values),
    }, (res: any) => {
      toast.success(res.message);
      controls.setSubmitting(false);
      closeModal('refresh');
    }, (err: any) => {
        controls.setSubmitting(false);
        setResponse(<p className='c-red mb-0 pt-2'>{err.error?.emailError || err.message || 'Unable to complete'}</p>);
        toast.error(err.error?.emailError || err.message || 'Unable to complete');
    });
  }

  useEffect(() => {
    openModal();
    console.log({props});
  }, []);

  return (
    <div className="app-data-modal">
      <div className="modal-bg"></div>
      <div className={"modal-container mid-small no-pad"}>
        <div className="modal-content">
          
          {/* Any content goes in here */}
          <div>
             <Formik initialValues={{
                name: props.product?.name || '',
                description: props.product?.description || '',
                amount: props.product?.amount || 0,
                availableQuantity: props.product?.availableQuantity || 0,
                // image1: props.product?.images[0]?.photoId || '',
                // image2: props.product?.images[1]?.photoId || '',
                // image3: props.product?.images[2]?.photoId || '',

                // name: '',
                // description: '',
                // amount: 0,
                // availableQuantity: 0,
                image1: '',
                image2: '',
                image3: '',
            }}
            validate={(value) => validate(value)}
            onSubmit={(values, controls) => saveProduct(values, controls)}
            // onSubmit={(values, controls) => console.log('values, controls')}
            >
                {
                    (Props: FormikProps<{
                      name: string,
                      description: string,
                      amount: number,
                      availableQuantity: number,
                      image1: string,
                      image2: string,
                      image3: string,
                    }>) => {
                        const {
                            values,
                            errors,
                            touched,
                            isSubmitting,
                            handleSubmit,
                            handleBlur,
                            handleChange,
                            setValues,
                            setFieldValue,
                        } = Props;
                        return (
                            <form action="" onSubmit={handleSubmit}>
                                <h4 className="text-center pt-3 pb-2">{props.title || 'Add'} Product</h4>
                                <div style={{padding: '20px', borderTop: '1px solid #ddd'}}>
                                  <div className='styled-form2'>
                                      <label>Product name</label>
                                      
                                      <Field
                                            type="text"
                                            // placeholder='name'
                                            id='name'
                                            value={values.name}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.name = ''}
                                            onChange={handleChange}
                                            className={(errors.name && touched.name) ? 'im-error' : ''}
                                        />
                                      {
                                          errors.name && touched.name &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.name}</p>
                                      }
                                  </div>
                                    <div className='styled-form2'>
                                      <label>Description</label>
                                      
                                      <textarea
                                            rows={2}
                                            // placeholder='Enter description'
                                            id='description'
                                            value={values.description}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.description = ''}
                                            onChange={handleChange}
                                            className={(errors.description && touched.description) ? 'im-error' : ''}
                                        />
                                      {
                                          errors.description && touched.description &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.description}</p>
                                      }
                                  </div>
                                  <div className="info-grid">
                                    <div className='styled-form2'>
                                      <label>Amount</label>
                                      
                                      <Field
                                            type="number"
                                            placeholder='Enter amount'
                                            id='amount'
                                            value={values.amount}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.amount = ''}
                                            onChange={handleChange}
                                            className={(errors.amount && touched.amount) ? 'im-error' : ''}
                                        />
                                      {
                                          errors.amount && touched.amount &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.amount}</p>
                                      }
                                    </div>
                                    <span></span>
                                    <div className='styled-form2'>
                                      <label>Number in stock</label>
                                      
                                      <Field
                                            type="number"
                                            placeholder='Enter number in stock'
                                            id='availableQuantity'
                                            value={values.availableQuantity}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.availableQuantity = ''}
                                            onChange={handleChange}
                                            className={(errors.availableQuantity && touched.availableQuantity) ? 'im-error' : ''}
                                        />
                                      {
                                          errors.availableQuantity && touched.availableQuantity &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.availableQuantity}</p>
                                      }
                                    </div>
                                  </div>
                                  {!props.title && <p className="reduced c-red mb-0 pt-3">Upload at least one product image</p>}
                                  <div className="info-grid-3-web">
                                    <div className='styled-form2'>
                                      <label>Image 1</label>
                                      
                                      <Field
                                            type="file"
                                            id='image1'
                                            value={values.image1}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.image1 = ''}
                                            // onChange={handleChange}
                                            className={(errors.image1 && touched.image1) ? 'im-error' : ''}
                                            onChange={(event: any) => {
                                              handleChange(event);
                                              setFieldValue("file1", event.currentTarget.files[0]);
                                            }}
                                        />
                                      {
                                          errors.image1 && (touched.image1 || touched.image2 || touched.image3) &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.image1}</p>
                                      }
                                    </div>
                                    <span></span>
                                    <div className='styled-form2'>
                                      <label>Image 2</label>
                                      
                                      <Field
                                            type="file"
                                            id='image2'
                                            value={values.image2}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.image2 = ''}
                                            // onChange={handleChange}
                                            className={(errors.image2 && touched.image2) ? 'im-error' : ''}
                                            onChange={(event: any) => {
                                              handleChange(event);
                                              setFieldValue("file2", event.currentTarget.files[0]);
                                            }}
                                        />
                                      {
                                          errors.image2 && (touched.image1 || touched.image2 || touched.image3) &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.image2}</p>
                                      }
                                    </div>
                                    <span></span>
                                    <div className='styled-form2'>
                                      <label>Image 3</label>
                                      
                                      <Field
                                            type="file"
                                            id='image3'
                                            value={values.image3}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.image3 = ''}
                                            // onChange={handleChange}
                                            className={(errors.image3 && touched.image3) ? 'im-error' : ''}
                                            onChange={(event: any) => {
                                              handleChange(event);
                                              setFieldValue("file3", event.currentTarget.files[0]);
                                            }}
                                        />
                                      {
                                          errors.image3 && (touched.image1 || touched.image2 || touched.image3) &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.image3}</p>
                                      }
                                    </div>
                                  </div>
                                </div>
                              <div className='text-right pt-3 pb-2 lighter-grey pb-3' style={{padding: '20px'}}>
                                  <button type='button' onClick={closeModal} className='solid-button-danger mx-0 px-3 rad-10 mr-3' disabled={isSubmitting}><i className="fa-solid fa-circle-xmark mr-2"></i>Cancel</button>
                                  <button type='submit' className='btn solid-button mx-0 px-4 rad-10' disabled={isSubmitting}>{isSubmitting ? 'Processing..' : <><i className="fa-solid fa-circle-check mr-2"></i> Proceed</>}</button>
                                  {
                                      response && <div className='error-popup text-center'>{response}</div>
                                  }
                              </div>
                            </form>
                        );
                    }
                }
            </Formik>
          </div>
          {/* Content ends  here */}

        </div>
      </div>
    </div>
  );
}

export default NewProductModal;
