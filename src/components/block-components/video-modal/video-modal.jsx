import React, { useEffect } from "react";

function VideoModal(props) {

  const link = props.link;

  const closeModal = () => {
    document.body.style.overflow = '';
    const vidModal = document.querySelector('.vid-modal');
    const modalContent = document.querySelector('.modal-content');
    if (vidModal && modalContent) {
      vidModal.style.opacity = '';
      modalContent.style.transform = '';
    }
    setTimeout(() => {
      // this.modalSignal.emit();
      props.onCloseModal();
    }, 500);
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const vidModal = document.querySelector('.vid-modal');
    const modalContent = document.querySelector('.modal-content');
    setTimeout(() => {
      if (vidModal && modalContent) {
        vidModal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
      }
    }, 200);
  }, []);

  return (
    <div className="vid-modal">
      <div className="modal-bg"></div>
      <div className="modal-container">
        <div className="modal-content">
            <div className="modal-closer" onClick={closeModal}>
                <i className="fas fa-times"></i>
            </div>
            <div className="stream-vid">
                <iframe width="100%" height="100%" title="vid-modal" src={`https://www.youtube.com/embed/${link}?rel=0`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        </div>
      </div>
    </div>
  );
}
export default VideoModal;
