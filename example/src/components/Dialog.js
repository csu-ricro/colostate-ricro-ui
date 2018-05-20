import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { Dialog } from 'colostate-ricro-ui';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: 8,
  },
});
const buttonStyle = {
  margin: '8px',
};

class DialogEx extends React.Component {
  state = {
    dialog: false,
  };

  updateState = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const dialogActions = [
      <Button onClick={this.updateState.bind(this, 'dialog', false)} color="primary" key={0}>
        Disagree
      </Button>,
      <Button
        onClick={this.updateState.bind(this, 'dialog', false)}
        color="primary"
        variant="raised"
        key={1}
      >
        Agree
      </Button>,
    ];
    return (
      <div>
        <Button
          style={buttonStyle}
          className={classes.defaultButton}
          onClick={this.updateState.bind(this, 'dialog', true)}
          variant="raised"
        >
          Open Dialog
        </Button>
        <Dialog
          title="Test Dialog Title"
          onClose={this.updateState.bind(this, 'dialog', false)}
          open={this.state.dialog}
          dialogActions={dialogActions}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel mattis enim. In
          elementum, ex nec aliquet tincidunt, eros libero laoreet ipsum, vitae elementum enim metus
          et ex. Fusce porta a ligula a sollicitudin. Etiam pretium magna ut elit sodales finibus.
          Integer tristique, nulla non vestibulum tempus, leo eros auctor magna, vitae finibus dolor
          diam eu diam. Sed ultrices neque et molestie congue. Sed pellentesque egestas dui. Ut
          consectetur nulla vel maximus elementum. Nunc metus massa, consectetur sit amet laoreet
          id, dignissim vitae nibh. Donec elit magna, tincidunt et mauris vel, sodales consequat
          sapien. Morbi gravida hendrerit metus id rhoncus. Nam molestie viverra erat quis rutrum.
          Mauris tellus velit, viverra quis massa a, interdum elementum ligula. Mauris et luctus
          magna. Donec maximus vitae libero vitae molestie. Duis eget dictum arcu, id viverra magna.
        </Dialog>
      </div>
    );
  }
}

DialogEx.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(DialogEx);