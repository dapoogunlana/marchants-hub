import React, { useEffect, useState } from 'react';
import DataTables from '../../../components/block-components/data-table/data-table';
import './vendor-payment-records.scss';
import { 
  ComingSoon,
  TotalSalesIcon,
  TotalOrdersIcon,
  ListedProductsIcon,
  FeaturesCheaperIcon,
 } from '../../../assets/images';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useNavigate } from 'react-router';
import DropdownStyledButton from '../../../components/base-components/styled-dropdown-button/dropdown-button';
import { paymentRecordList } from '../../../services/constants/order-and-payment-dummy-constants';
import InitiatePaymentModal from '../../../components/block-components/modals/initiate-payment-modal/initiate-payment-modal';
import { sendRequest } from '../../../services/utils/request';
import { toast } from 'react-toastify';

function VendorPaymentRecords(props: any) {
  const [initiating, setinItiating] = useState<boolean>(false);
  const [viewInitiateWithdrawal, setViewInitiateWithdrawal] = useState(false);
  const [orderList, setOrderList] = useState<any[]>([]);
  let id: any;
  const query = props.query;
  const [activeKey, setActiveKey] = useState('Payment Records');

  const changKey = (key: any) => {
    setActiveKey(key);
  }

  const closeInitiateWithdrawalModal = (feedback?: any) => {
    setViewInitiateWithdrawal(false);
    if (feedback === 'refresh') {
      getRecords();
    }
  }

  const tableColumns = [
    {
      Header: 'Product',
      accessor: 'product',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
    },
    {
      Header: 'Date',
      accessor: 'date',
    },
    {
      Header: 'Customer Name',
      accessor: 'customerName',
    },
    {
      Header: 'Transaction ID',
      accessor: 'transactionId',
    },
    {
      Header: 'Order ID',
      accessor: 'orderId',
    },
    {
      Header: 'Status',
      accessor: 'status',
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

  const getRecords = () => {
    const list = paymentRecordList.map((item: any, index: number) => {
      item.status = item.status === 'Paid' ? <button className='btn btn-success dashboard-button rad-25 px-4'>Paid</button> :
      <button className='btn btn-success dashboard-button rad-25 px-4'>Paid</button>
      return item;
    })
    setOrderList(list)
  }
  const initiateWithdrawal = () => {
    setinItiating(true);
    sendRequest({
      url: 'initiate-withdrawal',
      method: 'POST',
      body: {},
    }, (res: any) => {
      toast.success(res.message);
      setinItiating(false);
      setViewInitiateWithdrawal(true);
    }, (err: any) => {
      setinItiating(false);
      toast.error(err.error?.emailError || err.message || 'Unable to complete');

      // Temporary
      setViewInitiateWithdrawal(true);
    });
  }

 useEffect(() => {
    window.scrollTo(0, 0);
    getRecords();
  }, [props]);
  
  return (
    <>
      <div className='p-4'>
        <div className='pt-5'>
          <div className='payment-disclaimer'>
            <p><span>Important:</span> To see payment for an order, the order needs to be <span>marked as fulfilled</span></p>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-9 px-4 mt-4'>
            <div className='db-board'>
              <div className='row'>
                <div className='col-sm-4'>
                  <div className='db-card blue-card mt-3'>
                    <div className='spread-info'>
                      <span></span>
                      <img src={TotalSalesIcon} width={40} alt="" />
                    </div>
                    <p className='mb-0 reduced-x font-weight-bold'>Total Sales</p>
                    <h5 className='font-weight-bold mb-0'>N500,000</h5>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className='db-card white-card mt-3'>
                    <div className='spread-info'>
                      <span></span>
                      <img src={TotalOrdersIcon} width={40} alt="" />
                    </div>
                    <p className='mb-0 reduced-x font-weight-bold'>Wallet balance</p>
                    <h5 className='font-weight-bold mb-0'>N150,000</h5>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className='db-card white-card mt-3'>
                    <div className='spread-info'>
                      <span></span>
                      <img src={ListedProductsIcon} width={40} alt="" />
                    </div>
                    <p className='mb-1 reduced-x font-weight-bold'>Total withdrawals</p>
                    <h5 className='font-weight-bold mb-0'>N350,000</h5>
                  </div>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
          <div className='col-lg-3 spread-info-back2 px-4 pt-4'>
            <button className='solid-button' disabled={initiating} onClick={initiateWithdrawal}>{initiating ? 'Processing...' : 'Initiate withdrawals'}</button>
          </div>
          <div className='col-md-12'>
           <div className='order-list'>
            <div className='card-container col-md-12'>
              <Tabs defaultActiveKey={'Payment Records'} onSelect={changKey} >
                <Tab eventKey={'Payment Records'} title={'Payment Records'}>
                  {
                    (activeKey === 'Payment Records') && <DataTables uncontained data={orderList} columns={tableColumns}/>
                  }
                </Tab>
                <Tab eventKey={'Withdrawal Records'} title={'Withdrawal Records'}>
                  {
                    (activeKey === 'Withdrawal Records') && <DataTables uncontained data={orderList} columns={tableColumns}/>
                  }
                </Tab>
              </Tabs>
                
              </div>
           </div>
          </div>
        </div>
      </div>
      {viewInitiateWithdrawal && <InitiatePaymentModal closeModal={closeInitiateWithdrawalModal} />}
    </>
  );
}

export default VendorPaymentRecords;
