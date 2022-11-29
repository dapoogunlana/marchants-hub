import React, { useEffect } from "react";
import Profile from "../../../../pages/admin/profile/profile";
import { closeAppModal, openModal } from "../../../../services/utils/app-data-modal-service";

const AppDataModal = (props: any) => {

  const data = props.data;
  const closeModal = () => {
    console.log('Rita is a good child');
    closeAppModal(()=> props.closeModal(data));
  };

  useEffect(() => {
    openModal();
  }, []);

  return (
    <div className="app-data-modal">
      <div className="modal-bg"></div>
      <div className={"modal-container"}>
        <div className="modal-closer" onClick={closeModal}>
            <i className="fas fa-times"></i>
        </div>
        <div className="modal-content">
          
          {/* Any content goes in here */}
          <div>
            <Profile/>
            <Profile/>
            <Profile/>
            <Profile/>
            <Profile/>
            <Profile/>
            <Profile/>
            <Profile/>
            <Profile/>
            <Profile/>
            <Profile/>
            <Profile/>
            <Profile/>
            <Profile/>
          </div>
          {/* Content ends  here */}

        </div>
      </div>
    </div>
  );
}

export default AppDataModal;
