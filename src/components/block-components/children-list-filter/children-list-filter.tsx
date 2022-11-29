import { useEffect, useState } from "react";
import { getLgas, getPillars, getState } from "../../../services/utils/core-api-util";
import './children-list-filter.scss'

 const ChildrenListFilter = (props: any) => {
  
  const [stateList, setStateList] = useState<any>([]);
  const [pillars, setPillars] = useState([]);
  const [lgaList, setLgaList] = useState<any>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState<any>({
    state: '',
    lga: '',
    pillar: '',
    date_registered: '',
    gender: '',
    phone: ''
  });
  const [clearCheck, setClearCheck] = useState(false);
  const [stateValue, setStateValue] = useState();
  
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  }

  const submit = () => {
    toggleFilter();
    props.submitFilters(filter);
  }

  const clearFilter = () => {
    setFilter({
      state_id: '',
      lga_id: '',
      pillar: '',
      date_registered: '',
      gender: '',
      phone: ''
    });
    setClearCheck(!clearCheck);
  }

  const updateForm = (field: string, ev: any) => {
    const newFilter = {...filter};
    const value = ev.target.value;
    newFilter[field] = value;
    setFilter(newFilter);
    if(field === 'state_id') {
      setStateValue(value);
    }
  }

  const stateChange = (id: any) => { 
    setLgaList([]);
    setFilter({...filter, lga_id: ''})
    if (id) {
      getLgas(id,(lgas: any)=> {
        setLgaList(lgas);
      });
    }
  }

  useEffect(() => {
    getState((states: any)=> {
      setStateList(states);
    });
    getPillars((pillars: any) => {
      setPillars(pillars);
    })
  }, [props])

  useEffect(() => {
    props.submitFilters(filter);
  }, [clearCheck]);

  useEffect(() => {
    stateChange(stateValue);
  }, [stateValue]);

  return (
    <div className="list-page-filter">
    <div className='button-container'>
      <button className='filter-button' onClick={toggleFilter}><i className="fa-solid fa-filter"></i> Filter</button>
    </div>
      {
        showFilter && <div className="card-container">
          <div className="row">
            <div className='col-lg-3 col-md-4 py-2'>
              <div className='input-style'>
                <select value={filter.state_id} onChange={(e) => {updateForm('state_id', e)}}>
                  <option disabled value=''>Select State</option>
                  {stateList && stateList.map((state: any) => <option key={state.id} value={state.id} >{state.name}</option>)}
                </select>
              </div>
            </div>
            <div className='col-lg-3 col-md-4 py-2'>
              <div className='input-style'>
                <select value={filter.lga_id} onChange={(e) => updateForm('lga_id', e)}>
                  <option disabled value=''>Select Lga</option>
                  {lgaList && lgaList.map((lga: any) => <option key={lga.id} value={lga.id} >{lga.name}</option>)}
                </select>
              </div>
            </div>
            <div className='col-lg-3 col-md-4 py-2'>
              <div className='input-style'>
                <select value={filter.pillar} onChange={(e) => updateForm('pillar', e)}>
                  <option value='' disabled>Pillar</option>
                    {pillars && pillars.map((pilar: any) => <option key={pilar.id} value={pilar.id} >{pilar.name}</option>)}
                </select>
              </div>
            </div>
            <div className='col-lg-3 col-md-4 py-2'>
              <div className='input-style'>
                <input type="date" placeholder="Date Registered" value={filter.date_registered} onChange={(e) => updateForm('date_registered', e)} />
              </div>
            </div>
            <div className='col-lg-3 col-md-4 py-2'>
              <div className='input-style'>
                <select value={filter.gender} onChange={(e) => updateForm('gender', e)}>
                  <option value='' disabled>Gender</option>
                  <option value={'MALE'}>Male</option>
                  <option value={'FEMALE'}>Female</option>
                </select>
              </div>
            </div>
            <div className='col-lg-3 col-md-4 py-2'>
              <div className='input-style'>
                {/* <label>Updates </label> */}
                <input type="text" placeholder="Enter Phone Number" value={filter.phone} onChange={(e) => updateForm('phone', e)} />
              </div>
            </div>
            <div className='col-md-12 py-2'>
              <button className="btn btn-success mr-3" onClick={submit}>Apply Filter</button>
              <button className="btn btn-warning" onClick={clearFilter}>Clear Filter</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default ChildrenListFilter