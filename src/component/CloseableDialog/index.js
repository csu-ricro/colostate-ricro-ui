import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import IconClose from 'mdi-material-ui/Close';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles';

const CloseableDialog = ({
  children,
  classes,
  fullScreen,
  header = '',
  headerColor = 'primary',
  onClose,
  ...DialogProps
}) => {
  const id = `${header.replace(/ /g, '-').toLowerCase()}-header-dialog`;
  return (
    <Dialog
      classes={{ paper: classes.dialogRoot }}
      fullScreen={fullScreen}
      maxWidth="lg"
      onClose={onClose}
      fullWidth
      aria-labelledby={id}
      {...DialogProps}
    >
      <DialogTitle classes={{ root: classes.dialogTitleRoot }} disableTypography>
        <AppBar position="static" component="div" color={headerColor}>
          <Toolbar>
            <Typography id={id} variant="h5" color="inherit">
              {header}
            </Typography>
            <div className={classes.flex} />
            <Tooltip title={`Close ${header}`}>
              <IconButton onClick={onClose} color="inherit" aria-label={`Close ${header}`}>
                <IconClose />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </DialogTitle>
      {children}
    </Dialog>
  );
};

CloseableDialog.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object.isRequired, // MUI withStyles()
  fullScreen: PropTypes.bool.isRequired, // MUI withMobileDialog()
  header: PropTypes.string,
  headerColor: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default withMobileDialog()(withStyles(styles)(CloseableDialog));
