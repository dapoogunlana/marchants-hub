import React, { useEffect } from 'react';
import { Outlet  } from 'react-router-dom';

function AdminModule() {
  useEffect(() => {
    console.log('I log middle child');
  })
  return (
    <div>
      <Outlet/>
    </div>
  );
}

export default AdminModule;
