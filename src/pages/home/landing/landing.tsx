import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../../assets/images';
import { routeConstants } from '../../../services/constants/route-constants';
import './landing.scss';

function Landing() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <div className="landing">
        <div className="header">
          <div className="container">
            <div className="spread-info mt-4">
              <Link to={routeConstants.home}>
                <img src={Logo} className="cp-logo" alt="Logo" />
              </Link>
              <Link to={`/${routeConstants.registerDispatcher}`}>
                <button className="hollow-button">For Dispatchers</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="center-content w90 max800" data-aos='zoom-in'>
              <h1 className="">
                Power your business, sell more with Vendu
              </h1>
              <div className="sub-info">
                <p className="center-description py-4">
                  Vendu helps you organize your business. Manage your product inventory, sell using 
                  your free custom ecommerce store, manage orders and receive payments seamlessly.
                </p>
              </div>
              <Link to={routeConstants.registerVendor}>
                <button className="solid-button">
                  Create <span className='md-close'>online </span>store
                </button>
              </Link>
              <span className='px-2'></span>
              <Link to={routeConstants.login}>
                <button className="hollow-button">
                  Login to <span className='md-close'>online </span>store
                </button>
              </Link>
              <br/>
        </div>
      </div>
    </>
  );
}

export default Landing;
