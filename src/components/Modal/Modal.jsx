import { useSelector } from 'react-redux';

import Close from '../../assets/img/svg/Close';
import Form from '../Form/Form';
import Spinner from "../../assets/img/spinner/Spinner";

import cl from './Modal.module.css';

const Modal = ({onOpenModal}) => {
  const {authLoadingStatus, modal} = useSelector(state => state.auth);

  return (
    <div
      onClick={() => onOpenModal(false)}
      className={`${cl.modal} ${modal ? cl.active : null}`}>
      <div
        onClick={e => e.stopPropagation()}
        className={cl.modalContent}>
        <div
          className={cl.closeBtn}>
          <Close
            onOpenModal={onOpenModal}/>
        </div>
        {authLoadingStatus === 'loading'
          ? <Spinner/>
          : <Form/>}
      </div>
    </div>
  );
};

export default Modal;