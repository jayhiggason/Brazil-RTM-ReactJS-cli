/**
 *
 * DataGlossaryDetails
 *
 */

import React, {memo} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

/** Styles class*/
const useStyles = makeStyles(({
    paperStyle: {
        width: "100%",
        marginTop: "0.6vw"
    },
    wordStyle: {
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Bold',
    },
    synonymStyle: {
        fontSize: '0.8vw',
        fontFamily: 'MarsCentra-Book',
    },
    gridStyle: {
        minHeight: "5vw"
    },
    mainGridStyle: {
        paddingTop: "0.6vw"
    }
}));

const GlossaryItem = ({glossary, handleOpenDeleteDialog, handleOpenAddGlossary}) => {
    const classes = useStyles();
    return (
        <Grid item container justify={"center"} alignItems={"center"}>
            <Paper className={classes.paperStyle} elevation={3}>
                <Grid container justify={"flex-start"} alignItems={"center"} className={classes.gridStyle}>
                    <Grid item xs={2} justify={"center"} alignItems={"center"}>
                        <Typography align={"center"} className={classes.wordStyle}>
                            {glossary["glossary_word"]}
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography className={classes.synonymStyle}>
                            {glossary["glossary_definition"]}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} container justify={"flex-end"}
                          alignItems={"center"}>
                        <IconButton
                            onClick={() => handleOpenAddGlossary("edit", glossary)}
                        >
                            <EditIcon/>
                        </IconButton>
                        <IconButton
                            onClick={() => handleOpenDeleteDialog(glossary)}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>

    );

};

/** DataGlossaryDetails function is used to render the data glossary that is used across the tool which will be available under help menu in the top tool bar of the tool */

function DataGlossaryDetails({data, handleOpenDeleteDialog, handleOpenAddGlossary}) {
    const classes = useStyles();
    return (
        <Grid container justify={"center"} alignItems={"center"} className={classes.mainGridStyle}>
            {
                data.map(item => <GlossaryItem glossary={item}
                                               handleOpenDeleteDialog={handleOpenDeleteDialog}
                                               handleOpenAddGlossary={handleOpenAddGlossary}/>)
            }

        </Grid>

    );
}

DataGlossaryDetails.propTypes = {};

export default memo(DataGlossaryDetails);
