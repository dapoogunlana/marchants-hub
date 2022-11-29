import React, { useEffect, useMemo, useState } from 'react';
import BarChart from '../../../components/block-components/bar-chart/bar-chart';
import ChildrenDashboardFilter from '../../../components/block-components/children-dashboard-filter/children-dashboard-filter';
import DataTables from '../../../components/block-components/data-table/data-table';
import PieChart from '../../../components/block-components/pie-chart/pie-chart';
import { getActiveCount, getAgeBreakdown, getPercentageOnTrackCount, getGenderBreakdown, getLgaBreakdown, getOnTrackCount, getPillarBreakdown, getRegisteredCount, getStateBreakdown, getStateCoverageTable, updateFilters } from '../../../services/utils/children-dashboard-service';
import { formatNumber } from '../../../services/utils/data-manipulation-utilits';
import './children-dashboard.scss';

function ChildrenDashboard(props: any) {
   
  const [registeredCount, setRegisteredCount] = useState<any>('...');
  const [trackCount, setTrackCount] = useState<any>('...');
  const [confirmedCount, setConfirmedCount] = useState<any>('...');
  const [activeCount, setActiveCount] = useState<any>('...');

  const [pillarBreakdown, setPillarBreakdown] = useState<any>([]);
  const [stateBreakdown, setStateBreakdown] = useState<any>([]);
  const [lgaBreakdown, setLgaBreakdown] = useState<any>([]);
  const [genderBreakdown, setGenderBreakdown] = useState<any>([]);
  const [ageBreakdown, setAgeBreakdown] = useState<any>([]);
  const [stateCoverageTable, setStateCoverageTable] = useState<any>([]);

  const columns= useMemo ( () => [
    {
        Header: 'State',
        accessor:'state',
    },
    {
        Header: 'Lga',
        accessor:'address',
    },
    {
        Header: 'Federal',
        accessor:'email',
    }
  ], [] );
  const pieGenderColor = ["#5794C0", "#DBC63B"];
  const pieAgeColor = ["#5794C0", "#DBC63B","#F8E9B9","#E4FCD2","#CCCCCC"];

  const handleFilter = (filter: any) => {
    updateFilters(filter);
    setupDashboard();
  }
  const setupDashboard = () => {
    getRegisteredCount((count: number) => setRegisteredCount(count));
    getOnTrackCount((count: number) => setTrackCount(count));
    getPercentageOnTrackCount((count: number) => setConfirmedCount(count));
    getActiveCount((count: number) => setActiveCount(count));

    getPillarBreakdown((breakdown: any[]) => setPillarBreakdown(breakdown));
    getStateBreakdown((breakdown: any[]) => setStateBreakdown(breakdown));
    getLgaBreakdown((breakdown: any[]) => setLgaBreakdown(breakdown));
    getGenderBreakdown((breakdown: any[]) => setGenderBreakdown(breakdown));
    getAgeBreakdown((breakdown: any[]) => setAgeBreakdown(breakdown));
    // getStateCoverageTable((breakdown: any[]) => setStateCoverageTable(breakdown));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setupDashboard();
  }, [props]);
  
  return (
     <>
      <div className='children-dashboard pt-5'>
        <ChildrenDashboardFilter submitFilters={(filter: any) => handleFilter(filter)} />
        <div className="card-container">
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <div className="card mt-2">
                <div className="card-body">
                  <p className="card-title">Registered</p>
                  <h4 className="card-subtitle fig font-weight-bold">{formatNumber(registeredCount)}</h4>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-12">
              <div className="card mt-2">
                <div className="card-body">
                  <p className="card-title">On track</p>
                  <h4 className="card-subtitle fig font-weight-bold">{formatNumber(trackCount)}</h4>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-12">
              <div className="card mt-2">
                <div className="card-body">
                  <p className="card-title">Percentage on track</p>
                  <h4 className="card-subtitle fig font-weight-bold">{formatNumber(confirmedCount)}</h4>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-12">
              <div className="card mt-2">
                <div className="card-body">
                  <p className="card-title">Active</p>
                  <h4 className="card-subtitle fig font-weight-bold">{formatNumber(activeCount)}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card-container">
          <h5>Children by Pillars</h5>
          <hr />
          {/* <StatusFilter /> */}
          <BarChart height="400" data={pillarBreakdown} x="x" y="y" />
        </div>
        <div className="card-container">
          <h5>Top 10 states</h5>
          <hr />
          {/* <StatusFilter /> */}
          <BarChart height="300" data= {stateBreakdown}/>
        </div>
        <div className="card-container">
          <h5>Top 10 lgas</h5>
          <hr />
          {/* <StatusFilter /> */}
          <BarChart height="300" data={lgaBreakdown}/>
        </div>
        <div className="row p-3">
          <div className="col-md-6 card-container pie-width mr-5">
            <h5>Gender Distribution</h5>
            <hr />
            <PieChart data={genderBreakdown} color={pieGenderColor} />
          </div>
          
          <div className="col-md-6 card-container pie-width">
            <h5>Age Distribution</h5>
            <hr />
            <PieChart data={ageBreakdown} color={pieAgeColor} />
          </div>
        </div>
        {/* <div className="card-container">
          <h5>State Coverage</h5>
          <DataTables data={stateCoverageTable} columns={columns}/>
        </div> */}
      </div>
    </>
  );
}

export default ChildrenDashboard;
