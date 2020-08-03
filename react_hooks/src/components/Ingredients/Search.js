import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value)
      {
        const query = enteredFilter.length === 0
        ? ''
        : `?orderBy="title"&equalTo="${enteredFilter}"`;

        fetch('https://react-burger-app-6d0c1.firebaseio.com/ingredients_obj.json' + query)
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          const loadedIngredients = [];
          for (const key in responseData){
            loadedIngredients.push({
              id: key,
              title: responseData[key].title,
              amount: responseData[key].amount
            })
          }
          //setIngredients(loadedIngredients);
          onLoadIngredients(loadedIngredients);
        });
      }
      return () => {
        clearTimeout(timer);
      }
    }, 500);
  }, [enteredFilter, onLoadIngredients])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
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