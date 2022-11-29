import React, {  } from 'react';
import { Outlet  } from 'react-router-dom';

function VendorModule() {
  return (
    <div>
      <Outlet/>
    </div>
  );
}

export default VendorModule;
