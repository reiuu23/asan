// import React, {useReducer, useEffect} from 'react';

// // Initial State for the useReducer
// const initialState = {
//   data: null,
//   error: null,
//   loading: false,
// };

// // Reducer function for API Request
// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'REQUEST_START':
//       return {...state, loading: true, error: null};
//     case 'REQUEST_SUCCESS':
//       return {...state, loading: false, data: action.payload, error: null};
//     case 'REQUEST_FAILURE':
//       return {...state, loading: false, error: action.payload};
//     default:
//       return state;
//   }
// };

// // useFetch Custom Hook
// const useFetch = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const fetchData = async (apiEndpoint, content) => {
//     dispatch({type: 'REQUEST_START'});
//     try {
//       const response = await fetch(apiEndpoint, content); // Make sure to provide the full URL
//       const json = await response.json();
//       dispatch({type: 'REQUEST_SUCCESS', payload: json});
//     } catch (error) {
//       dispatch({type: 'REQUEST_FAILURE', payload: error});
//     }
//   };

//   return {...state, fetchData};
// };

// export default useFetch;

import {useState} from 'react';

const useCustomFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (url, options = {}) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return {data, error, loading, fetchData};
};

export default useCustomFetch;
