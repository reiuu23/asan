import {useReducer} from 'react';

const initialState = {
  data: [],
  loading: true,
  error: null,
};

export default function useFetch() {
  const [state, dispatch] = useReducer(reducer, initialState);
}
