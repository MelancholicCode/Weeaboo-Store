import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCatalog, setSearchQuery } from '../../pages/CatalogPage/catalogSlice';
import cl from './Search.module.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [timer, setTimer] = useState(null);
  const {productsLoadingStatus, searchQuery} = useSelector(state => state.catalog)
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
    }, 1000));
  }

  return (
    <Link to='/' className={cl.search}>
      <input
        value={query}
        onChange={search}
        disabled={productsLoadingStatus === 'loading' ? true : false}
        className={cl.searchInput} placeholder='Поиск' type="text" />
    </Link>
  );
};

export default Search;