import React, { useEffect } from 'react';
import './profile.scss';

function Profile() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <div className='profile pt-5'>
        <h1 className='text-center py-5'>Profile Page</h1>
      </div>
    </>
  );
}

export default Profile;
