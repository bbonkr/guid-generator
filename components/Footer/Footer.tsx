import React from 'react';
import { Divider } from '@material-ui/core';
import { useStyles } from './styles';

export const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <span>guid.bbon.me</span> <Divider orientation="vertical" />
            <span>build by</span>{' '}
            <a href="https://nextjs.org/" target="_blank">
                NEXT.JS
            </a>{' '}
            <Divider orientation="vertical" />
            <span>host on</span>{' '}
            <a href="https://www.netlify.com/" target="_blank">
                Netlify.com
            </a>
        </div>
    );
};
