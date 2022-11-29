import React, { useEffect, useMemo, useState } from 'react'
import './children-detail.scss'
import child from '../../../assets/images/child.jpg'
import DataTables from '../../../components/block-components/data-table/data-table';
import { useParams } from 'react-router-dom';
import { getChild } from '../../../services/utils/children-list-service';
import { formatDate } from '../../../services/utils/data-manipulation-utilits';
import EventList from '../event-list/event-list';

function ChildrenDetail(props: any) {
    const [childInfo, setchildInfo] = useState<any>({})

  const params = useParams();
    const paramId = params.id;
    const mountId = (id: any) => {
        getChild(id, (child: any) => {
            let pillars: any = []
            child.date_of_birth = child.dob ? formatDate(child.dob) : '-';
            child?.child_cohort?.map((pillar: any) => {
            const pillarName = pillar?.cohort?.pillar?.name
            if (pillarName) {
                pillars.push(pillarName)
            }
            })
            child.pillars = child.child_cohort ?  pillars : '-';
            setchildInfo(child);
        });
    }


    useEffect(() => {
        mountId(paramId)
        window.scrollTo(0, 0);
    }, [props]);
  return (
    <div className='row children-detail'>
        <div className='col-md-5 col-sm-12 card-container reduced-height pt-4 mr-5'>
            <div className='row detail-image'>
                <div className='col-md-6'>
                    <img src={child} alt="" />
                </div>
                <div className='col-md-6'>
                    <img src={child} alt="" />
                </div>
            </div>
        </div>
        <div className='col-md-6 col-sm-12 card-container'>
            <div className='row pt-4'>
                <div className='col-md-2'>
                    <div className='circled-image'>
                    </div>
                </div>
                <div className='col-md-10'>
                    <h5 className='m-0'>{childInfo?.first_name + ' ' + childInfo?.last_name}</h5>
                    <h6 className='m-0'>{childInfo?.unique_id}</h6>
                </div>
                <div className='col-md-12 pt-3'>
                    <hr />
                    <div>
                        <div className="p-3">
                            <p>Gender:</p>
                            <h5 className="topic">{childInfo?.gender}</h5>
                        </div>
                        <div className="p-3">
                            <p>Date Of Birth:</p>
                            <h5 className="topic">{childInfo?.date_of_birth}</h5>
                        </div>
                        <div className="p-3">
                            <p>State:</p>
                            <h5 className="topic">{childInfo?.state?.name}</h5>
                        </div>
                        <div className="p-3">
                            <p>LGA:</p>
                            <h5 className="topic">{childInfo?.lga?.name}</h5>
                        </div>
                        <div className="p-3">
                            <p>Home address:</p>
                            <h5 className="topic">{childInfo?.home_address}</h5>
                        </div>
                        <div className="p-3">
                            <p>Pillar:</p>
                            {childInfo.pillars && childInfo.pillars.map((pilar: any) => <h5 key={pilar} className="topic">{pilar},</h5>)}
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div className='col-md-12mt-2'>
            <div><h5>Events</h5></div>
            <div className='card-container'>
            <EventList id={childInfo.id} />
            </div>
        </div>
    </div>
  )
}

export default ChildrenDetail