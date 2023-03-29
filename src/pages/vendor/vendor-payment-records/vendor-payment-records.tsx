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
import { useSelector } from 'react-redux';
import { routeConstants } from '../../../services/constants/route-constants';
import { formatDate, formatNumber, stringifyFilter } from '../../../services/utils/data-manipulation-utilits';
import { IstoreState } from '../../../services/constants/interfaces/data-schemas';
import { IsessionData } from '../../../services/constants/interfaces/session-schemas';

function VendorPaymentRecords(props: any) {
  const sessionData: IsessionData = useSelector((state: IstoreState) => state.session);
  const [initiating, setinItiating] = useState<boolean>(false);
  const [viewInitiateWithdrawal, setViewInitiateWithdrawal] = useState(false);
  const [paymentRecords, setPaymentRecords] = useState<any[]>([]);
  const [walletBalance, setWalletBalance] = useState<number>();
  const [walletBalanceLoaded, setWalletBalanceLoaded] = useState(false);
  const user = useSelector((state:any) => state.session);
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

  const paymentTableColumns = [
    { Header: 'Product', accessor: 'product', },
    { Header: 'Amount', accessor: 'amount', },
    { Header: 'Date', accessor: 'date', },
    { Header: 'Customer Name', accessor: 'customerName', },
    { Header: 'Customer Phone', accessor: 'customerPhoneNumber', },
    { Header: 'Customer Address', accessor: 'customerAddress', },
    { Header: 'Status', accessor: 'status', },
  ];

  const withdrawalTableColumns = [
    { Header: 'Product', accessor: 'product', },
    { Header: 'Amount', accessor: 'amount', },
    { Header: 'Date', accessor: 'date', },
    { Header: 'Customer Name', accessor: 'customerName', },
    { Header: 'Customer Phone', accessor: 'customerPhoneNumber', },
    { Header: 'Customer Address', accessor: 'customerAddress', },
    { Header: 'Status', accessor: 'status', },
  ];

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

  const getWalletBalance = () => {
    const params = {
      owner: sessionData._id,
    }
    sendRequest({
        url: 'get/wallet' + stringifyFilter(params),
        method: 'POST',
        body: {}
    }, (res: any) => {
        setWalletBalance(res.data[0].balance);
        setWalletBalanceLoaded(true);
    }, (err: any) => {
    });
  }

  const getRecords = () => {
    const params = {
      owner: sessionData._id,
      limit: 20,
      page: 1,
    }
    sendRequest({
      url: 'get/payments' + stringifyFilter(params),
      method: 'POST',
      body: {
        "populate": [{
            "path": "order",
            "select": "isPaid customerName customerEmail customerAddress customerPhoneNumber"
        }]
      }
    }, (res: any) => {
      const record = res.data.map((item: any) => {
        const payload: any = {
          product: item.order?.products?.map((product: any) => product.product.name) || '--',
          amount: item.totalAmount,
          date: formatDate(item.createdAt),
          customerName: item.order?.customerName,
          customerPhoneNumber: item.order?.customerPhoneNumber,
          customerAddress: item.order?.customerAddress,
          status: item.order?.isPaid ? <button className='btn btn-success dashboard-button rad-25 px-4'>Paid</button> :
          <button className='btn btn-success dashboard-button rad-25 px-4'>Paid</button>
        }
        return payload;
      });
      setPaymentRecords(record);
      setWalletBalanceLoaded(true);
    }, (err: any) => {
    });
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
    getWalletBalance();
    getRecords();
  }, [props]);
  
  return (
    <>
      <div className='p-4'>
        {
          user.role === routeConstants.userLevels.vendor ?
          <div className='pt-5'>
          <div className='payment-disclaimer'>
            <p><span>Important:</span> To see payment for an order, the order needs to be <span>marked as fulfilled</span></p>
          </div>
        </div> :
          <div className='pt-4'>
        </div>
        }
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
                    <h5 className='font-weight-bold mb-0'>N{formatNumber(sessionData.totalSales)}</h5>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className='db-card white-card mt-3'>
                    <div className='spread-info'>
                      <span></span>
                      <img src={TotalOrdersIcon} width={40} alt="" />
                    </div>
                    <p className='mb-0 reduced-x font-weight-bold'>Wallet balance</p>
                    <h5 className='font-weight-bold mb-0'>N{walletBalanceLoaded ? (walletBalance ? formatNumber(walletBalance) : '') : '...'}</h5>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className='db-card white-card mt-3'>
                    <div className='spread-info'>
                      <span></span>
                      <img src={ListedProductsIcon} width={40} alt="" />
                    </div>
                    <p className='mb-1 reduced-x font-weight-bold'>Total withdrawals</p>
                    <h5 className='font-weight-bold mb-0'>N{walletBalanceLoaded ? (walletBalance ? formatNumber(350000) : '') : '...'}</h5>
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
                    (activeKey === 'Payment Records') && <DataTables uncontained data={paymentRecords} columns={paymentTableColumns}/>
                  }
                </Tab>
                <Tab eventKey={'Withdrawal Records'} title={'Withdrawal Records'}>
                  {
                    (activeKey === 'Withdrawal Records') && <DataTables uncontained data={paymentRecords} columns={paymentTableColumns}/>
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
