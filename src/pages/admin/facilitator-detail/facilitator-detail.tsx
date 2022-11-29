import React, { useEffect, useState } from 'react'
import './facilitator-detail.scss'
import smile from '../../../assets/images/smile.jpg'
import { calculateAge, formatDate, stringifyFilter } from '../../../services/utils/data-manipulation-utilits';
import { useParams } from 'react-router-dom';
import { getFacilitator } from '../../../services/utils/facilitator-list-service';

function FacilitatorDetail(props: any) {
    const [facilitatorInfo, setFacilitatorInfo] = useState<any>({})

    const params = useParams();
    const paramId = params.id;
    const mountId = (id: any) => {
        getFacilitator(id, (facilitator: any) => {
            let pillars: any = []
            facilitator.date_of_birth = facilitator.dob ? formatDate(facilitator.dob) : '-';
            facilitator?.facilitator_pillar.map((pillar: any) => {
            const pillarName = pillar?.pillar?.name
            if (pillarName && !pillars.includes(pillarName)) {
                pillars.push(pillarName)
            }
            })
            facilitator.pillars = facilitator.facilitator_pillar ?  pillars : '-';
            setFacilitatorInfo(facilitator);
        });
    }


    useEffect(() => {
        mountId(paramId)
        window.scrollTo(0, 0);
    }, [props]);

  return (
    <div className='row facilitator-detail'>
        <div className='col-md-5 col-sm-12 card-container reduced-height pt-4 mr-5'>
            <div className='detail-image'>
                <img src={smile} alt="" />
            </div>
        </div>
        <div className='col-md-6 col-sm-12 card-container'>
            <div className='row pt-4'>
                <div className='col-md-2'>
                    <div className='circled-image'>
                    </div>
                </div>
                <div className='col-md-10'>
                    <h5 className='m-0'>{facilitatorInfo?.first_name + ' ' + facilitatorInfo?.last_name}</h5>
                    <h6 className='m-0'>{facilitatorInfo?.unique_id}</h6>
                    <p className='m-0'>{facilitatorInfo?.state?.name + ', ' + facilitatorInfo?.lga?.name}</p>
                </div>
                <div className='col-md-12 pt-3'>
                    <hr />
                    <div>
                        <div className="p-3">
                            <p>Gender:</p>
                            <h5 className="topic">{facilitatorInfo?.gender}</h5>
                        </div>
                        <div className="p-3">
                            <p>BVN:</p>
                            <h5 className="topic">22212745273</h5>
                        </div>
                        <div className="p-3">
                            <p>Date Of Birth:</p>
                            <h5 className="topic">{facilitatorInfo.date_of_birth}</h5>
                        </div>
                        <div className="p-3">
                            <p>Phone number::</p>
                            <h5 className="topic">{facilitatorInfo?.phone_number}</h5>
                        </div>
                        <div className="p-3">
                            <p>Email address:</p>
                            <h5 className="topic">{facilitatorInfo?.email}</h5>
                        </div>
                        <div className="p-3">
                            <p>State:</p>
                            <h5 className="topic">{facilitatorInfo?.state?.name}</h5>
                        </div>
                        <div className="p-3">
                            <p>LGA:</p>
                            <h5 className="topic">{facilitatorInfo?.lga?.name}</h5>
                        </div>
                        <div className="p-3">
                            <p>Home address:</p>
                            <h5 className="topic">{facilitatorInfo?.home_address}</h5>
                        </div>
                        <div className="p-3">
                            <p>Pillar:</p>
                            {facilitatorInfo.pillars && facilitatorInfo.pillars.map((pilar: any) => <h5 key={pilar} className="topic">{pilar},</h5>)}
                        </div>
                        <div className="p-3">
                            <p>Home gps:</p>
                            <h5 className="topic">{facilitatorInfo?.gps}</h5>
                        </div>
                        <div className="p-3">
                            <p>Total earnings:</p>
                            <h5 className="topic">₦ 111,345.12</h5>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
  )
}

export default FacilitatorDetail

function getFacilitatorsList() {
    throw new Error('Function not implemented.');
}
