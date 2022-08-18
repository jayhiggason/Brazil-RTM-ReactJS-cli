/**
 *
 * SearchBar
 *
 */

import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import {makeStyles} from "@material-ui/core/styles";

/** Styles class*/
const useStyles = makeStyles(theme => ({
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        fontSize: '1vw',
        [theme.breakpoints.down("xs")]: {
            fontSize: "12px"
        },
        fontFamily: "MarsCentra-Book",
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {},
        },
    },
    search: {
        fontSize: '1vw',
        [theme.breakpoints.down("xs")]: {
            fontSize: "12px"
        },
        fontFamily: "MarsCentra-Book",
        height: "2vw",
        position: 'relative',
        borderRadius: '6px',
        border: '1px solid rgba(0,0,0,0.09)',
        backgroundColor: '#fafafa',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.06)',
        },
        color: '#000',
        width: '200px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },

    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

/** SearchBar function is used to render the search bar that can be used across the tool */


function SearchBar() {
    const classes = useStyles();
    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon style={{fontSize: "1.5vw"}}/>
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{'aria-label': 'search'}}
            />
        </div>
    );
}

SearchBar.propTypes = {};

export default SearchBar;
