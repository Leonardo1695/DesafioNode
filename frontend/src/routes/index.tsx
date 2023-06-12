import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/login';
import Home from '../pages/home';
const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact isPrivate component={Home} />
        <Route path="/home" component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/cart" component={Cart} />
        <Route path="/orderview/:id" component={Orderview} />
        <Route path="/users" isPrivate component={UserList} />
        <Route path="/users/new" isPrivate component={UserRegister} />
        <Route path="/users/:id" isPrivate component={UserRegister} />
        <Route path="*" component={NotFound} />
    </Switch>
);

export default Routes;
