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
  const id = props.id;
  const closeModal = (feedback: any) => {
    closeAppModal(()=> props.closeModal(feedback));
  };

  const validate = (values: FormikValues) => {   
      const errors: any = {};
  
      if (!values.productName) {
          errors.productName = 'Product name is required';
      }
      if (!values.description) {
          errors.description = 'Description is required';
      }
      if (!values.amount) {
          errors.amount = 'Amount required';
      } else if (values.amount <= 0) {
        errors.amount = 'Invalin amount';
      }
      if (!values.numberInStock) {
          errors.numberInStock = 'Number is required';
      } else if (values.numberInStock <= 0) {
        errors.numberInStock = 'Invalin number';
      }
      if (!values.image1 && !values.image2 && !values.image3) {
        errors.image1 = 'One image is required';
        errors.image2 = 'One image is required';
        errors.image3 = 'One image is required';
      }
      console.log({values, values2: values.image2
      })
      return errors;
  
  }

  const saveProduct = (values: any, controls: any) => {
    // return closeModal('refresh');
    sendRequest({
      url: 'products',
      method:'POST',
      body: prepareNewProductForm(values),
    }, (res: any) => {
        if (res.responseCode === 1) {
          toast.success(res.payload);
          controls.setSubmitting(false);
          closeModal('refresh');
      }
    }, (err: any) => {
        controls.setSubmitting(false);
        setResponse(<p className='c-red mb-0 pt-2'>{err.error?.emailError || err.message || 'Unable to complete'}</p>);
        toast.error(err.error?.emailError || err.message || 'Unable to complete');
    });
  }

  useEffect(() => {
    openModal();
  }, []);

  return (
    <div className="app-data-modal">
      <div className="modal-bg"></div>
      <div className={"modal-container mid no-pad"}>
        <div className="modal-content">
          
          {/* Any content goes in here */}
          <div>
             <Formik initialValues={{
                productName: props.form?.productName || '',
                description: props.form?.description || '',
                amount: props.form?.amount || '',
                numberInStock: props.form?.numberInStock || '',
                image1: props.form?.image1 || '',
                image2: props.form?.image2 || '',
                image3: props.form?.image3 || '',
            }}
            validate={(value) => validate(value)}
            onSubmit={(values, controls) => saveProduct(values, controls)}
            // onSubmit={(values, controls) => console.log('values, controls')}
            >
                {
                    (Props: FormikProps<{
                      productName: string,
                      description: string,
                      amount: number,
                      numberInStock: number,
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
                                            placeholder='productName'
                                            id='productName'
                                            value={values.productName}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.productName = ''}
                                            onChange={handleChange}
                                            className={(errors.productName && touched.productName) ? 'im-error' : ''}
                                        />
                                      {
                                          errors.productName && touched.productName &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.productName}</p>
                                      }
                                  </div>
                                    <div className='styled-form2'>
                                      <label>Description</label>
                                      
                                      <Field
                                            type="text"
                                            placeholder='Enter description'
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
                                            id='numberInStock'
                                            value={values.numberInStock}
                                            onBlur={handleBlur}
                                            onFocus={() => errors.numberInStock = ''}
                                            onChange={handleChange}
                                            className={(errors.numberInStock && touched.numberInStock) ? 'im-error' : ''}
                                        />
                                      {
                                          errors.numberInStock && touched.numberInStock &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.numberInStock}</p>
                                      }
                                    </div>
                                  </div>
                                  <div className="info-grid-3">
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
                                          errors.image1 && touched.image1 &&
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
                                          errors.image2 && touched.image2 &&
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
                                          errors.image3 && touched.image3 &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.image3}</p>
                                      }
                                    </div>
                                  </div>
                                </div>
                              <div className='text-right pt-3 pb-2 light-grey pb-3' style={{padding: '20px'}}>
                                  <button type='button' onClick={closeModal} className='btn btn-danger mx-0 px-3 rad-10 mr-3' disabled={isSubmitting}><i className="fa-solid fa-circle-xmark mr-2"></i>Cancel</button>
                                  <button type='submit' className='btn btn-success mx-0 px-3 rad-10' disabled={isSubmitting}>{isSubmitting ? 'Processing..' : <><i className="fa-solid fa-circle-check mr-2"></i> Submit</>}</button>
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
