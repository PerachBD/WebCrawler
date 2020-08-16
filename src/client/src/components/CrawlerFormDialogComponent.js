import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

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