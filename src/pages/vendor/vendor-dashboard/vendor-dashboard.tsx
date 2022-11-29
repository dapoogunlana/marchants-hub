import React, { useEffect, useMemo, useState } from 'react';
import DataTables from '../../../components/block-components/data-table/data-table';
import './vendor-dashboard.scss';
import { calculateAge, formatDate, stringifyFilter } from '../../../services/utils/data-manipulation-utilits';
import FacilitatorListFilter from '../../../components/block-components/facilitator-list-filter/facilitator-list-filter';
import DropdownStyledButton from '../../../components/base-components/styled-dropdown-button/dropdown-button';
import { useNavigate } from 'react-router-dom';
import { acceptFacilitator, rejectFacilitator, getFacilitators, updateFilters } from '../../../services/utils/facilitator-list-service';
import { routeConstants } from '../../../services/constants/route-constants';
import { tabQueryConstants } from '../../../services/constants/general-constants';
import EvaluateFacilitatorModal from '../../../components/block-components/modals/evaluate-facilitator-modal/evaluate-facilitator-modal';
import AcceptFacilitatorModal from '../../../components/block-components/modals/accept-facilitator-modal/accept-facilitator-modal';
import { 
  ComingSoon,
  TotalSalesIcon,
  TotalOrdersIcon,
  ListedProductsIcon,
  FeaturesCheaperIcon,
 } from '../../../assets/images';

function VendorDashboard(props: any) {
  const [facilitatorList, setFacilitatorList] = useState<any>([]);
  const [updateFacilitatorToEvaluated, setUpdateFacilitatorToEvaluated] = useState(false);
  const [updateFacilitatorToAccepted, setUpdateFacilitatorToAccepted] = useState(false);
  const [facilitatorId, setFacilitatorId] = useState();
  const [orderList, setOrderList] = useState<any[]>([]);
  let id: any;
  const query = props.query;
  const navigate = useNavigate();
  const handleFilter = (filter: any) => {
    updateFilters(filter);
    getFacilitatorsList();
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
  // <DropdownStyledButton data={buttonProp} />

  const getFacilitatorsList = () => {
    const trimedVendors: any[] = [];
    getFacilitators(query, (facilitators: any) => {
      let pillars: any = []
      facilitators.map((facilitator: any, index: number) => {  
        facilitator.name = `${facilitator.first_name} ${facilitator.last_name}`;
        facilitator.age = facilitator.dob ? calculateAge(facilitator?.dob) : '-';
        facilitator.evaluation_score = facilitator.evaluation_score ? facilitator.evaluation_score : '-';
        facilitator.date_registered = facilitator.created_at ? formatDate(facilitator.created_at) : '-';
        facilitator?.facilitator_pillar.map((pillar: any) => {
          const pillarName = pillar?.pillar?.name
          if (pillarName && !pillars.includes(pillarName)) {
            pillars.push(pillarName)
          }
        })
        facilitator.pillars = facilitator.facilitator_pillar ?  pillars : '-';
        if(index < 3) {
          trimedVendors.push(facilitator);
        }
      })
      setFacilitatorList(trimedVendors)
    })
  }

  const openEvaluateModal = (id: any) => {
    setFacilitatorId(id)
    setUpdateFacilitatorToEvaluated(true);
  }

  const closeEvaluateModal = (feedback?: any) => {
    setUpdateFacilitatorToEvaluated(false);
    if (feedback === 'refresh') {
      getFacilitatorsList();
    }
  }

  const openAcceptModal = (id: any) => {
    setFacilitatorId(id)
    setUpdateFacilitatorToAccepted(true);
  }

  const closeAcceptModal = (feedback?: any) => {
    console.log({feedback});
    setUpdateFacilitatorToAccepted(false);
    if (feedback === 'refresh') {
      getFacilitatorsList();
    }
  }

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
    ])
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
              <div className='pt-3'>
                <button className='btn btn-secondary rad-25 dashboard-button2'>Pending Orders</button>
              </div>
              <div className='order-list px-3'>
                {/* <FacilitatorListFilter  submitFilters={(filter: any) => handleFilter(filter)} /> */}
                <div className='row'>
                  <div className='card-container col-md-12'>
                    <DataTables data={orderList} columns={tableColumns}/>
                    <div className='text-center pb-4'>
                      <button className='btn btn-success dashboard-button'>See More</button>
                    </div>
                  </div>
                </div>
                {updateFacilitatorToEvaluated && <EvaluateFacilitatorModal id={facilitatorId} closeModal={closeEvaluateModal} />}
                {updateFacilitatorToAccepted && <AcceptFacilitatorModal id={facilitatorId} closeModal={closeAcceptModal} />}
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
                    <img src={FeaturesCheaperIcon} width={60} alt="" />
                    <p className='mb-0 reduced-x pl-3'>More sales channels for you</p>
                  </div>
                  <div className='feature spread-info-front mt-3'>
                    <img src={FeaturesCheaperIcon} width={60} alt="" />
                    <p className='mb-0 reduced-x pl-3'>Logistics management</p>
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
