import React, { useEffect, useState } from 'react';
import { NavLink  } from 'react-router-dom';
import { Logo, StoreImg } from '../../../../assets/images';
import { routeConstants as rc } from '../../../../services/constants/route-constants';
import { useSelector } from 'react-redux';
import './sidebar.scss';
import { generateAdminRoutes, generateVendorRoutes, generateDispatcherRoutes } from '../../../../services/session/sidebar-route-service';
import { IroutObjectData, IstoreState } from '../../../../services/constants/interfaces/data-schemas';
import { sortRoute } from '../../../../services/utils/navigation-utilities';
import { logout } from '../../../../services/actions/session-actions';
import SettingsModal from '../../../../components/block-components/modals/settings-modal/settings-modal';

function Sidebar(props: any) {

  const sessionData = useSelector((state: IstoreState) => state.session);
  const [viewSettings, setViewSettings] = useState(false);
  const [routes, setRoutes] = useState<IroutObjectData[]>([]);
  // console.log({sessionData});
  const userRole = sessionData.role;

  const openSettingsModal = (id: any) => {
    setViewSettings(true);
  }

  const closeSettingsModal = (feedback?: any) => {
    setViewSettings(false);
  }

  useEffect(() => {
    if(!userRole) {
      logout();
    }
    switch(userRole) {
      // case rc.userLevels.vendor:
      //   // setRoutes(generateAdminRoutes());
      //   setRoutes(generateVendorRoutes());
      //   break;
      case rc.userLevels.vendor:
        setRoutes(generateVendorRoutes());
        break;
      case rc.userLevels.dispatcher:
        setRoutes(generateDispatcherRoutes());
        break;
    }
  },[sessionData, userRole]);

  return (
    <>
      <div className='bar'>
        <div className='profile'>
          <div className='store-image'>
            <img src={StoreImg} alt="" />
          </div>
          <div className='user-info spread-info mt-3'>
            <p className='mb-0 reduced font-weight-bold c-white'>{`${sessionData.ownerFirstName} ${sessionData.ownerLastName}`}</p>
            <i className="fas fa-chevron-down"></i>
            <div className='settings-drop-down'>
              <div className='clip-area'></div>
              <div className='text-area'>
                <p className='mb-1'><i className="fas fa-chevron-down mr-2"></i>Signout</p>
                <p onClick={openSettingsModal}><i className="fas fa-chevron-down mr-2"></i>Settings</p>
              </div>
            </div>
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
                      <NavLink target={item.standalone ? '_blank' : '_self'} to={item.standalone ? `/${item.link}` : `${sortRoute(userRole)}${item.link}`} className={({isActive}) => isActive ? 'bar-link selected' : 'bar-link'} onClick={props.clickLink}>
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
      {viewSettings && <SettingsModal closeModal={closeSettingsModal} />}
    </>
  );
}

export default Sidebar;
