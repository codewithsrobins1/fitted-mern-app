import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import fitted from '../../images/fitted-logo.jpg';
import useStyles from './styles';
import decode from 'jwt-decode';


const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));  //Get user from localstorage
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();                                                 //access login change for setting the user

    useEffect(() => {
        const token = user?.token;

        //Log user out if token has expired
        if(token){
            const decodedToken = decode(token); 
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])  //update when the location changes

    const logout = () => {
        dispatch({
            type: 'LOGOUT',
        })
        history.push('/');
        setUser(null);
    }

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
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
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