import React, { useEffect } from "react";
import { closeAppModal, openModal } from "../../../../services/utils/app-data-modal-service";

const DeleteModal = (props: any) => {

  const product = props.product;
  const closeModal = (feedback: any) => {
    closeAppModal(()=> props.closeModal(product,feedback));
  };

  useEffect(() => {
    openModal();
    console.log({props});
  }, []);

  return (
    <div className="app-data-modal">
      <div className="modal-bg"></div>
      <div className={"modal-container small no-pad"}>
        <div className="modal-content">
          
          {/* Any content goes in here */}
          <div>
            <div style={{padding: '20px'}}>
              <h6 className="increased-soft pt-3 pb-1" style={{paddingLeft: '20px'}}>{props.title || 'Delete'}</h6>
              <p>{props.writeup}</p>
            </div>
            <div className='text-right pt-3 pb-2 lighter-grey pb-3' style={{padding: '20px'}}>
                <button onClick={closeModal} className='solid-button-danger mx-0 px-3 rad-10 mr-3'>
                  <i className="fa-solid fa-circle-xmark mr-2"></i>Cancel
                </button>
                <button onClick={() => closeModal(true)} className='btn solid-button mx-0 px-4 rad-10'>
                  <i className="fa-solid fa-circle-check mr-2"></i>Proceed
                </button>
            </div>
          </div>
          {/* Content ends  here */}

        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
