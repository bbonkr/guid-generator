import React, { useState } from 'react';
import { Button, Box, Grid, Paper, Typography, Input, FormControlLabel, Checkbox } from '@material-ui/core';
import { FileCopy as FileCopyIcon } from '@material-ui/icons';
import uuidv4 from 'uuid/v4';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useStyles } from './styles';

export const Generator = () => {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const [uppercase, setUppercase] = useState(true);
    const [hasBraces, setHasBraces] = useState(true);
    const [hasHyphens, setHasHyphens] = useState(true);

    const handleInputchange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();

        switch (event.target.name) {
            case 'uppercase':
                setUppercase(event.target.checked);
                break;
            case 'braces':
                setHasBraces(event.target.checked);
                break;
            case 'hyphens':
                setHasHyphens(event.target.checked);
                break;
            default:
                break;
        }
    };

    const handleclickGenerate = () => {
        let guid: string = uuidv4();

        if (uppercase) {
            guid = guid.toUpperCase();
        }

        if (hasBraces) {
            guid = `{${guid}}`;
        }

        if (!hasHyphens) {
            guid = guid.replace(/-/gi, '');
        }

        console.info('new value: ', guid);

        setValue(guid);
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item lg={3} md={3} xs={12}></Grid>
                <Grid item lg={6} md={6} xs={12}>
                    <Box className={classes.paper}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={uppercase}
                                    name="uppercase"
                                    value="uppercase"
                                    onChange={handleInputchange}
                                />
                            }
                            label="Uppercase"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={hasBraces}
                                    name="braces"
                                    value="braces"
                                    onChange={handleInputchange}
                                />
                            }
                            label="Braces"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={hasHyphens}
                                    name="hyphens"
                                    value="hyphens"
                                    onChange={handleInputchange}
                                />
                            }
                            label="Hyphens"
                        />
                    </Box>
                </Grid>
                <Grid item lg={3} md={3} xs={12}></Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item lg={3} md={3} xs={12}></Grid>
                <Grid item lg={6} md={6} xs={12}>
                    <Box className={classes.paper}>
                        <Input
                            value={value}
                            endAdornment={
                                <CopyToClipboard text={value}>
                                    <Button disabled={!value}>
                                        <FileCopyIcon titleAccess="Copy to clipboard" />
                                    </Button>
                                </CopyToClipboard>
                            }
                            inputProps={{ style: { textAlign: 'center' } }}
                            fullWidth
                            disabled
                        />
                    </Box>
                </Grid>
                <Grid item lg={3} md={3} xs={12}></Grid>
                <Grid item xs={12}>
                    <Box className={classes.paper}>
                        <Button variant="contained" color="primary" onClick={handleclickGenerate}>
                            Generate
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};
