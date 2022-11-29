import React, { useMemo, useEffect, useState } from 'react';
import BarChart from '../../../components/block-components/bar-chart/bar-chart';
import StatusFilter from '../../../components/block-components/dashboard-chart-status-filter/status-filter';
// import StatusFilter from '../../../components/block-components/dashboard-chart-status-filter/status-filter';
import DataTables from '../../../components/block-components/data-table/data-table';
import FacilitatorDashboardFilter from '../../../components/block-components/facilitator-dashboard-filter/facilitator-dashboard-filter';
import Loader from '../../../components/block-components/loader/loader';
import MiniLoader from '../../../components/block-components/mini-loader/mini-loader';
import PieChart from '../../../components/block-components/pie-chart/pie-chart';
import { formatNumber } from '../../../services/utils/data-manipulation-utilits';
import {
  getActiveCount,
  getAgeBreakdown,
  getAppliedCount,
  getConfirmedCount,
  getEducationalLevelBreakdown,
  getEvaluatedCount,
  getGenderBreakdown,
  getLgaBreakdown,
  getPillarBreakdown,
  getStateBreakdown,
  getStateCoverageTable,
  updateFilters
} from '../../../services/utils/facilitator-dashboard-service';
import './facilitator-dashboard.scss';

function FacilitatorDashboard(props: any) {

  const [appliedCount, setAppliedCount] = useState<any>('...');
  const [evaluatedCount, setEvaluatedCount] = useState<any>('...');
  const [confirmedCount, setConfirmedCount] = useState<any>('...');
  const [activeCount, setActiveCount] = useState<any>('...');

  const [pillarBreakdown, setPillarBreakdown] = useState<object>([]);
  const [stateBreakdown, setStateBreakdown] = useState<any>([]);
  const [lgaBreakdown, setLgaBreakdown] = useState<any>([]);
  const [genderBreakdown, setGenderBreakdown] = useState<any>([]);
  const [ageBreakdown, setAgeBreakdown] = useState<any>([]);
  const [educationalLevelBreakdown, setEducationalLevelBreakdown] = useState<any>([]);
  const [stateCoverageTable, setStateCoverageTable] = useState<any>([]);

  const [appliedCountLoaded, setAppliedCountLoaded] = useState(false);
  const [evaluatedCountLoaded, setEvaluatedCountLoaded] = useState(false);
  const [confirmedCountLoaded, setConfirmedCountLoaded] = useState(false);
  const [activeCountLoaded, setActiveCountLoaded] = useState(false);
  
  const [pillarBreakdownLoaded, setPillarBreakdownLoaded] = useState(false);
  const [stateBreakdownLoaded, setStateBreakdownLoaded] = useState(false);
  const [lgaBreakdownLoaded, setLgaBreakdownLoaded] = useState(false);
  const [genderBreakdownLoaded, setGenderBreakdownLoaded] = useState(false);
  const [ageBreakdownLoaded, setAgeBreakdownLoaded] = useState(false);
  const [educationalLevelBreakdownLoaded, setEducationalLevelBreakdownLoaded] = useState(false);
  const [stateCoverageTableLoaded, setStateCoverageTableLoaded] = useState(false);

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
  const activeTab = 'all_applied'

  const handleFilter = (filter: any) => {
    updateFilters(filter);
    setupDashboard();
  }

  const getFilteredAppliedCount = () => {
    setAppliedCountLoaded(false);
    getAppliedCount((count: number) => {
      setAppliedCount(count);
      setAppliedCountLoaded(true);
    });
  }
  const getFilteredEvaluatedCount = () => {
    setEvaluatedCountLoaded(false);
    getEvaluatedCount((count: number) => {
      setEvaluatedCount(count);
      setEvaluatedCountLoaded(true);
    });
  }
  const getFilteredConfirmedCount = () => {
    setConfirmedCountLoaded(false);
    getConfirmedCount((count: number) => {
      setConfirmedCount(count);
      setConfirmedCountLoaded(true);
    });
  }
  const getFilteredActiveCount = () => {
    setActiveCountLoaded(false);
    getActiveCount((count: number) => {
      setActiveCount(count);
      setActiveCountLoaded(true);
    });
  }

  const getFilteredPillarBreakdown = (query: any) => {
    setPillarBreakdownLoaded(false);
    getPillarBreakdown((breakdown: any[]) => {
      setPillarBreakdown(breakdown);
      setPillarBreakdownLoaded(true);
    },query);

  }
  const getFilteredStateBreakdown = (query: any) => {
    setStateBreakdownLoaded(false);
    getStateBreakdown((breakdown: any[]) => {
      setStateBreakdown(breakdown);
      setStateBreakdownLoaded(true);
    },query);

  }
  const getFilteredLgaBreakdown = (query: any) => {
    setLgaBreakdownLoaded(false);
    getLgaBreakdown((breakdown: any[]) => {
      setLgaBreakdown(breakdown);
      setLgaBreakdownLoaded(true);
    },query);
  }
  const getFilteredEducationLevelBreakdown = (query: any) => {
    setEducationalLevelBreakdownLoaded(false);
    getEducationalLevelBreakdown((breakdown: any[]) => {
      setEducationalLevelBreakdown(breakdown);
      setEducationalLevelBreakdownLoaded(true);
    },query);

  }
  const getFilteredGenderLevelBreakdown = (query: any) => {
    setGenderBreakdownLoaded(false);
    getGenderBreakdown((breakdown: any[]) => {
      setGenderBreakdown(breakdown);
      setGenderBreakdownLoaded(true);
    },query);

  }
  const getFilteredAgeLevelBreakdown = (query: any) => {
    setAgeBreakdownLoaded(false);
    getAgeBreakdown((breakdown: any[]) => {
      setAgeBreakdown(breakdown);
      setAgeBreakdownLoaded(true);
    },query);
  }
  
  const setupDashboard = () => {
    getFilteredAppliedCount();
    getFilteredEvaluatedCount();
    getFilteredConfirmedCount();
    getFilteredActiveCount();

    getFilteredPillarBreakdown(activeTab);
    getFilteredStateBreakdown(activeTab);
    getFilteredLgaBreakdown(activeTab);
    getFilteredGenderLevelBreakdown(activeTab);
    getFilteredAgeLevelBreakdown(activeTab);
    getFilteredEducationLevelBreakdown(activeTab);
  };

  
  useEffect(() => {
    window.scrollTo(0, 0);
    setupDashboard();
  }, [props]);
  
  return (
    <>
      <div className='facilitator-dashboard pt-5'>
        <FacilitatorDashboardFilter submitFilters={(filter: any) => handleFilter(filter)} />
        <div className="card-container">
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <div className="card mt-2">
                <div className="card-body">
                  <p className="card-title">Applied</p>
                  {appliedCountLoaded ? <h4 className="card-subtitle fig font-weight-bold">{formatNumber(appliedCount)}</h4> : '...'}
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-12">
              <div className="card mt-2">
                <div className="card-body">
                  <p className="card-title">Evaluated</p>
                  {evaluatedCountLoaded ? <h4 className="card-subtitle fig font-weight-bold">{formatNumber(evaluatedCount)}</h4> : '...'}
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-12">
              <div className="card mt-2">
                <div className="card-body">
                  <p className="card-title">Confirmed</p>
                  {confirmedCountLoaded ? <h4 className="card-subtitle fig font-weight-bold">{formatNumber(confirmedCount)}</h4> : '...'}
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-12">
              <div className="card mt-2">
                <div className="card-body">
                  <p className="card-title">Active</p>
                  {activeCountLoaded ? <h4 className="card-subtitle fig font-weight-bold">{formatNumber(activeCount)}</h4> : '...'}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card-container">
          <h5>Facilitators by Pillars</h5>
          <hr />
          <div className={!pillarBreakdownLoaded ? 'full-hidden' : ''}>
            <StatusFilter activeQuery={activeTab} data={getFilteredPillarBreakdown} />
            <BarChart height="400" data={pillarBreakdown} />
          </div>
          { !pillarBreakdownLoaded && <div><MiniLoader/></div> }
        </div>
        <div className="card-container">
          
          <h5>Top 10 states</h5>
          <hr />
          <div className={!stateBreakdownLoaded ? 'full-hidden' : ''}>
            <StatusFilter activeQuery={activeTab}  data={getFilteredStateBreakdown} />
            <BarChart height="300" data={stateBreakdown}/>
          </div>
          { !stateBreakdownLoaded && <div><MiniLoader/></div> }
        </div>
        <div className="card-container">
          <h5>Top 10 lgas</h5>
          <hr />
          <div className={!lgaBreakdownLoaded ? 'full-hidden' : ''}>
              <StatusFilter activeQuery={activeTab}  data={getFilteredLgaBreakdown} />
              <BarChart height="300" data={lgaBreakdown} />
          </div>
          { !lgaBreakdownLoaded && <div><MiniLoader/></div> }
        </div>
        <div className="row p-3">
          <div className="col-md-6 card-container pie-width mr-5-web">
            <h5>Gender Distribution</h5>
            <hr />
            <div className={!genderBreakdownLoaded ? 'full-hidden' : ''}>
                <StatusFilter activeQuery={activeTab}  data={getFilteredGenderLevelBreakdown} />
                <PieChart data={genderBreakdown} color={pieGenderColor} />
            </div>
            { !genderBreakdownLoaded && <div><MiniLoader/></div> }
          </div>
          
          <div className="col-md-6 card-container pie-width">
            <h5>Age Distribution</h5>
            <hr />
            <div className={!ageBreakdownLoaded ? 'full-hidden' : ''}>
                <StatusFilter activeQuery={activeTab}  data={getFilteredAgeLevelBreakdown} />
                <PieChart data={ageBreakdown} color={pieAgeColor} />
            </div>
            { !ageBreakdownLoaded && <div><MiniLoader/></div> }
          </div>
        </div>
        
        <div className="card-container">
          <h5>Facilitators by education level</h5>
          <hr />
          <div className={!educationalLevelBreakdownLoaded ? 'full-hidden' : ''}>
              <StatusFilter activeQuery={activeTab}  data={getFilteredEducationLevelBreakdown} />
              <BarChart  height="300" data={educationalLevelBreakdown} />
          </div>
          { !educationalLevelBreakdownLoaded && <div><MiniLoader/></div> }
        </div>
        {/* <div className="row p-3">

          <div className='col-md-12 card-container'>
            <h5>State Coverage</h5>
            <DataTables data={stateCoverageTable} columns={columns}/>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default FacilitatorDashboard;
