import React, { useEffect } from "react";
import { closeAppModal, openModal } from "../../../../services/utils/app-data-modal-service";

const AppDataModal = (props: any) => {

  const data = props.data;
  const closeModal = () => {
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
            <div className="p-5"></div>
          </div>
          {/* Content ends  here */}

        </div>
      </div>
    </div>
  );
}

export default AppDataModal;
