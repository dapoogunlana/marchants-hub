import React, { useEffect } from 'react';
import RegisterDispatcherForm from '../../../components/block-components/register-dispatcher-form/register-dispatcher-form';
import './register-dispatcher.scss';

function RegisterDispatcher() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <div className="login">
        <div className="center-form" data-aos='zoom-in'>
          <div className='w96 my-3' data-aos="fade-up">
            <RegisterDispatcherForm />
          </div>
        </div>
        <div className='bg-sect'></div>
      </div>
    </>
  );
}

export default RegisterDispatcher;
