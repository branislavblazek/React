import React, { useReducer, useCallback, useMemo, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

const IngredientReducer = (currentIngredients, action) => {
  switch(action.type) 
  {
    case 'SET':
      //console.log('SET_ING_RED', action.ingredients);
      return action.ingredients
    case 'ADD':
      //console.log('ADD_ING_RED', action.ingredients, currentIngredients);
      return [...currentIngredients, action.ingredients]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default: 
      throw new Error('What are u doing here !?');
  }
}


const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(IngredientReducer, []);
  const {
    isLoading, 
    data, 
    error, 
    sendRequest, 
    reqExtra, 
    reqIdentifier,
    clear
  } = useHttp();
  //const [ingredients, setIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === 'DELETE_INGREDIENT')
    {
      dispatch({
        type: 'DELETE', 
        id: reqExtra
      });
    } 
    else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT') {
      dispatch({
        type: 'ADD',
        ingredients: {id: data.name, ...reqExtra}
      });
      //console.log('ADD ingredient dispatch successful')
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error])

  const filteredIngredientsHandler = useCallback(filtered => {
    //setIngredients(filtered);
    dispatch({type: 'SET', ingredients: filtered});
  }, []);

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest(
      'https://react-burger-app-6d0c1.firebaseio.com/ingredients_obj.json', 
      'POST', 
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    );
  }, [sendRequest]);

  const deleteIngredientHandler = useCallback(id => {
    sendRequest(
      `https://react-burger-app-6d0c1.firebaseio.com/ingredients_obj/${id}.json`, 
      'DELETE', 
      null, 
      id,
      'DELETE_INGREDIENT'
    );
  }, [sendRequest]);

  const ingredientList = useMemo(() => {
    //console.log(ingredients);
    return (
      <IngredientList 
        ingredients={ingredients} 
        onRemoveItem={deleteIngredientHandler} />
    );
  }, [ingredients, deleteIngredientHandler])

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <IngredientForm 
        onIngredientHandler={addIngredientHandler} 
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
