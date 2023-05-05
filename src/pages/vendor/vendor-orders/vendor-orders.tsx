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
import ActionModal from '../../../components/block-components/modals/action-modal/action-modal';
import { iDispatchActionData } from '../../../services/constants/interfaces/product-and-orders-schema';

function VendorOrders(props: any) {
  const sessionData: IsessionData = useSelector((state: IstoreState) => state.session);
  const [orderList, setOrderList] = useState<any[]>([]);
  const [cta, setCta] = useState('');
  const [dateFilter, setDateFilter] = useState<any>({});
  const [orderListLoaded, setOrderListLoaded] = useState(false);
  const [requestDispatchModal, setRequestDispatchModal] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState<number>();
  const [dispatchData, setDispatchData] = useState<iDispatchActionData>({id: '', type: '', message: '', title: '', showActionModal: false});
  const [completeDispatchData, setCompleteDispatchData] = useState<iDispatchActionData>({id: '', type: '', message: '', title: '', showActionModal: false});

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
      Header: 'Payment Status',
      accessor: 'paymentStatus',
    },
    
    {
      Header: cta,
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
            AddCaplulesToDispatcherCell(id, cell.row.original)
        }
      </>
    )
  }

  const AddCaplulesToDispatcherCell = (id:any, cell: any) =>{
    switch(query) {
      case tabQueryConstants.pending.query:
        return(
          <div className='info-grid'>
            <div className="status-pill-green" onClick={() => openDispatchActionDialogue(id, 'accept', cell)}>
              <i className="fa-solid fa-circle-check"></i>
              <span>Accept</span>
            </div>
            <span></span>
            <div className="status-pill-red" onClick={() => openDispatchActionDialogue(id, 'reject', cell)}>
              <i className="fa-solid fa-circle-xmark"></i>
              <span>Reject</span>
            </div>
          </div>
        )
      case tabQueryConstants.in_progress.query:
        return(
          <div className='info-grid'>
            <div className="status-pill-green" onClick={() => openCompleteDispatchDialogue(id, 'complete')}>
              <i className="fa-solid fa-circle-check"></i>
              <span>Complete</span>
            </div>
            <span></span>
            <div className="status-pill-red" onClick={() => openCompleteDispatchDialogue(id, 'cancel')}>
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
    setOrderListLoaded(false);
    const params = {
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
        item.paymentStatus = item.isPaid ? <button className='green-capsule px-4 py-1'> Paid &nbsp;</button> :
        <button className='yellow-capsule px-3 py-1'>Pending</button>
        return item
      })
      setOrderList(orders);
      setOrderListLoaded(true);
    }, (err: any) => {
      setOrderListLoaded(true);
    });
  }

  const openDispatchActionDialogue = (id: string, type: 'accept' | 'reject', cell?: any) => {
    setDispatchData({
      id,
      type,
      message: type === 'accept' ? <>
        You are about to accept an order request to deliver {cell?.customerAddress ? `to ${cell?.customerAddress}` : 'this item'}. Kindly confirm you have called the 
        sender and have confirmed the pickup location before accepting this order. 
        <br/><br/>
        Accepted orders not delivered will reduce your ratings on this platform and might lead to red listing of dispatcher 
        from the platform.
      </> :
      `
        You are about to reject an order request to deliver ${cell?.customerAddress ? `to ${cell?.customerAddress}` : 'this item'}. Please be sure you have a good
        reason to do so because this action can not be undone
      `,
      title: <span className='text-danger'>Notice</span>,
      showActionModal: true,
    });
  }

  const dispatchAction = (item: any, feedback: boolean) => {
    setDispatchData({...dispatchData, showActionModal: false});
    if (feedback) {
      setOrderListLoaded(false);
      sendRequest({
          url: `/orders/${dispatchData.id}/dispatch-action`,
          method: 'PATCH',
          body: 
          {
            action: dispatchData.type
          }
      }, (res: any) => {
        toast.success(`Order successfully ${dispatchData.type}ed`);
        getOrders();
      }, (err: any) => {
        setOrderListLoaded(true);
        toast.error(err?.message || `Failed to ${dispatchData.type}ed`);
      });
    }
  }

  const openCompleteDispatchDialogue = (id: string, type: 'complete' | 'cancel') => {
    setCompleteDispatchData({
      id,
      type,
      message: type === 'complete' ? <>
        You are about to mark this order as complete, that means the item has been delivered to the recipient. 
        <br/><br/>
        Orders marked as completed that were not delivered will result in red listing of dispatcher from this platform
      </> :
      `
        You are about to cancel the delivery of this item. Please be sure you have a good
        reason to do so because this action can affect your dispatch rating
      `,
      title: <span className='text-danger'>Notice</span>,
      showActionModal: true,
    });
  }

  const completeDispatchAction = (item: any, feedback: boolean) => {
    setCompleteDispatchData({...completeDispatchData, showActionModal: false});
    if (feedback) {
      if(completeDispatchData.type === 'complete') {
        markOrderAsFulfiled(completeDispatchData.id)
      } else  {
        cancelOrderDelivery(completeDispatchData.id)
      }
    }
  }

  const markOrderAsFulfiled = (id: any) => {
    setOrderListLoaded(false);
    sendRequest({
        url: `/orders/${id}/mark-as-fulfilled`,
        method: 'PATCH',
    }, (res: any) => {
      toast.success('Order successfully fulfulled');
      getOrders();
    }, (err: any) => {
      setOrderListLoaded(true);
      toast.error(err?.message || 'Failed to fulfill');
    });
  }

  const cancelOrderDelivery = (id: any) => {
    setOrderListLoaded(false);
    sendRequest({
        url: `/orders/${id}/cancel`,
        method: 'PATCH',
    }, (res: any) => {
      toast.success('Order canceled successfully');
      getOrders();
    }, (err: any) => {
      toast.error(err?.message || 'Failed to cancel');
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
    switch(query) {
      case tabQueryConstants.pending.query:
        setCta('Actions');
        break;
      case tabQueryConstants.in_progress.query:
        setCta('Actions');
        break;
      case tabQueryConstants.fufilled.query:
       setCta('Order Status');
        break;
    }
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
      {dispatchData.showActionModal && <ActionModal title={dispatchData.title} writeup={dispatchData.message} closeModal={dispatchAction} />}
      {completeDispatchData.showActionModal && <ActionModal title={completeDispatchData.title} writeup={completeDispatchData.message} closeModal={completeDispatchAction} />}
    </>
  );
}

export default VendorOrders;
