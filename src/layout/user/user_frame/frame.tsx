import React, { useState } from 'react';
import { Outlet  } from 'react-router-dom';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import Footer from './footer/footer';
import './frame.scss';

function Frame() {

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebarVisible = () => {
    setSidebarVisible(!sidebarVisible);
  }
  const offSidebarVisible = () => {
    setSidebarVisible(false);
  }

  return (
    <div className='frame-grid'>
      <div className={'side-bar' + (sidebarVisible ? ' side-bar-active' : '')}>
        <div className='side-bg' onClick={toggleSidebarVisible}></div>
        <Sidebar clickLink={offSidebarVisible} />
      </div>
      <div className='main-area'>
        <Header toggleSidebarVisible={toggleSidebarVisible} />
        <div className='holder pt-4'>
          <Outlet/>
        </div>
        {/* <Footer/> */}
      </div>
    </div>
  );
}

export default Frame;
