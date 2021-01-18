import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core';
import fitted from '../../images/fitted-logo.jpg';
import useStyles from './styles';


const Navbar = () => {
    const classes = useStyles();

    //Test User
    const user = null;

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Fitted</Typography>
                <img className={classes.image} src={fitted} alt="outfits" height="60" /> 
            </div>

            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imaegUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary">Logout</Button>
                    </div>
                )
                : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )
            }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;