import React, {  } from 'react';
import { Outlet  } from 'react-router-dom';

function DispatcherModule() {
  return (
    <div>
      <Outlet/>
    </div>
  );
}

export default DispatcherModule;
