import React, { useEffect } from 'react';
import AdminForgotPasswordForm from '../../../components/block-components/forgot-password-form/forgot-password-form';
import './forgot-password.scss';

function AdminForgotPassword() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <div className="login">
        <div className="container center-form" data-aos='zoom-in'>
          <div className='w90 my-3' data-aos="fade-up">
            <AdminForgotPasswordForm />
          </div>
        </div>
        <div className='bg-sect'></div>
      </div>
    </>
  );
}

export default AdminForgotPassword;
