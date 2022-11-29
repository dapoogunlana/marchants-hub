import React, { useEffect } from 'react';
import AdminResetPasswordForm from '../../../components/block-components/reset-password-form/reset-password-form';
import './reset-password.scss';

function AdminResetPassword() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <div className="login">
        <div className="container center-form" data-aos='zoom-in'>
          <div className='w90 my-3' data-aos="fade-up">
            <AdminResetPasswordForm />
          </div>
        </div>
        <div className='bg-sect'></div>
      </div>
    </>
  );
}

export default AdminResetPassword;
