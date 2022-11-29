import React, {  } from 'react';
import './mini-loader.scss';

function MiniLoader() {
  return (
    <div className='mini-loader-space'>
      <div className="lds-ripple"><div></div><div></div></div>
    </div>
  );
}

export default MiniLoader;
