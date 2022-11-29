import React, { useEffect } from 'react';
import './cohort-dashboard.scss';

function CohortDashboard() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <div className='cohort-dashboard pt-5'>
        <h1 className='text-center py-5'>Cohort-dashboard Page</h1>
      </div>
    </>
  );
}

export default CohortDashboard;
