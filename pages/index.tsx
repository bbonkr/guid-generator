import React from 'react';
import Head from 'next/head';
import { Container } from '@material-ui/core';
import { Header } from '../components/Header';
import { Generator } from '../components/Generator';

const HomePage = () => {
    return (
        <>
            <Head>
                <title>GUID Generator</title>
            </Head>
            <Header />
            <Container maxWidth="lg">
                <Generator />
            </Container>
        </>
    );
};

export default HomePage;
