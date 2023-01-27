import cl from './Modal.module.css';

const Modal = ({modal, setModal, children}) => {

  return (
    <div
      onClick={() => setModal(false)}
      className={`${cl.modal} ${modal ? cl.active : null}`}>
      <div
        onClick={e => e.stopPropagation()}
        className={cl.modalContent}>
        {children}
      </div>
    </div>
  );
};

export default Modal;