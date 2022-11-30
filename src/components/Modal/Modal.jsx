import Close from '../../assets/img/svg/Close';

import cl from './Modal.module.css';

const Modal = ({modal, setModal, children}) => {

  return (
    <div
      onClick={() => setModal(false)}
      className={`${cl.modal} ${modal ? cl.active : null}`}>
      <div
        onClick={e => e.stopPropagation()}
        className={cl.modalContent}>
        <div
          onClick={() => setModal(false)}
          className={cl.closeBtn}>
          <Close/>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;