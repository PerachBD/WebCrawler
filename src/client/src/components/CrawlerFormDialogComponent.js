import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const CrawlerFormDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
       New scrape job
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New scrape job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new scrape job, please enter scrape job parameters.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="Please enter the URL to start scraping from:"
            type="email"
            fullWidth
            autoComplete="off"
          />
           <TextField
            autoFocus
            margin="dense"
            id="maxDepth"
            label="Please enter the maximum depth to crawl down to from the start url:"
            type="email"
            fullWidth
            autoComplete="off"
          />
          <TextField
            autoFocus
            margin="dense"
            id="maxTotalPages"
            label="Please enter the max number of pages for the entire scrape job:"
            type="email"
            fullWidth
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Execute
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}