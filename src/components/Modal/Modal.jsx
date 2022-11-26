import { useDispatch, useSelector } from 'react-redux';

import Close from '../../assets/img/svg/Close';
import Form from '../Form/Form';
import Spinner from "../../assets/img/spinner/Spinner";

import cl from './Modal.module.css';
import { setModal } from '../Form/authSlice';

const Modal = () => {
  const dispatch = useDispatch();
  const {authLoadingStatus, modal} = useSelector(state => state.auth);

  const onOpenModal = (value) => {
    dispatch(setModal(value));
  }

  return (
    <div
      onClick={() => onOpenModal(false)}
      className={`${cl.modal} ${modal ? cl.active : null}`}>
      <div
        onClick={e => e.stopPropagation()}
        className={cl.modalContent}>
        <div
          onClick={() => onOpenModal(false)}
          className={cl.closeBtn}>
          <Close/>
        </div>
        {authLoadingStatus === 'loading'
          ? <Spinner/>
          : <Form/>}
      </div>
    </div>
  );
};

export default Modal;