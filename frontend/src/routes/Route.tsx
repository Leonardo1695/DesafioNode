import React from 'react';
import { Route as ReactDOMRoute, RouteProps as ReactDOMRouteProps, Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      { ...rest }
      render={({ location }) => {
        return !isPrivate || isPrivate && !!user ? (
          <Component />
        ) : (
          <Navigate
            to={{
              pathname: '/login',
            }}
            state={location}
          />
        );
      }}
    />
  );
}

export default Route;
