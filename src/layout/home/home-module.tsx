import React, {  } from 'react';
import { Outlet  } from 'react-router-dom';

function HomeModule() {
  return (
    <div>
      <Outlet/>
    </div>
  );
}

export default HomeModule;
