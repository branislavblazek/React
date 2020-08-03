import React, { useReducer, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const IngredientReducer = (currentIngredients, action) => {
  switch(action.type) 
  {
    case 'SET':
      return action.ingredients
    case 'ADD':
      return [...currentIngredients, action.ingredients]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default: 
      throw new Error('What are u doing here !?');
  }
}

const httpReducer = (curHttpState, action) => {
  switch(action.type)
  {
    case 'SEND':
      return {loading: true, error: null};
    case 'RESPONSE':
      return {...curHttpState, loading: false};
    case 'ERROR':
      return {loading: false, error: action.message};
    case 'CLEAR':
      return {...curHttpState, error: null};
    default:
      throw new Error('What are u doing here !?');
  }
}

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(IngredientReducer, []);
  //const [ingredients, setIngredients] = useState([]);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {loading: false, error: null});
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const filteredIngredientsHandler = useCallback(filtered => {
    //setIngredients(filtered);
    dispatch({type: 'SET', ingredients: filtered});
  }, []);

  const addIngredientHandler = ingredient => {
    dispatchHttp({type: 'SEND'});
    fetch('https://react-burger-app-6d0c1.firebaseio.com/ingredients_obj.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      dispatchHttp({type: 'RESPONSE'});
      return response.json();
    }).then(responseData => {
      // setIngredients(prevIngredients => [
      //   ...prevIngredients, 
      //   {id: responseData.name, ...ingredient}
      // ]);
      dispatch({type: 'ADD', ingredients: {id: responseData.name, ...ingredient}})
    })
  };

  const removeIngredientHandler = id => {
    dispatchHttp({type: 'SEND'});
    fetch(`https://react-burger-app-6d0c1.firebaseio.com/ingredients_obj/${id}.json`, {
      method: 'DELETE',
    }).then(response => {
      dispatchHttp({type: 'RESPONSE'});
      // setIngredients(prevIngredients => 
      //   prevIngredients.filter(item => item.id !== id)
      // );
      dispatch({type: 'DELETE', id: id});
    }).catch(err => {
      dispatchHttp({type: 'ERROR', message: err.message})
    });
  };

  const clearError = () => {
    dispatchHttp({type: 'CLEAR'});
  }

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}

      <IngredientForm 
        onIngredientHandler={addIngredientHandler} 
        loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
