import React, { useEffect, useMemo, useState } from 'react';
import DataTables from '../../../components/block-components/data-table/data-table';
import './facilitator-list.scss';
import { calculateAge, formatDate, stringifyFilter } from '../../../services/utils/data-manipulation-utilits';
import FacilitatorListFilter from '../../../components/block-components/facilitator-list-filter/facilitator-list-filter';
import DropdownStyledButton from '../../../components/base-components/styled-dropdown-button/dropdown-button';
import { useNavigate } from 'react-router-dom';
import { acceptFacilitator, rejectFacilitator, getFacilitators, updateFilters } from '../../../services/utils/facilitator-list-service';
import { routeConstants } from '../../../services/constants/route-constants';
import { tabQueryConstants } from '../../../services/constants/general-constants';
import EvaluateFacilitatorModal from '../../../components/block-components/modals/evaluate-facilitator-modal/evaluate-facilitator-modal';
import AcceptFacilitatorModal from '../../../components/block-components/modals/accept-facilitator-modal/accept-facilitator-modal';

function FacilitatorList(props: any) {
  const [facilitatorList, setFacilitatorList] = useState<any>([]);
  const [updateFacilitatorToEvaluated, setUpdateFacilitatorToEvaluated] = useState(false);
  const [updateFacilitatorToAccepted, setUpdateFacilitatorToAccepted] = useState(false);
  const [facilitatorId, setFacilitatorId] = useState();
  let id: any;
  const query = props.query;
  const navigate = useNavigate();
  const handleFilter = (filter: any) => {
    updateFilters(filter);
    getFacilitatorsList();
  }

  const tableColumns = [
    {
      Header: 'Actions',
      accessor: 'id',
      Cell: (data: any) => ( AddButtonToCell(data))
    },
    // {
    //   Header: 'ID',
    //   accessor: 'unique_id',
    // },
    // {
    //   Header: 'First name',
    //   accessor: 'first_name',
    // },
    // {
    //   Header: 'Last name',
    //   accessor: 'last_name',
    // },
    {
      Header: 'Name',
      accessor: 'name',
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
      accessor: 'evaluation_score',
    },
    // {
    //   Header: 'Pillar',
    //   accessor: 'pillars',
    // },
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
     const actions: any = {};
     switch(query) {
    //    case tabQueryConstants.applied.query:
    //      actions['Update to Evaluated'] = () => openEvaluateModal(id);
    //      break;
    //    case tabQueryConstants.evaluated.query:
    //      actions.Accept = () => openAcceptModal(id);
    //      actions.Reject = () => rejectFacilitator(id, getFacilitatorsList);
    //      break;
    //    case tabQueryConstants.confirmed.query:
    //     //  actions.Confirm = () => console.log('Confirm');
    //      break;
    //    case tabQueryConstants.active.query:
    //     //  actions.Active = () => console.log('Active');
    //      break;
     }
    return ({
      name: '',
      variant: 'success',
      action: {
        View: () => navigate(`/${routeConstants.systemAdmin}/${routeConstants.facilitatorList}/${id}`),
        ...actions
      }
    })
  };
  // <DropdownStyledButton data={buttonProp} />

  const getFacilitatorsList = () => {
    getFacilitators(query, (facilitators: any) => {
      let pillars: any = []
      facilitators.map((facilitator: any) => {  
        facilitator.name = `${facilitator.first_name} ${facilitator.last_name}`;
        facilitator.age = facilitator.dob ? calculateAge(facilitator?.dob) : '-';
        facilitator.evaluation_score = facilitator.evaluation_score ? facilitator.evaluation_score : '-';
        facilitator.date_registered = facilitator.created_at ? formatDate(facilitator.created_at) : '-';
        facilitator?.facilitator_pillar.map((pillar: any) => {
          const pillarName = pillar?.pillar?.name
          if (pillarName && !pillars.includes(pillarName)) {
            pillars.push(pillarName)
          }
        })
        facilitator.pillars = facilitator.facilitator_pillar ?  pillars : '-';
      })
      setFacilitatorList(facilitators)
    })
  }

  const openEvaluateModal = (id: any) => {
    setFacilitatorId(id)
    setUpdateFacilitatorToEvaluated(true);
  }

  const closeEvaluateModal = (feedback?: any) => {
    setUpdateFacilitatorToEvaluated(false);
    if (feedback === 'refresh') {
      getFacilitatorsList();
    }
  }

  const openAcceptModal = (id: any) => {
    setFacilitatorId(id)
    setUpdateFacilitatorToAccepted(true);
  }

  const closeAcceptModal = (feedback?: any) => {
    console.log({feedback});
    setUpdateFacilitatorToAccepted(false);
    if (feedback === 'refresh') {
      getFacilitatorsList();
    }
  }

 useEffect(() => {
    getFacilitatorsList();
    window.scrollTo(0, 0);
  }, [props]);
  
  return (
    <>
      <div className='facilitator-list pt-3'>
        <FacilitatorListFilter  submitFilters={(filter: any) => handleFilter(filter)} />
        <div className='row'>
          <div className='card-container col-md-12'>
            <DataTables actionable={true} data={facilitatorList} columns={tableColumns}/>
          </div>
        </div>
        {updateFacilitatorToEvaluated && <EvaluateFacilitatorModal id={facilitatorId} closeModal={closeEvaluateModal} />}
        {updateFacilitatorToAccepted && <AcceptFacilitatorModal id={facilitatorId} closeModal={closeAcceptModal} />}
      </div>
    </>
  );
}

export default FacilitatorList;
