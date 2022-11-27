import cl from './ProfilePage.module.css';

const ProfilePage = () => {
  return (
    <div className={`container ${cl.ProfilePage}`}>
      <div className={cl.profileWrapper}>
        <ul className={cl.optionsList}>
          <li className={cl.optionsListItem}>Мои заказы</li>
        </ul>
        <div className={cl.profileContent}>
          Страница
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;