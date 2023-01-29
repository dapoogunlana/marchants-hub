import React, { useEffect } from 'react';
import RegisterVendorForm from '../../../components/block-components/register-vendor-form/register-vendor-form';
import './register-vendor.scss';

function RegisterVendor() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <div className="register-vendor">
        <div className="center-form" data-aos='zoom-in'>
          <div className='w96 my-3' data-aos="fade-up">
            <RegisterVendorForm />
          </div>
        </div>
        <div className='bg-sect'></div>
      </div>
    </>
  );
}

export default RegisterVendor;
