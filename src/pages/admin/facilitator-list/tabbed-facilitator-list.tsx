import React, { useEffect, useState } from 'react';
import './facilitator-list.scss';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import FacilitatorList from './facilitator-list';
import { appPageTabs } from '../../../services/constants/general-constants';

function TabbedFacilitatorList() {

  const [activeKey, setActiveKey] = useState("applied");

  const changKey = (key: any) => {
    setActiveKey(key);
  }

  useEffect(() => {

    console.log('I log lower-middle child');
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='tabbed-facilitator-list'>
      <div>
      {/* <div className='button-container'>
        <button className='filter-button'><i className="fa-solid fa-filter"></i> Filter</button>
        <button className='download-button'><i className="fa fa-download"></i> Download</button>
      </div> */}
        <Tabs defaultActiveKey="applied" onSelect={changKey} >
          {appPageTabs.map((item, index) => {
          return <Tab eventKey={item.name.toLocaleLowerCase()} title={item.name} key={index}>
            {
              (activeKey === item.name.toLocaleLowerCase()) && <FacilitatorList query={item.query} />
            }
          </Tab>
          })}
        </Tabs>
      </div>
    </div>
  );
}

export default TabbedFacilitatorList;
