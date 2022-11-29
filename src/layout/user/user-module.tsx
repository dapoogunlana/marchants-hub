import React, { useEffect } from 'react';
import Dashboard from './user_frame/frame';

function UserModule() {
  useEffect(() => {
    console.log('I log Upper-middle child');
  })
  return (
    <>
      <Dashboard/>
    </>
  );
}

export default UserModule;
