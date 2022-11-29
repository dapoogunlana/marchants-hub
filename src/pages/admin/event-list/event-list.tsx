import React, { useEffect, useState } from 'react';
import DataTables from '../../../components/block-components/data-table/data-table';
import './event-list.scss';
import { getChildEvent } from '../../../services/utils/children-list-service';
import { calculateAge, formatDate, stringifyFilter } from '../../../services/utils/data-manipulation-utilits';
import DropdownStyledButton from '../../../components/base-components/styled-dropdown-button/dropdown-button';
import { useNavigate } from 'react-router-dom';
import { routeConstants } from '../../../services/constants/route-constants';

function EventList(props: any) {
  const [eventList, setEventList] = useState<any>([]);
  let id: any;
  const child_id = props.id;
  const navigate = useNavigate();

  const tableColumns = [
    // {
    //   Header: 'Actions',
    //   accessor: 'id',
    //   Cell: (data: any) => ( AddButtonToCell(data))
    // },
    {
      Header: 'ID',
      accessor: 'unique_id',
    },
    {
      Header: 'First name',
      accessor: 'first_name',
    },
    {
      Header: 'Last name',
      accessor: 'last_name',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
    {
      Header: 'Phone',
      accessor: 'phone_number',
    },
    {
      Header: 'State',
      accessor: 'state.name',
    },
    {
      Header: 'LGA',
      accessor: 'lga.name',
    },
    {
      Header: 'Facilitator Score',
      accessor: 'facilitator_score',
    },
    {
      Header: 'Pillar',
      accessor: 'pillars',
    },
    {
      Header: 'Gender',
      accessor: 'gender',
    },
    {
      Header: 'Date Registered',
      accessor: 'date_registered',
    }
  ]

  const AddButtonToCell = (cell:any) =>{
    id =  cell.row.original.id;
    return(
      <DropdownStyledButton data={actionButtonProp(id)} />
    )
  }

   const actionButtonProp = (id:any) => {
    return ({
      name: '',
      variant: 'success',
      action: {
        View: () => {
          navigate(`/${routeConstants.systemAdmin}/${routeConstants.facilitatorList}/${id}`);
        },
      }
    })
  };
  // <DropdownStyledButton data={buttonProp} />
  const getEventsList = () => {
    getChildEvent(child_id,(events: any) => {
      let pillars: any = []
      events.map((event: any) => {  
        event.age = event.dob ? calculateAge(event?.dob) : '-';
        event.facilitator_score = event.facilitator_score ? event.facilitator_score : '-';
        event.date_registered = event.created_at ? formatDate(event.created_at) : '-';
        event?.facilitator_pillar.map((pillar: any) => {
          const pillarName = pillar?.pillar?.name
          if (pillarName && !pillars.includes(pillarName)) {
            pillars.push(pillarName)
          }
        })
        event.pillars = event.facilitator_pillar ?  pillars : '-';
      })
      setEventList(events)
    })
  }

 useEffect(() => {
    getEventsList();
    window.scrollTo(0, 0);
  }, [props]);
  
  return (
    <>
      <div className='event-list pt-3'>
        <div className='row'>
          <div className='card-container col-md-12'>
            <DataTables data={eventList} columns={tableColumns}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventList;
