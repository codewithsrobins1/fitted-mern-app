import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Auth from './components/Auth/Auth';

const App = () => {
    return(
        <BrowserRouter>
            <Container maxwidth='lg'>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Homepage} />
                    <Route path='/auth' exact component={Auth} />
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App;