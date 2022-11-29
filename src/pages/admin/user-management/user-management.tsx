import React, { useEffect, useState } from 'react';
import AppDataModal from '../../../components/block-components/modals/app-data-modal/app-data-modal';
import EvaluateFacilitatorModal from '../../../components/block-components/modals/evaluate-facilitator-modal/evaluate-facilitator-modal';
import './user-management.scss';

function UserManagement() {

  const [viewModal, setViewModal] = useState(false);

  const modalData = {user: 'admin', name: 'Richard'};

  const openModal = () => {
    setViewModal(true);
  }
  const closeModal = (feedback?: any) => {
    console.log({feedback});
    setViewModal(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <div className='user-management pt-5'>
        <h1 className='text-center py-5'>User Management Page</h1>
        <div className='pb-5 text-center'>
          <button className='btn btn-success' onClick={openModal}>View Modal</button>
        </div>
        {/* {viewModal && <AppDataModal data={modalData} closeModal={closeModal} />} */}
        {viewModal && <EvaluateFacilitatorModal closeModal={closeModal} />}
      </div>
    </>
  );
}

export default UserManagement;
