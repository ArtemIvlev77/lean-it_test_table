import { useState } from 'react';
import { useSort } from '../../hooks/useSort';
import { usePagination } from '../../hooks/usePagination';
import './Table.css';

const Table = ({ generatedData }) => {
  const { data, sortRequest, sortConfig } = useSort(generatedData);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [contentPerPage, setContentPerPage] = useState(10);
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage,
    count: generatedData.length,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    setPage(Number(input));
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
    if (search !== '') {
      const filteredData = data.filter((item) => {
        return Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setSearchResult(filteredData);
    } else {
      setSearchResult(data);
    }
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div>
      <div className='pagination'>
        <p className='text'>
          {page}/{totalPages}
        </p>
        <button onClick={prevPage} className='page'>
          &larr;
        </button>
        <form name='page' onSubmit={(e) => submitHandler(e)}>
          <input
            type='number'
            placeholder='Выберите страницу'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
        <button onClick={nextPage} className='page'>
          &rarr;
        </button>
        <select
          value={contentPerPage}
          onChange={(e) => setContentPerPage(e.target.value)}>
          <option value='10'>10 строк</option>
          <option value='20'>20 строк</option>
          <option value='30'>30 строк</option>
          <option value='40'>40 строк</option>
          <option value='50'>50 строк</option>
          <option value='100'>100 строк</option>
        </select>
        <span>кол-во строк на странице</span>
      </div>
      <table className='table'>
        <caption> Тестовое задание </caption>
        <thead>
          <tr>
            <th className='table__header'>
              <button
                onClick={() => sortRequest('id')}
                className={getClassNamesFor('id')}
              />
              <span> № записи</span>
            </th>
            <th className='table__header'>
              <span>Текстовое поле</span>
              <input
                type='text'
                value={search}
                onChange={(e) => searchHandler(e)}
              />
            </th>
            <th className='table__header'>
              <span> Возраст </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {search.length > 1
            ? searchResult
                .slice(firstContentIndex, lastContentIndex)
                .map((dataColumn) => (
                  <tr className='table__row' key={dataColumn.id}>
                    <td className='table__col'>{dataColumn.id}</td>
                    <td>{dataColumn.someText}</td>
                    <td>{dataColumn.age}</td>
                  </tr>
                ))
            : data
                .slice(firstContentIndex, lastContentIndex)
                .map((dataColumn) => (
                  <tr className='table__row' key={dataColumn.id}>
                    <td className='table__col'>{dataColumn.id}</td>
                    <td>{dataColumn.someText}</td>
                    <td>{dataColumn.age}</td>
                  </tr>
                ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
