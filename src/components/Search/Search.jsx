import cl from './Search.module.css';

const Search = () => {
  return (
    <div className={cl.search}>
      <input className={cl.searchInput} placeholder='Поиск' type="text" />
    </div>
  );
};

export default Search;