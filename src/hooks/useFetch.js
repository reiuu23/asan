import {useReducer, useEffect} from 'react';
import axios from 'axios';

// Action types specified in an object to prevent unwanted bugs in mistyped reducer function actions.
const ACTIONS = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return {...state, loading: true, error: null};
    case ACTIONS.FETCH_SUCCESS:
      return {...state, loading: false, data: action.payload};
    case ACTIONS.FETCH_FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

// Custom useFetch hook that can handle all Axios requests.
const useFetch = (url, options = {}) => {
  const initialState = {
    data: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({type: ACTIONS.FETCH_START});

      try {
        const response = await axios(url, options);
        const responseData = await response.data;

        dispatch({type: ACTIONS.FETCH_SUCCESS, payload: responseData});
      } catch (error) {
        dispatch({type: ACTIONS.FETCH_FAILURE, payload: error.message});
      }
    };

    fetchData();
  }, [url, options]);

  return state;
};

export default useFetch;
