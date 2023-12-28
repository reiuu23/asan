import {useReducer} from 'react';
import axios from 'axios';

// Initial State for the useReducer

const initialState = {
  data: {},
  error: null,
  loading: false,
};

// Reducer function for API Request

const reducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST_START':
      return {...state, loading: true, error: null};
    case 'REQUEST_SUCCESS':
      return {...state, loading: false, data: action.payload};
    case 'REQUEST_FAILURE':
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

// useFetch Custom Hook

const useFetch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async (
    apiEndpoint,
    method = 'get',
    body = null,
    headers = {},
  ) => {
    const apiURL = 'https://litterapp.sseoll.com/api' + apiEndpoint;

    dispatch({type: 'REQUEST_START'});

    console.log(apiURL);

    try {
      const response = await axios({
        url: apiURL,
        method,
        data: body,
        headers: headers,
      });
      dispatch({type: 'REQUEST_SUCCESS', payload: response.data});
    } catch (error) {
      dispatch({type: 'REQUEST_FAILURE', payload: error});
    }
  };

  return {...state, fetchData};
};

export default useFetch;
