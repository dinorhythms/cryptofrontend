import React from 'react';
import { Route } from 'react-router-dom';
import PublicLayout from '../utils/PublicLayout';

const PublicRoute = ({ exact, path, component: Component }) => {
  return (
    <PublicLayout>
      <Route path={path} component={Component} />
    </PublicLayout>
  );
}

export default PublicRoute;
