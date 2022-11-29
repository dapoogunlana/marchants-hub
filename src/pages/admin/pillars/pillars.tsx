import React, { useEffect, useMemo } from 'react';
import DataTables from '../../../components/block-components/data-table/data-table';
import './pillars.scss';

function Pillars() {

   const columns= useMemo ( () => [
    {
        Header: 'ID',
        accessor:'id',
    },
    {
        Header: 'First name',
        accessor:'first_name',
    },
    {
        Header: 'Last name',
        accessor:'last_name',
    },
    {
        Header: 'Age',
        accessor:'age',
    },
    {
        Header: 'Phone',
        accessor:'phone',
    },
    {
        Header: 'State',
        accessor:'state',
    },
    {
        Header: 'LGA',
        accessor:'lga',
    },
    {
        Header: 'Facilitator Score',
        accessor:'facilitator_score',
    },
    {
        Header: 'Pillar',
        accessor:'pillar',
    },
    {
        Header: 'Gender',
        accessor:'gender',
    },
    {
        Header: 'Date Registered',
        accessor:'date',
    }
  ], [] );
  const data = [
    { id: 'F-BLN-TA-025-00001', first_name: "Ayo", last_name:"Geta", age: 34, phone: '09063094343', state: 'Delta', lga: 'ika', facilitator_score: '45', pillar: 'Basic literacy & Numeracy', gender: 'Male', date: 'Sep 8, 2015' },
    { id: 'F-BLN-TA-025-00001', first_name: "Foya", last_name:"Iyu", age: 34, phone: '09063544343', state: 'Delta', lga: 'ika', facilitator_score: '10', pillar: 'Health & Nutrition', gender: 'Female', date: 'Sep 8, 2009' },
    { id: 'F-BLN-TA-025-00001', first_name: "Vet", last_name:"Nufter", age: 34, phone: '09090994343', state: 'Delta', lga: 'ika', facilitator_score: '90', pillar: 'Digital skills & Creativity', gender: 'Male', date: 'Sep 8, 2006' },
    { id: 'F-BLN-TA-025-00001', first_name: "Glory", last_name:"Hort", age: 34, phone: '09063111343', state: 'Delta', lga: 'ika', facilitator_score: '20', pillar: 'Basic literacy & Numeracy', gender: 'Female', date: 'Sep 8, 2022' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <div className='pillars pt-5'>        
        <div className='button-container'>
          <button className='filter-button'><i className="fa-solid fa-filter"></i> Filter</button>
          <button className='download-button ml-2'><i className="fa fa-download"></i> Download</button>
        </div>
        <div className='card-container'>
          <DataTables data={data} columns={columns}/>
        </div>
      </div>
    </>
  );
}

export default Pillars;
