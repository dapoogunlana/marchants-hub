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
import MiniLoader from '../../../components/block-components/mini-loader/mini-loader';

function VendorPaymentRecords(props: any) {
  const sessionData: IsessionData = useSelector((state: IstoreState) => state.session);
  const [initiating, setinItiating] = useState<boolean>(false);
  const [viewInitiateWithdrawal, setViewInitiateWithdrawal] = useState(false);
  const [listLoaded, setListLoaded] = useState(false);
  const [paymentRecords, setPaymentRecords] = useState<any[]>([]);
  const [withdrawalRecords, setWithdrawalRecords] = useState<any[]>([]);
  const [totalWithdrawn, setTotalWithdrawn] = useState<number>();
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
      getWalletBalance();
      getPaymentRecords();
      getWithdrawalRecords();
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
    { Header: 'Amount', accessor: 'transactionAmount', },
    { Header: 'Date', accessor: 'date', },
    { Header: 'Recipient account details', accessor: 'accountDetails', },
    { Header: 'TransactionID', accessor: 'transactionReference', },
    // { Header: 'Customer Phone', accessor: 'customerPhoneNumber', },
    // { Header: 'Customer Address', accessor: 'customerAddress', },
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
        setTotalWithdrawn(res.data[0].totalAmountWithdrawn);
        setWalletBalanceLoaded(true);
    }, (err: any) => {
    });
  }

  const getPaymentRecords = () => {
    setListLoaded(false);
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
      const records: any[] = [];
      const record = res.data.map((item: any) => {
        const payload: any = {
          product: item.order?.products?.map((product: any) => product.product.name) || '--',
          amount: item.totalAmount,
          date: formatDate(item.createdAt),
          customerName: item.order?.customerName,
          customerPhoneNumber: item.order?.customerPhoneNumber,
          customerAddress: item.order?.customerAddress,
          status: item.order?.isPaid ? <button className='green-capsule px-4 py-2'>Paid</button> :
          <button className='yellow-capsule px-4 py-2'>Pending</button>
        }
        if(item.order?.isPaid) {
          records.push(payload);
        }
        return payload;
      });
      setPaymentRecords(records);
      setWalletBalanceLoaded(true);
      setListLoaded(true);
    }, (err: any) => {
      setListLoaded(true);
    });
  }

  const getWithdrawalRecords = () => {
    setListLoaded(false);
    const params = {
      owner: sessionData._id,
      limit: 20,
      page: 1,
    }
    sendRequest({
      url: 'get/withdrawal' + stringifyFilter(params),
      method: 'POST',
    }, (res: any) => {
      const record = res.data.map((item: any) => {
        const payload: any = {
          ...item,
          date: formatDate(item.createdAt),
          accountDetails: item.destinationBankName + ' ' + item.creditAccount,
        }
        switch(item.status) {
          case 'SUCCESS':
            payload.status = <button className='green-capsule px-4 py-2 reduced'>SUCCESS</button>
            break
          case 'PENDING':
            payload.status = <button className='yellow-capsule px-4 py-2 reduced'>PENDING</button>
            break
          case 'FAILED':
            payload.status = <button className='red-capsule px-4 py-2 reduced'>FAILED</button>
            break
        }
        return payload;
      });
      setWithdrawalRecords(record);
      setListLoaded(true);
    }, (err: any) => {
      setListLoaded(true);
    });
  }
  const initiateWithdrawal = () => {
    setinItiating(true);
    sendRequest({
      url: 'withdrawals/transfer-otp',
      body: {},
    }, (res: any) => {
      toast.success(res.message);
      setinItiating(false);
      setViewInitiateWithdrawal(true);
    }, (err: any) => {
      setinItiating(false);
      toast.error(err.error?.emailError || err.message || 'Unable to complete');
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getWalletBalance();
    getPaymentRecords();
    getWithdrawalRecords();
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
                    <h5 className='font-weight-bold mb-0'>N{walletBalanceLoaded ? ((walletBalance || walletBalance === 0) ? formatNumber(walletBalance) : '') : '...'}</h5>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className='db-card white-card mt-3'>
                    <div className='spread-info'>
                      <span></span>
                      <img src={ListedProductsIcon} width={40} alt="" />
                    </div>
                    <p className='mb-1 reduced-x font-weight-bold'>Total withdrawals</p>
                    <h5 className='font-weight-bold mb-0'>N{walletBalanceLoaded ? ((totalWithdrawn || totalWithdrawn === 0) ? formatNumber(totalWithdrawn) : '') : '...'}</h5>
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
                    listLoaded ?
                    <>
                    {
                      (activeKey === 'Payment Records') && <DataTables uncontained data={paymentRecords} columns={paymentTableColumns}/>
                    }
                    {paymentRecords.length === 0 && <h5 className='text-center my-4'>No data yet</h5>}
                    </>  :
                    <MiniLoader/>
                  }
                </Tab>
                <Tab eventKey={'Withdrawal Records'} title={'Withdrawal Records'}>
                  {
                    listLoaded ?
                    <>
                    {
                      (activeKey === 'Withdrawal Records') && <DataTables uncontained data={withdrawalRecords} columns={withdrawalTableColumns}/>
                    }
                    {withdrawalRecords.length === 0 && <h5 className='text-center my-4'>No data yet</h5>}
                    </> :
                    <MiniLoader/>
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
