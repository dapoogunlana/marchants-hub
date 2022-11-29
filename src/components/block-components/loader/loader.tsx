import React, {  } from 'react';
import './loader.scss';

function Loader() {
  return (
    <div className='loader-space'>
      <div className="lds-ripple"><div></div><div></div></div>
    </div>
  );
}

export default Loader;
