import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AUTH_CANCEL } from '../../store/types/authTypes';

export default function Signout({history}) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: AUTH_CANCEL});
    history.push('login');
  }, [dispatch, history])

  return <div/>
}
