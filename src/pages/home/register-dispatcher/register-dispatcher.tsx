import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Logo } from '../../../assets/images';
import AdminLoginForm from '../../../components/block-components/login-form/login-form';
import RegisterDispatcherForm from '../../../components/block-components/register-dispatcher-form/register-dispatcher-form';
import { routeConstants } from '../../../services/constants/route-constants';
import './register-dispatcher.scss';

function RegisterDispatcher() {

  const [activeKey, setActiveKey] = useState('register');

  const changKey = (key: any) => {
    setActiveKey(key);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <div className="login">
        <div className="top-center-form" data-aos='zoom-in'>
          <div className='w96 my-3 reg-tabs' data-aos="fade-up">
            <div className='spread-info py-3 max450 w90 pad15'>
                <Link to={routeConstants.home}>
                    <img src={Logo} width={130} alt="" />
                </Link>
                <span></span>
            </div>
            <div className='max450 w90 pt-4'>  
              <Tabs defaultActiveKey='register' onSelect={changKey} >
                <Tab eventKey={'register'} title='Signup as a dispatcher' key='register'>
                  {
                    activeKey === 'register' && <RegisterDispatcherForm />
                  }
                </Tab>
                <Tab eventKey={'signin'} title='Login as a dispatcher' key='signin'>
                  {
                    activeKey === 'signin' && <AdminLoginForm compact />
                  }
                </Tab>
              </Tabs>
            </div>
            
          </div>
        </div>
        <div className='bg-sect'></div>
      </div>
    </>
  );
}

export default RegisterDispatcher;
