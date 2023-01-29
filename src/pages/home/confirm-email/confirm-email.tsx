import React, { useEffect } from 'react';
import AdminConfirmEmailForm from '../../../components/block-components/confirm-email-form/confirm-email-form';
import './confirm-email.scss';

function AdminConfirmEmail() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <div className="confirm-email">
        <div className="container center-form" data-aos='zoom-in'>
          <div className='w90 my-3' data-aos="fade-up">
            <AdminConfirmEmailForm />
          </div>
        </div>
        <div className='bg-sect'></div>
      </div>
    </>
  );
}

export default AdminConfirmEmail;
