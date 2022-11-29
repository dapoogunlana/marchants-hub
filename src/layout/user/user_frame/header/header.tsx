import React, {  } from 'react';
import { logoutUser } from '../../../../services/utils/navigation-utilities';
import './header.scss';

function Header(props: any) {

  return (
    <div className='admin-header'>
      <div className='spread-info py-2 px-3'>
        <i className="fa-solid fa-bars sidebar-icon" onClick={props.toggleSidebarVisible}></i>
        <span></span>
        <button className='logout-button' onClick={logoutUser}><i className="fa-solid fa-right-from-bracket"></i> Logout</button>
      </div>
    </div>
  );
}

export default Header;
