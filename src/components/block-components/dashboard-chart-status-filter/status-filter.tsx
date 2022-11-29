import React, { useEffect, useState } from 'react'
import { chartsTabQueryConstants } from '../../../services/constants/general-constants'
import './status-filter.scss'

function StatusFilter(props: any) {
  const [activeTab, setActiveTab] = useState(props.activeQuery || 'applied');

  const makeActive = (query:any) => {
    setActiveTab(query);
    props.data(query);
  }

  useEffect(() => {
    // makeActive(activeTab)
  }, [props]);

  return (
    <div className='status-filter' >
        {chartsTabQueryConstants.map((item, index) => {
            // setActiveTab(item.query)
            return <button className={`btn btn-white btn-sm ${activeTab === item.query_all ? "status-active" : ""}`} key={index} onClick={(e) => makeActive(item.query_all)}>
                {item.name}
            </button>
        })}
    </div>
  )
}

export default StatusFilter