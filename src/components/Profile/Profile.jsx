import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileIcon from '../../assets/img/svg/ProfileIcon';
import { getUser } from '../../utils/auth';
import ChangePassword from '../ChangePassword/ChangePassword';
import Modal from '../Modal/Modal';
import cl from './Profile.module.css';

const Profile = () => {
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [stage, setStage] = useState(1);
  const {signedIn} = useSelector(state => state.auth);

  let user = {name: '', email: ''};
  if (signedIn) {
    user = getUser();
  }

  useEffect(() => {
    let timer;
    if (stage === 3) {
      timer = setTimeout(() => onSetModal(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [stage]);

  const onSetModal = (value) => {
    setModal(value);
    setStage(1);
  }

  return (
    <div className={cl.Profile}>
      <Modal
        modal={modal}
        setModal={onSetModal}>
        {stage >= 3 ? <p className="alertMessage">Ваш пароль успешно изменен</p>
          : <ChangePassword
              setModal={onSetModal}
              stage={stage}
              setStage={setStage}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}/>}
      </Modal>
      <div className={cl.avatar}>
        <div className={cl.profileIcon}>
          <ProfileIcon/>
        </div>
        <p className={cl.profileName}>{user.name}</p>
      </div>
      <div className={cl.profileOptions}>
        <p className={cl.emailOption}>Почта: {user.email}</p>
        <div onClick={() => onSetModal(true)} className={cl.changePassword}>Изменить пароль</div>
      </div>
    </div>
  );
};

export default Profile;