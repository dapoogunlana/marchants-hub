import React, { useEffect } from 'react';
import AdminLoginForm from '../../../components/block-components/login-form/login-form';
import './login.scss';

function AdminLogin() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <div className="login">
        <div className="container center-form" data-aos='zoom-in'>
          <div className='w90 my-3' data-aos="fade-up">
            <AdminLoginForm />
          </div>
        </div>
        <div className='bg-sect'></div>
      </div>
    </>
  );
}

export default AdminLogin;
