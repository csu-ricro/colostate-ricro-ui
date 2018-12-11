import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import createMuiComponentLink from '../../utils/createMuiComponentLink';
import getErrorObject from './getErrorObject';
import styles from './styles';

const HttpError = props => {
  const { classes, code, config, linkedButton, subheader } = props;
  const error = getErrorObject({ classes, code, config, linkedButton, subheader });
  return (
    <div className={classes.root}>
      <div className={classes.errorContainer}>
        <Typography variant="h1" className={classes.pulse}>
          {error.code}
        </Typography>
        <Typography variant="h3" className={classes.title}>
          {error.title}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" className={classes.subheader}>
          {error.subheader}
        </Typography>
      </div>
      <div className={classes.errorContainer}>
        {Array.isArray(error.linkedButton)
          ? error.linkedButton.map(button => (
              <Button
                key={_.camelCase(button.title)}
                className={classes.button}
                variant="contained"
                color="primary"
                size="large"
                {...button.buttonProps}
                {...createMuiComponentLink(button)}
              >
                {button.icon}
                {button.title}
              </Button>
            ))
          : error.linkedButton}
      </div>
    </div>
  );
};

HttpError.propTypes = {
  classes: PropTypes.object.isRequired,
  code: PropTypes.oneOf([401, 403, 404, 500]),
  config: PropTypes.object.isRequired, // redux state
  linkedButton: PropTypes.object,
  subheader: PropTypes.node,
};

export default withStyles(styles)(HttpError);
