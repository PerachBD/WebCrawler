import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function JobSelectedDialog(props) {

    let { open, handleBack, handleClose, selectedValue, childSelected } = props;

    if (!selectedValue) {
        return <div></div>;
    }

    let job = selectedValue;
    let title = job["title"];
    let depth = job["depth"];
    let url = job["url"]
    let childs = job["childs"]
    let childNum = childs.length;


    const childsButtons = []
    for (let child of childs) {
        childsButtons.push(<button onClick={() => childSelected(child)}>{child["url"]}</button>)
    }

    return (
        <div>
            <Dialog
                open={open}
                // onBack = {handleBack}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Result Data"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <h4>Title: </h4>{title}
                        <h4>Depth: </h4>{depth}
                        <h4>Url: </h4>{url}
                        <h4>Number of childs:</h4>{childNum}
                        <h4>Childs: </h4>
                        {childsButtons}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleBack()} color="primary" autoFocus>
                        Back
                    </Button>
                    <Button onClick={() => handleClose()} color="primary" autoFocus>
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
