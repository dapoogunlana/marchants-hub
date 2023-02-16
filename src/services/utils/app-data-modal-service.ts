
export const closeAppModal = (callback: Function) => {
    document.body.style.overflow = '';
    const appModal: any = document.querySelector('.app-data-modal');
    const modalContent: any = document.querySelector('.modal-container');
    if (appModal && modalContent) {
      appModal.style.opacity = '';
      appModal.style.pointerEvents = '';
      modalContent.style.transform = '';
    }
    setTimeout(() => {
       callback()
    }, 500);
  };

  export const openModal = () => {
    document.body.style.overflow = 'hidden';
    const appModal: any = document.querySelector('.app-data-modal');
    const modalContent: any = document.querySelector('.modal-container');
    setTimeout(() => {
      if (appModal && modalContent) {
        appModal.style.opacity = '1';
        appModal.style.pointerEvents = 'all';
        modalContent.style.transform = 'scale(1)';
      }
    }, 200);
  }