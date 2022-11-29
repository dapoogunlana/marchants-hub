import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DropdownStyledButton from '../../../components/base-components/styled-dropdown-button/dropdown-button';
import DataTables from '../../../components/block-components/data-table/data-table';
import './vendor-orders.scss';

function VendorOrders(props: any) {

  let id: any;
  const [orderList, setOrderList] = useState<any[]>([]);

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
      Header: 'Actions',
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
    //  switch(query) {
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
    //  }
    actions['Request for dispatcher'] = () => toast.info('Under Development');
    actions['Mark as fulfilled'] = () => toast.info('Under Development');
    return ({
      name: '',
      variant: 'success',
      action: {
        View: () => console.log(`/viewing`),
        // View: () => navigate(`/${routeConstants.systemAdmin}/${routeConstants.facilitatorList}/${id}`),
        ...actions
      }
    })
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setOrderList([
      {
        id: 1,
        product: 'Gucci Bag',
        amount: '120,000',
        date: '21-10-2022',
        customerName: 'Enahoro Azeta',
        customerPhoneNumber: '08026993310',
        customerAddress: 'Bariga Lagos',
      },
      {
        id: 2,
        product: 'Gucci Bag',
        amount: '120,000',
        date: '21-10-2022',
        customerName: 'Enahoro Azeta',
        customerPhoneNumber: '08026993310',
        customerAddress: 'Bariga Lagos',
      },
      {
        id: 3,
        product: 'Gucci Bag',
        amount: '120,000',
        date: '21-10-2022',
        customerName: 'Enahoro Azeta',
        customerPhoneNumber: '08026993310',
        customerAddress: 'Bariga Lagos',
      },
      {
        id: 4,
        product: 'Gucci Bag',
        amount: '120,000',
        date: '21-10-2022',
        customerName: 'Enahoro Azeta',
        customerPhoneNumber: '08026993310',
        customerAddress: 'Bariga Lagos',
      },
      {
        id: 5,
        product: 'Gucci Bag',
        amount: '120,000',
        date: '21-10-2022',
        customerName: 'Enahoro Azeta',
        customerPhoneNumber: '08026993310',
        customerAddress: 'Bariga Lagos',
      },
    ])
  });
  
  return (
    <>
      <div className='vendor-orders pt-3'>
        <div className='date-filter spread-info-front'>
          <input type="date" />
          <p className='mb-0 pl-2 ml-1'>Filter by date</p>
        </div>
        <div className='order-list px-3'>
          {/* <FacilitatorListFilter  submitFilters={(filter: any) => handleFilter(filter)} /> */}
          <div className='row'>
            <div className='card-container col-md-12'>
              <DataTables data={orderList} columns={tableColumns}/>
              <div className='text-center pb-4'>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VendorOrders;
