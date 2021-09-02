import React from 'react';
import { Switch, Redirect } from 'react-router';
import PrivateRoute from '../PrivateRoute';
import Home from './Home';

const MainRoutes = () => {
    return (
        <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <Redirect from='*' to='/' />
        </Switch>
    );

}
export default MainRoutes;
