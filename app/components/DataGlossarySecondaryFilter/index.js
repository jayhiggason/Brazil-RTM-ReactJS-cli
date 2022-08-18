/**
 *
 * DataGlossarySecondaryFilter
 *
 */

import React, {memo} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";


/** Styles class*/
const useStyles = makeStyles(theme => ({
    paperStyle: {
        width: '100%',
        backgroundColor: "#e6e6e6"
    },
    glossaryItemHead: {
        fontSize: '1.2vw',
        fontFamily: 'MarsCentra-Bold',
        padding: "0.5vw 1.5vw",
        cursor: "pointer",
    },
    mainGridStyle: {
        paddingTop: "0.6vw"
    },
    selectedFilter: {
        color: "#107d7a",
    }
}));

/** DataGlossarySecondaryFilter function is used to render the secondary filter for the data glossary that is used across the tool which will be available under help menu in the top tool bar of the tool */

function DataGlossarySecondaryFilter({handleClickAlphabets, selectedAlphabets, handleClickGlossary}) {

    const classes = useStyles();

    // const alphabetArray = ['AC', 'D-F', 'G-I', 'J-L', 'M-O', 'P-R', 'S-U', 'V-Z'];
    const alphabetArray = [
        {name: 'A-C', items: ['A', 'B', 'C']},
        {name: 'D-F', items: ['D', 'E', 'F']},
        {name: 'G-I', items: ['G', 'H', 'I'],},
        {name: 'J-L', items: ['J', 'K', 'L'],},
        {name: 'M-O', items: ['M', 'N', 'O'],},
        {name: 'P-R', items: ['P', 'Q', 'R'],},
        {name: 'S-U', items: ['S', 'T', 'U'],},
        {name: 'V-Z', items: ['V', 'W', 'X', 'Y', 'Z'],},
    ];

    const handleClickFilter = (values) => {
        handleClickGlossary([]);
        if (selectedAlphabets.length === values.length && selectedAlphabets.every((value, index) => value === values[index])) {
            handleClickAlphabets([]);
        } else {
            handleClickAlphabets(values);
        }
    };

    return (
        <Grid container justif={"center"} alignItems={"center"} className={classes.mainGridStyle}>
            <Paper className={classes.paperStyle} elevation={2}>
                <Grid container justify={"space-around"} alignItems={"center"}>
                    {
                        alphabetArray.sort().map(item => (
                            <Typography noWrap className={clsx(classes.glossaryItemHead, {
                                [classes.selectedFilter]: selectedAlphabets.length === item.items.length && selectedAlphabets.every((value, index) => value === item.items[index])
                            })}
                                        onClick={() => handleClickFilter(item.items)}>
                                {item.name}
                            </Typography>
                        ))
                    }
                </Grid>

            </Paper>
        </Grid>
    );
}

DataGlossarySecondaryFilter.propTypes = {};

export default memo(DataGlossarySecondaryFilter);
