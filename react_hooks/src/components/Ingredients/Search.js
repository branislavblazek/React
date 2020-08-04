import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';  
import useHttp from '../../hooks/http';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();
  const {isLoading, data, error, sendRequest, clear} = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value)
      {
        const query = enteredFilter.length === 0
        ? ''
        : `?orderBy="title"&equalTo="${enteredFilter}"`;

        sendRequest('https://react-burger-app-6d0c1.firebaseio.com/ingredients_obj.json' + query, 'GET');
          
      }
      return () => {
        clearTimeout(timer);
      }
    }, 500);
  }, [enteredFilter, sendRequest, inputRef]);

  useEffect(() => {
    if (!isLoading && !error && data) 
    {
      const loadedIngredients = [];
      for (const key in data){
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount
        })
      }
      //setIngredients(loadedIngredients);
      onLoadIngredients(loadedIngredients);
    }
  }, [data, isLoading, error, onLoadIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input 
            ref={inputRef}
            type="text" 
            value={enteredFilter} 
            onChange={event => setEnteredFilter(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
