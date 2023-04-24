import React, { useEffect, useState } from 'react';
import DataTables from '../../../components/block-components/data-table/data-table';
import './vendor-orders.scss';
import { calculateAge, formatDate, formatNumber, stringifyFilter } from '../../../services/utils/data-manipulation-utilits';
import DropdownStyledButton from '../../../components/base-components/styled-dropdown-button/dropdown-button';
import { Link, useNavigate } from 'react-router-dom';
import { routeConstants } from '../../../services/constants/route-constants';
import { sendRequest } from '../../../services/utils/request';
import { useSelector } from 'react-redux';
import { IsessionData } from '../../../services/constants/interfaces/session-schemas';
import { tabQueryConstants } from '../../../services/constants/general-constants';
import { IstoreState } from '../../../services/constants/interfaces/data-schemas';
import Loader from '../../../components/block-components/loader/loader';
import MiniLoader from '../../../components/block-components/mini-loader/mini-loader';
import { toast } from 'react-toastify';
import RequestDispatcherModal from '../../../components/block-components/modals/request-dispatcher-modal/request-dispatcher-modal';
import DatePicker from '../../../components/base-components/date-picker/date-picker';

function VendorOrders(props: any) {
  const sessionData: IsessionData = useSelector((state: IstoreState) => state.session);
  const [orderList, setOrderList] = useState<any[]>([]);
  const [dateFilter, setDateFilter] = useState<any>({});
  const [orderListLoaded, setOrderListLoaded] = useState(false);
  const [requestDispatchModal, setRequestDispatchModal] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState<number>();
  let id: any;
  const query = props.query;

  const tableColumns = [
    {
      Header: 'Product',
      accessor: 'productString',
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
    id =  cell.row.original._id;
    const style = {
      backgroundColor: '#ffffff',
      borderColor: '#ffffff',
      color: '#28a745',
    };
    return(
      <>
        {
            sessionData.role === routeConstants.userLevels.vendor &&
            AddMenuToVendorCell(id, style)
            // <DropdownStyledButton data={actionButtonProp(id)} style={style} />
        }
        {
            sessionData.role === routeConstants.userLevels.dispatcher &&
            AddCaplulesToDispatcherCell(id)
        }
      </>
    )
  }

  const AddCaplulesToDispatcherCell = (id:any) =>{
    switch(query) {
      case tabQueryConstants.pending.query:
        return(
          <div className='info-grid'>
            <div className="status-pill-green" onClick={() => dispatchAction(id, 'accept')}>
              <i className="fa-solid fa-circle-check"></i>
              <span>Accept</span>
            </div>
            <span></span>
            <div className="status-pill-red" onClick={() => dispatchAction(id, 'reject')}>
              <i className="fa-solid fa-circle-xmark"></i>
              <span>Reject</span>
            </div>
          </div>
        )
      case tabQueryConstants.in_progress.query:
        return(
          <div className='info-grid'>
            <div className="status-pill-green" onClick={() => markOrderAsFulfiled(id)}>
              <i className="fa-solid fa-circle-check"></i>
              <span>Complete</span>
            </div>
            <span></span>
            <div className="status-pill-red" onClick={() => cancelOrderDelivery(id)}>
              <i className="fa-solid fa-circle-xmark"></i>
              <span>Cancel</span>
            </div>
          </div>
        )
      case tabQueryConstants.fufilled.query:
        return(
          <div className="status-pill-cyan">
            <span className=''>Fulfilled</span>
          </div>
        )
    }
  }

  const AddMenuToVendorCell = (id:any, style: any) =>{
    switch(query) {
      case tabQueryConstants.pending.query:
        return <DropdownStyledButton data={actionButtonProp(id)} style={style} />
      case tabQueryConstants.in_progress.query:
        return(
          <div className="status-pill-yellow">
            <span className=''>In&nbsp;Progress</span>
          </div>
        )
      case tabQueryConstants.fufilled.query:
        return(
          <div className="status-pill-yellow">
            <i className="fa-solid fa-circle-check"></i>
            <span className=''>Fulfilled</span>
          </div>
        )
    }
  }

   const actionButtonProp = (id:any) => {      
     const actions: any = {};
     switch(query) {
       case tabQueryConstants.pending.query:
        actions['Request for dispatcher'] = () => requestDispatcher(id);
        actions['Mark as fulfilled'] = () => markOrderAsFulfiled(id);
         break;
       case tabQueryConstants.in_progress.query:
         break;
       case tabQueryConstants.fufilled.query:
         break;
     }
    return ({
      name: 'Actions',
      variant: 'success',
      action: {
        ...actions
      }
    })
  };

  const updateDateFilter = (date: any) => {
    setDateFilter(date);
  }

  const clearDateFilter = () => {
    setDateFilter({});
  }

  const getOrders = () => {
    console.log({query});
    setOrderListLoaded(false);
    const params = {
      // storeSlug: sessionData.slug,
      status: query,
      limit: 4,
      ...dateFilter,
    }
    sendRequest({
        url: 'get/order' + stringifyFilter(params),
        method: 'POST',
        body: {}
    }, (res: any) => {
      const orders = res.data.map((item: any) => {
        item.totalCost = formatNumber(item.totalCost);
        item.dateCreated = formatDate(item.createdAt);
        const products: string[] = [];
        item.products.map((product: any) => {
          if(product?.product?.name) {
            products.push(product?.product?.name);
          }
        })
        item.productString = products.join(', ');
        return item
      })
      setOrderList(orders);
      setOrderListLoaded(true);
    }, (err: any) => {
      setOrderListLoaded(true);
    });
  }
  const dispatchAction = (id: string, type: 'accept' | 'reject') => {
    setOrderListLoaded(false);
    sendRequest({
        url: `/orders/${id}/dispatch-action`,
        method: 'PATCH',
        body: 
        {
          action: type
        }
    }, (res: any) => {
      toast.success(`Order successfully ${type}ed`);
      getOrders();
    }, (err: any) => {
      setOrderListLoaded(true);
      toast.error(`Failed to ${type}ed`);
    });
  }

  const markOrderAsFulfiled = (id: number) => {
    setOrderListLoaded(false);
    sendRequest({
        url: `/orders/${id}/mark-as-fulfilled`,
        method: 'PATCH',
    }, (res: any) => {
      toast.success('Order successfully fulfulled');
      getOrders();
    }, (err: any) => {
      setOrderListLoaded(true);
      toast.error('Failed to fulfill');
    });
  }

  const cancelOrderDelivery = (id: number) => {
    setOrderListLoaded(false);
    sendRequest({
        url: `/orders/${id}/cancel`,
        method: 'PATCH',
    }, (res: any) => {
      toast.success('Order canceled successfully');
      getOrders();
    }, (err: any) => {
      toast.error('Failed to cancel');
      setOrderListLoaded(true);
    });
  }

  const requestDispatcher = (id: number) => {
    setActiveOrderId(id);
    setRequestDispatchModal(true);
  }
  const closeDispatcherRequest = (payload: any) => {
    if(payload === 'refresh') {
      getOrders();
    }
    setRequestDispatchModal(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getOrders();
  }, [props]);

  useEffect(() => {
    getOrders();
  }, [dateFilter]);
  
  return (
    <>
      <div className='py-4'>
        <div className='vendor-orders px-3'>
        {/* <div className='date-filter spread-info-front'>
          <input type="date" />
          <p className='mb-0 pl-2 ml-1'>Filter by date</p>
        </div> */}
          <div className='lifted-filter info-grid'>
            <DatePicker emitDate={updateDateFilter} className='date-button'>
              <i></i>
              Filter by Date
            </DatePicker>
            <span></span>
            <button className='date-button' onClick={clearDateFilter}>Clear Filter</button>
          </div>
          <div className='row'>
            <div className='card-container col-md-12'>
              {
                orderListLoaded ?
                <>
                  <DataTables data={orderList} columns={tableColumns} actionable />
                  {orderList.length === 0 && <h5 className='text-center py-4'>No Data Yet</h5>}
                </> :
                <MiniLoader/>
              }
            </div>
          </div>
        </div>
      </div>
      {requestDispatchModal && <RequestDispatcherModal orderId={activeOrderId} closeModal={closeDispatcherRequest} />}
    </>
  );
}

export default VendorOrders;
