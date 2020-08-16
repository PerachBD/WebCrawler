import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CrawlerFormComponent from './CrawlerFormComponent';

export const CrawlerFormDialog = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFormSubmit = (event) => {
    // console.log(event);
    setOpen(false);
    props.onRequest(event);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
       New scrape job
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <CrawlerFormComponent onRequest={onFormSubmit} />
        
      </Dialog>
    </div>
  );
}