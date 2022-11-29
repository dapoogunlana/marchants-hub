import React, { useEffect, useState } from 'react';
import './vendor-orders.scss';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import VendorOrders from './vendor-orders';
import { appPageTabs, tabQueryConstants } from '../../../services/constants/general-constants';

function TabbedVendorOrders() {

  const [activeKey, setActiveKey] = useState(tabQueryConstants.pending.query);

  const changKey = (key: any) => {
    setActiveKey(key);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='tabbed-vendor-orders'>
      <div className='pt-4'></div>
      <div>
      {/* <div className='button-container'>
        <button className='filter-button'><i className="fa-solid fa-filter"></i> Filter</button>
        <button className='download-button'><i className="fa fa-download"></i> Download</button>
      </div> */}
        <Tabs defaultActiveKey={tabQueryConstants.pending.query}onSelect={changKey} >
          {appPageTabs.map((item, index) => {
          return <Tab eventKey={item.name.toLocaleLowerCase()} title={item.name} key={index}>
            {
              (activeKey === item.name.toLocaleLowerCase()) && <VendorOrders query={item.query} />
            }
          </Tab>
          })}
        </Tabs>
      </div>
    </div>
  );
}

export default TabbedVendorOrders;
