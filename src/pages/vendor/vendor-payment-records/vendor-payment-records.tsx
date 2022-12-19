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
import { useNavigate } from 'react-router';
import DropdownStyledButton from '../../../components/base-components/styled-dropdown-button/dropdown-button';

function VendorPaymentRecords(props: any) {
  const [facilitatorList, setFacilitatorList] = useState<any>([]);
  const [updateFacilitatorToEvaluated, setUpdateFacilitatorToEvaluated] = useState(false);
  const [updateFacilitatorToAccepted, setUpdateFacilitatorToAccepted] = useState(false);
  const [facilitatorId, setFacilitatorId] = useState();
  const [orderList, setOrderList] = useState<any[]>([]);
  let id: any;
  const query = props.query;
  const navigate = useNavigate();

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

 useEffect(() => {
    // getFacilitatorsList();
    window.scrollTo(0, 0);
    setOrderList([
      {
        id: 1,
        product: 'Gucci Bag',
        amount: '120,000',
        date: '21-10-2022',
        customerName: 'Enahoro Azeta',
        transactionId: '12345543',
        orderId: 'No 5 Owolabi street, off Ikorodu road, shomolu',
        status: <button className='btn btn-success dashboard-button rad-25 px-4'>Paid</button>
      },
      {
        id: 1,
        product: 'Gucci Bag',
        amount: '120,000',
        date: '21-10-2022',
        customerName: 'Enahoro Azeta',
        transactionId: '12345543',
        orderId: 'No 5 Owolabi street, off Ikorodu road, shomolu',
        status: <button className='btn btn-success dashboard-button rad-25 px-4'>Paid</button>
      },
      {
        id: 1,
        product: 'Gucci Bag',
        amount: '120,000',
        date: '21-10-2022',
        customerName: 'Enahoro Azeta',
        transactionId: '12345543',
        orderId: 'No 5 Owolabi street, off Ikorodu road, shomolu',
        status: <button className='btn btn-success dashboard-button rad-25 px-4'>Paid</button>
      },
      {
        id: 1,
        product: 'Gucci Bag',
        amount: '120,000',
        date: '21-10-2022',
        customerName: 'Enahoro Azeta',
        transactionId: '12345543',
        orderId: 'No 5 Owolabi street, off Ikorodu road, shomolu',
        status: <button className='btn btn-success dashboard-button rad-25 px-4'>Paid</button>
      },
      {
        id: 1,
        product: 'Gucci Bag',
        amount: '120,000',
        date: '21-10-2022',
        customerName: 'Enahoro Azeta',
        transactionId: '12345543',
        orderId: 'No 5 Owolabi street, off Ikorodu road, shomolu',
        status: <button className='btn btn-success dashboard-button rad-25 px-4'>Paid</button>
      },
      {
        id: 1,
        product: 'Gucci Bag',
        amount: '120,000',
        date: '21-10-2022',
        customerName: 'Enahoro Azeta',
        transactionId: '12345543',
        orderId: 'No 5 Owolabi street, off Ikorodu road, shomolu',
        status: <button className='btn btn-success dashboard-button rad-25 px-4'>Paid</button>
      },
      {
        id: 1,
        product: 'Gucci Bag',
        amount: '120,000',
        date: '21-10-2022',
        customerName: 'Enahoro Azeta',
        transactionId: '12345543',
        orderId: 'No 5 Owolabi street, off Ikorodu road, shomolu',
        status: <button className='btn btn-success dashboard-button rad-25 px-4'>Paid</button>
      },
      {
        id: 1,
        product: 'Gucci Bag',
        amount: '120,000',
        date: '21-10-2022',
        customerName: 'Enahoro Azeta',
        transactionId: '12345543',
        orderId: 'No 5 Owolabi street, off Ikorodu road, shomolu',
        status: <button className='btn btn-success dashboard-button rad-25 px-4'>Paid</button>
      },
    ])
  }, [props]);
  
  return (
    <>
      <div className='p-4'>
        <div className='row pt-5'>
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
                    <h5 className='font-weight-bold mb-0'>N100,233,500</h5>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className='db-card white-card mt-3'>
                    <div className='spread-info'>
                      <span></span>
                      <img src={TotalOrdersIcon} width={40} alt="" />
                    </div>
                    <p className='mb-0 reduced-x font-weight-bold'>Total Orders</p>
                    <h5 className='font-weight-bold mb-0'>50</h5>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className='db-card white-card mt-3'>
                    <div className='spread-info'>
                      <span></span>
                      <img src={ListedProductsIcon} width={40} alt="" />
                    </div>
                    <p className='mb-1 reduced-x font-weight-bold'>Listed Products</p>
                    <h5 className='font-weight-bold mb-0'>33</h5>
                  </div>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
          <div className='col-lg-3 text right px-4 mt-4 pt-5'>
            <button className='solid-button'>Initiate withdrawals</button>
          </div>
          <div className='col-md-12'>
           <div className='order-list'>
            <div className='card-container col-md-12'>
                <DataTables data={orderList} columns={tableColumns}/>
              </div>
           </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VendorPaymentRecords;
