import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import fitted from './images/fitted-logo.png';

const App = () => {
    return(
        <Container maxwidth='lg'>
            <AppBar position="static" color="inherit">
                <Typography variant="h2" align="center">Fitted</Typography>
                <img src={fitted} alt="outfits" height="60" /> 
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;