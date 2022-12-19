import React, { useEffect, useState } from 'react';
import { NavLink  } from 'react-router-dom';
import { Logo, StoreImg } from '../../../../assets/images';
import { routeConstants as rc } from '../../../../services/constants/route-constants';
import { useSelector } from 'react-redux';
import './sidebar.scss';
import { Istate } from '../../../../services/constants/interfaces/state-schemas';
import { generateAdminRoutes, generateVendorRoutes, generateDispatcherRoutes } from '../../../../services/session/sidebar-route-service';
import { IroutObjectData } from '../../../../services/constants/interfaces/data-schemas';
import { sortRoute } from '../../../../services/utils/navigation-utilities';
import { logout } from '../../../../services/actions/session-actions';

function Sidebar(props: any) {

  const sessionData = useSelector((state: Istate) => state.session);
  const [routes, setRoutes] = useState<IroutObjectData[]>([]);
  console.log({sessionData});
  const userRole = sessionData.user?.role;

  useEffect(() => {
    if(!userRole) {
      logout();
    }
    switch(userRole) {
      case rc.userLevels.vendor:
        // setRoutes(generateAdminRoutes());
        setRoutes(generateVendorRoutes());
        break;
      case rc.userLevels.vendor:
        setRoutes(generateVendorRoutes());
        break;
      case rc.userLevels.dispatcher:
        setRoutes(generateDispatcherRoutes());
        break;
    }
  },[sessionData, userRole]);

  return (
    <div className='bar'>
      <div className='profile'>
        <div className='store-image'>
          <img src={StoreImg} alt="" />
        </div>
        <div className='user-info spread-info mt-3'>
          <p className='mb-0 reduced font-weight-bold c-white'>{`${sessionData.user?.ownerFirstName} ${sessionData.user?.ownerLastName}`}</p>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
      <div className='route-sect'>
        <div className='pt-2'></div>

        {
          routes.map((route, index) => {
            return <React.Fragment key={index}>
              <p className='section-label pl-2'>{route.label}</p>
              {
                route.routes.map((item, routeIndex) => (
                  <React.Fragment key={routeIndex}>
                    <NavLink to={item.standalone ? `/${item.link}` : `${sortRoute(userRole)}${item.link}`} className={({isActive}) => isActive ? 'bar-link selected' : 'bar-link'} onClick={props.clickLink}>
                      <i className={'reduced fas fa-' + (item.icon || 'table-list')}></i><span className='reduced pl-2'>{item.name}</span>
                    </NavLink>
                  </React.Fragment>
                ))
              }
            </React.Fragment>
          })
        }
      </div>
      <div className='brand-tag'>
        <p>Powered by Vendu</p>
      </div>
    </div>
  );
}

export default Sidebar;
