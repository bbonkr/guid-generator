import React, { useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Button, Icon, Typography } from '@material-ui/core';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import ReactGA from 'react-ga';
import { useStyles } from './styles';

export const Header = () => {
    const classes = useStyles();

    useEffect(() => { 
        if (window) {
            ReactGA.pageview(window.location.pathname);
        }
    }, []);

    return (
        <AppBar position="static">
            <Toolbar>
                {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <Icon>menu</Icon>
                </IconButton> */}
                <Typography variant="h6" className={classes.title}>
                    GUID Generator
                </Typography>
                <Button color="inherit" href="https://github.com/bbonkr/guid-generator" target="_blank">
                    <GitHubIcon />
                </Button>
            </Toolbar>
        </AppBar>
    );
};
