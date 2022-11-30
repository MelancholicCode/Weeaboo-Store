import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCatalog, setSearchQuery } from '../../pages/CatalogPage/catalogSlice';
import cl from './Search.module.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [timer, setTimer] = useState(null);
  const {searchQuery} = useSelector(state => state.catalog)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery])

  const search = (e) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(() => {
      dispatch(clearCatalog());
      dispatch(setSearchQuery(e.target.value))
      navigate('/');
    }, 1000));
  }

  return (
    <div className={cl.search}>
      <input
        value={query}
        onChange={search}
        className={cl.searchInput} placeholder='Поиск' type="text" />
    </div>
  );
};

export default Search;