import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DropdownStyledButton from '../../../components/base-components/styled-dropdown-button/dropdown-button';
import DataTables from '../../../components/block-components/data-table/data-table';
import ChildrenListFilter from '../../../components/block-components/children-list-filter/children-list-filter';
import { childrenListTabQueryConstants } from '../../../services/constants/general-constants';
import { calculateAge, formatDate, stringifyFilter } from '../../../services/utils/data-manipulation-utilits';
import { getChildren, updateFilters } from '../../../services/utils/children-list-service';
import './children-list.scss';

function ChildrenList(props: any) {

  const navigate = useNavigate();
  
  const [childrenList, setChildrenList] = useState<any>([]);
    let id: any;
    const query = props.query;
   const handleFilter = (filter: any) => {
    updateFilters(filter);
    getChildrenList();
  }
    const AddButtonToCell = (cell:any) =>{
      id =  cell.row.original.id;
      return(
        <DropdownStyledButton data={actionButtonProp(id)} />
      )
    }

   const actionButtonProp = (id:any) => {
    const actions: any = {};
     switch(query) {
       case childrenListTabQueryConstants.registered.query:
         actions.Registered = () => console.log('register');
         break;
       case childrenListTabQueryConstants.onTrack.query:
        //  actions.Confirm = () => console.log('Confirm');
         break;
       case childrenListTabQueryConstants.active.query:
        //  actions.Active = () => console.log('Active');
         break;
     }
    return ({
      name: '',
      variant: 'success',
      action: {
        View: () => navigate(`${id}`),
      }
    })
  };
  const tableColumns = [
    {
      Header: 'Actions',
      accessor: 'id',
      Cell: (data: any) => ( AddButtonToCell(data))
    },
    {
      Header: 'ID',
      accessor: 'unique_id',
    },
    {
      Header: 'First name',
      accessor: 'first_name',
      Cell: (props: any) => <Link to={'/1'}>{props.value}</Link>
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

  const getChildrenList = () => {
    getChildren(query, (children: any) => {
      let pillars: any = []
      children.map((child: any) => {  
        child.age = child.dob ? calculateAge(child?.dob) : '-';
        child.date_registered = child.created_at ? formatDate(child.created_at) : '-';
        child?.child_cohort?.map((pillar: any) => {
          const pillarName = pillar?.cohort?.pillar?.name
          if (pillarName && !pillars.includes(pillarName)) {
            pillars.push(pillarName)
          }
        })
        child.pillars = child.child_cohort ?  pillars : '-';
      })
      setChildrenList(children)
    })
  }
  useEffect(() => {
    getChildrenList();
    window.scrollTo(0, 0);
  }, [props]);
  
  return (
    <>
      <div className='children-list pt-3'>
        <ChildrenListFilter  submitFilters={(filter: any) => handleFilter(filter)} />

        <div className='card-container'>
          <DataTables data={childrenList} columns={tableColumns}/>
        </div>
      </div>
    </>
  );
}

export default ChildrenList;
