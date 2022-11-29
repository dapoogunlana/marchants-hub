import React, { useEffect, useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ChildrenList from './children-list';
import './children-list.scss'
import { childrenTabTools } from '../../../services/constants/general-constants';

function TabbedChildrenList() {
  const [activeKey, setActiveKey] = useState("registered");


  const changeKey = (key: any) => {
    setActiveKey(key);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='tabbed-children-list'>
      <div>
      {/* <div className='button-container'>
        <button className='filter-button'><i className="fa-solid fa-filter"></i> Filter</button>
        <button className='download-button ml-2'><i className="fa fa-download"></i> Download</button>
      </div> */}
        <Tabs defaultActiveKey="registered" onSelect={changeKey} >
          {childrenTabTools.map((item, index) => {
          return <Tab eventKey={item.name.toLocaleLowerCase()} title={item.name} key={index}>
            {
              (activeKey === item.name.toLocaleLowerCase()) && <ChildrenList query={item.query} />
            }
          </Tab>
          })}
        </Tabs>
      </div>
    </div>
  );
}

export default TabbedChildrenList;
