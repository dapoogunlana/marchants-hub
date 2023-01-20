import React, { useEffect, useState } from 'react';
import DataTables from '../../../components/block-components/data-table/data-table';
import './vendor-orders.scss';
import { calculateAge, formatDate, formatNumber, stringifyFilter } from '../../../services/utils/data-manipulation-utilits';
import DropdownStyledButton from '../../../components/base-components/styled-dropdown-button/dropdown-button';
import { Link, useNavigate } from 'react-router-dom';
import { routeConstants } from '../../../services/constants/route-constants';
import { sendRequest } from '../../../services/utils/request';
import { useSelector } from 'react-redux';
import { IsessionData, Istate } from '../../../services/constants/interfaces/state-schemas';
import { tabQueryConstants } from '../../../services/constants/general-constants';

function VendorOrders(props: any) {
  const sessionData: IsessionData = useSelector((state: Istate) => state.session.user);
  const [orderList, setOrderList] = useState<any[]>([]);
  let id: any;
  const query = props.query;

  const tableColumns = [
    {
      Header: 'Product',
      accessor: 'product',
    },
    {
      Header: 'Amount',
      accessor: 'totalCost',
    },
    {
      Header: 'Date',
      accessor: 'dateCreated',
    },
    {
      Header: 'CustomerName',
      accessor: 'customerName',
    },
    {
      Header: 'Customer Phone Number',
      accessor: 'customerPhoneNumber',
    },
    {
      Header: 'Customer Address',
      accessor: 'customerAddress',
    },

    
    {
      Header: ' ',
      accessor: 'id',
      Cell: (data: any) => ( AddButtonToCell(data))
    },
  ]

  const AddButtonToCell = (cell:any) =>{
    id =  cell.row.original.id;
    const style = {
      backgroundColor: '#ffffff',
      borderColor: '#ffffff',
      color: '#28a745',
    };
    return(
      <DropdownStyledButton data={actionButtonProp(id)} style={style} />
    )
  }

   const actionButtonProp = (id:any) => {      
     const actions: any = {};
     switch(query) {
      //  case tabQueryConstants.applied.query:
      //    actions['Update to Evaluated'] = () => openEvaluateModal(id);
      //    break;
      //  case tabQueryConstants.evaluated.query:
      //    actions.Accept = () => openAcceptModal(id);
      //    actions.Reject = () => rejectFacilitator(id, getFacilitatorsList);
      //    break;
      //  case tabQueryConstants.confirmed.query:
      //   //  actions.Confirm = () => console.log('Confirm');
      //    break;
      //  case tabQueryConstants.active.query:
      //   //  actions.Active = () => console.log('Active');
      //    break;
     }
    return ({
      name: '',
      variant: 'success',
      action: {
        // View: () => navigate(`/${routeConstants.systemAdmin}/${routeConstants.facilitatorList}/${id}`),
        View: () => console.log(`/viewing`),
        ...actions
      }
    })
  };

  const getOrders = () => {
    const params = {
      storeSlug: sessionData.slug,
      status: query,
      limit: 4,
    }
    sendRequest({
        url: 'get/order' + stringifyFilter(params),
        method: 'POST',
        body: {}
    }, (res: any) => {
        const orders = res.data.map((item: any) => {
          item.totalCost = formatNumber(item.totalCost);
          item.dateCreated = formatDate(item.createdAt);
          return item
        })
        setOrderList(orders);
    }, (err: any) => {
    });
  }

 useEffect(() => {
    window.scrollTo(0, 0);
    getOrders();
  }, [props]);
  
  return (
    <>
      <div className='py-4'>
        <div className='vendor-orders px-3'>
        <div className='date-filter spread-info-front'>
          <input type="date" />
          <p className='mb-0 pl-2 ml-1'>Filter by date</p>
        </div>
          <div className='row'>
            <div className='card-container col-md-12'>
              <DataTables data={orderList} columns={tableColumns}/>
              {orderList.length === 0 && <h5 className='text-center py-4'>No Data Yet</h5>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VendorOrders;
