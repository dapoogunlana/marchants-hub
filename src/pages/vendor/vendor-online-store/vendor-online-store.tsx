import React, { useEffect } from 'react';
import './vendor-online-store.scss';

function VendorOnlineStore() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <div className='profile pt-5'>
        <h1 className='text-center py-5'>Vendor Online Store Page</h1>
      </div>
    </>
  );
}

export default VendorOnlineStore;
