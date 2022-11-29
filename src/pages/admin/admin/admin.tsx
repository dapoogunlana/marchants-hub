import React, { useEffect } from 'react';
import './admin.scss';

function Admin() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <div className='admin pt-5'>
        <h1 className='text-center py-5'>Admin Page</h1>
      </div>
    </>
  );
}

export default Admin;
