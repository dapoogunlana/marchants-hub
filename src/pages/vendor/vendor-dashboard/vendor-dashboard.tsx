import React, { useEffect, useState } from 'react';
import DataTables from '../../../components/block-components/data-table/data-table';
import './vendor-dashboard.scss';
import { formatDate, formatNumber, stringifyFilter } from '../../../services/utils/data-manipulation-utilits';
import DropdownStyledButton from '../../../components/base-components/styled-dropdown-button/dropdown-button';
import { Link, useNavigate } from 'react-router-dom';
import { routeConstants } from '../../../services/constants/route-constants';
import { 
  ComingSoon,
  TotalSalesIcon,
  TotalOrdersIcon,
  ListedProductsIcon,
  FeaturesMoreSalesIcon,
  FeaturesBusinessLoansIcon,
  FeaturesCheaperIcon,
 } from '../../../assets/images';
import { sendRequest } from '../../../services/utils/request';
import { useSelector } from 'react-redux';
import { IsessionData } from '../../../services/constants/interfaces/session-schemas';
import { tabQueryConstants } from '../../../services/constants/general-constants';
import { IstoreState } from '../../../services/constants/interfaces/data-schemas';

function VendorDashboard(props: any) {
  const sessionData: IsessionData = useSelector((state: IstoreState) => state.session);
  const [orderList, setOrderList] = useState<any[]>([]);
  const [orderCount, setOrderCount] = useState<number>();
  const [orderCountLoaded, setOrderCountLoaded] = useState(false);
  const [pendingOrderCount, setPendingOrderCount] = useState<number>();
  const [pendingOrderCountLoaded, setPendingOrderCountLoaded] = useState(false);
  const [productCount, setProductCount] = useState<number>();
  const [productCountLoaded, setProductCountLoaded] = useState(false);
  const navigate = useNavigate();
  let id: any;

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
      Header: 'Customer',
      accessor: 'customerName',
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
    return ({
      name: '',
      variant: 'success',
      action: {
        // View: () => navigate(`/${routeConstants.systemAdmin}/${routeConstants.facilitatorList}/${id}`),
        View: () => navigate(`/${routeConstants.vendor}/${routeConstants.orders}/`),
        ...actions
      }
    })
  };

  const getOrders = () => {
    const params = {
      // storeSlug: sessionData.slug,
      status: tabQueryConstants.pending.query,
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
    }, (err: any) => {
    });
  }

  const getOrderCount = () => {
    const params = {
      store: sessionData._id,
    }
    sendRequest({
        url: 'get/order/count' + stringifyFilter(params),
        method: 'POST',
        body: {}
    }, (res: any) => {
        setOrderCount(res.data);
        setOrderCountLoaded(true);
    }, (err: any) => {
    });
  }

  const getPendingOrderCount = () => {
    const params = {
      store: sessionData._id,
      status: tabQueryConstants.pending.query,
    }
    sendRequest({
        url: 'get/order/count' + stringifyFilter(params),
        method: 'POST',
        body: {}
    }, (res: any) => {
        setPendingOrderCount(res.data);
        setPendingOrderCountLoaded(true);
    }, (err: any) => {
    });
  }
  const getProductCount = () => {
    const params = {
      store: sessionData._id,
    }
    sendRequest({
        url: 'get/products/count' + stringifyFilter(params),
        method: 'POST',
        body: {}
    }, (res: any) => {
        setProductCount(res.data);
        setProductCountLoaded(true);
    }, (err: any) => {
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getOrders();
    getOrderCount();
    getPendingOrderCount();
    getProductCount();
  }, [props]);
  
  return (
    <>
      <div className='p-4'>
        <div className='row pt-5'>
          <div className='col-lg-8 px-4 mt-4'>
            <div className='db-board'>
              <div className='row'>
                <div className='col-sm-4'>
                  <div className='db-card blue-card mt-3'>
                    <div className='spread-info'>
                      <span></span>
                      <img src={TotalSalesIcon} width={40} alt="" />
                    </div>
                    <p className='mb-0 reduced-x font-weight-bold'>Total Sales</p>
                    <h5 className='font-weight-bold mb-0'>₦{formatNumber(sessionData.totalSales)}</h5>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className='db-card white-card mt-3'>
                    <div className='spread-info'>
                      <span></span>
                      <img src={TotalOrdersIcon} width={40} alt="" />
                    </div>
                    <p className='mb-0 reduced-x font-weight-bold'>Total Orders</p>
                    <h5 className='font-weight-bold mb-0'>{orderCountLoaded ? (orderCount ? formatNumber(orderCount) : 0) : '...'}</h5>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className='db-card white-card mt-3'>
                    <div className='spread-info'>
                      <span></span>
                      <img src={ListedProductsIcon} width={40} alt="" />
                    </div>
                    <p className='mb-1 reduced-x font-weight-bold'>Listed Products</p>
                    <h5 className='font-weight-bold mb-0'>{productCountLoaded ? (productCount ? formatNumber(productCount) : 0) : '...'}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='pt-4'>
                <button className='pending-orders-pill'>
                  <span className='pending-count mr-2'>{pendingOrderCountLoaded ? (pendingOrderCount ? formatNumber(pendingOrderCount) : 0) : '...'}</span> Pending Orders
                </button>
              </div>
              <div className='order-list px-3'>
                {/* <FacilitatorListFilter  submitFilters={(filter: any) => handleFilter(filter)} /> */}
                <div className='row'>
                  <div className='card-container col-md-12 mt-3'>
                    <DataTables data={orderList} columns={tableColumns}/>
                    <div className='text-center pb-4'>
                      <Link to={`/${routeConstants.vendor}/${routeConstants.orders}`}>
                        <button className='btn btn-success dashboard-button'>See More</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-4 mt-4'>
            <div className='more-info'>
              <div className='row'>
                <div className='col-lg-12 col-sm-6'>
                  <div className='imh rad-10'>
                    <img src={ComingSoon} className='rad-10' alt="" />
                  </div>
                </div>
                <div className='col-lg-12 col-sm-6'>
                  <div className='feature spread-info-front mt-3'>
                    <img src={FeaturesMoreSalesIcon} width={60} alt="" />
                    <p className='mb-0 reduced-x pl-3'>More sales channels for you</p>
                  </div>
                  <div className='feature spread-info-front mt-3'>
                    <img src={FeaturesBusinessLoansIcon} width={60} alt="" />
                    <p className='mb-0 reduced-x pl-3'>Business loans</p>
                  </div>
                  <div className='feature spread-info-front mt-3'>
                    <img src={FeaturesCheaperIcon} width={60} alt="" />
                    <p className='mb-0 reduced-x pl-3'>Faster and cheaper product sourcing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VendorDashboard;
