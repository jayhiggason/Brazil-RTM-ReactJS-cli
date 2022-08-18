/**
 *
 * DataGlossaryFilter
 *
 */

import React, {memo, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import QueueIcon from '@material-ui/icons/Queue';
import RemoveFromQueueIcon from '@material-ui/icons/RemoveFromQueue';
import {mdiFilter, mdiFilterRemove} from '@mdi/js';
import Icon from "@mdi/react";
import clsx from "clsx";
// import ListItemIcon from "@material-ui/core/ListItemIcon";

/** Styles class*/
const useStyles = makeStyles(() => ({
    paperStyle: {
        width: '100%',
        minHeight: "80vh"
    },
    glossaryItemHead: {
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Bold',
    },
    glossaryItems: {
        fontSize: '0.8vw',
        fontFamily: 'MarsCentra-Book',
        cursor: "pointer",
        padding: "0.3vw"
    },
    iconSize: {
        fontSize: "1vw",
    },
    button: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.6vw',
    },
    selectedItems: {
        color: "#107d7a",
    }
}));


const GlossaryItem = ({items, handleClickGlossary, selectedFilter, handleClickAlphabets}) => {

    const classes = useStyles();

    const [filteredItems, setFilteredItems] = useState([]);

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setFilteredItems(items.filter((x, index) => index <= 1));
    }, [items]);

    const handleMore = () => {
        setFilteredItems(items);
        setExpanded(prevState => !prevState);
    };

    const handleLess = () => {
        setFilteredItems(items.filter((x, index) => index <= 1));
        setExpanded(prevState => !prevState);
    };

    const onClickItem = (item) => {
        handleClickAlphabets([]);
        if (selectedFilter.indexOf(item) > -1) {
            handleClickGlossary(selectedFilter.filter(i => i !== item));
        } else {
            handleClickGlossary([...selectedFilter, item]);
        }
    };


    return (
        <Grid container item justify={"center"} alignItems={"center"} style={{padding: "1vw"}}>
            <Grid item zeroMinWidth container justify={"flex-start"} alignItems={"center"}>
                <Grid item xs={12}>
                    <Typography noWrap className={classes.glossaryItemHead}>
                        {
                            items[0][0]
                        }
                    </Typography>
                </Grid>

                {
                    filteredItems.map((words) => {
                        return (
                            <Grid item xs={12} onClick={() => onClickItem(words)}>
                                <Typography noWrap
                                            className={clsx(classes.glossaryItems, {[classes.selectedItems]: selectedFilter.indexOf(words) > -1})}>
                                    {words}
                                </Typography>
                            </Grid>
                        )
                    })
                }
            </Grid>
            <Grid item container justify={"flex-end"} alignItems={"center"}>
                {
                    (() => {
                        if (items.length > 2) {
                            return (
                                <>
                                    {
                                        !expanded && <Button size={"small"}
                                                             className={classes.button}
                                                             startIcon={<QueueIcon/>}
                                                             onClick={handleMore}
                                        >
                                            Show More...
                                        </Button>
                                    }
                                    {
                                        expanded && <Button size={"small"}
                                                            className={classes.button}
                                                            startIcon={<RemoveFromQueueIcon/>}
                                                            onClick={handleLess}
                                        >
                                            Show Less...
                                        </Button>
                                    }
                                </>
                            )
                        }
                    })()
                }

            </Grid>
        </Grid>
    )
};

/** DataGlossaryFilter function is used to render the filter for the data glossary that is used across the tool which will be available under help menu in the top tool bar of the tool */

function DataGlossaryFilter({data, handleClickGlossary, selectedFilter, handleClickAlphabets, selectedAlphabets}) {
    const classes = useStyles();
    const removeFilter = () => {
        handleClickGlossary([]);
        handleClickAlphabets([]);
    };
    return (
        <Grid container justify={"center"} alignItems={"center"}>
            <Paper className={classes.paperStyle} elevation={2}>
                <Grid container justify={"center"} alignItems={"center"}>

                    <Grid container justify={"flex-end"} alignItems={"center"} style={{padding: "1vw"}}>
                        {
                            (() => {
                                if (selectedFilter.length === 0 && selectedAlphabets.length === 0) {
                                    return (
                                        <Icon
                                            path={mdiFilter}
                                            size={0.8}
                                        />
                                    );
                                } else {
                                    return (
                                        <Icon
                                            onClick={removeFilter}
                                            path={mdiFilterRemove}
                                            size={0.8}
                                        />
                                    );
                                }
                            })()
                        }

                    </Grid>
                    {
                        data.map((item) => {
                            return (<GlossaryItem items={item} handleClickGlossary={handleClickGlossary}
                                                  selectedFilter={selectedFilter}
                                                  handleClickAlphabets={handleClickAlphabets}/>);
                        })
                    }

                </Grid>

            </Paper>
        </Grid>
    );
}

DataGlossaryFilter.propTypes = {};

export default memo(DataGlossaryFilter);
