import React, {Component} from "react";
import {connect} from 'react-redux';
import {Message, Button} from "semantic-ui-react";

class ShowMessage extends Component {
  constructor(props) {
      super(props);

      this.update = this.update.bind(this);
      this.close = this.close.bind(this);
    }

  update() {
    window.location.reload();
    this.props.updateStatus(true);
  }
  
  close() {
    this.props.updateStatus(false);
  }

  render() {
    const s ={
      position: "fixed",
      zIndex:"99"
    }
    return(
      <Message style={s} color='blue'>
        New Content available
        <Button onClick={this.update}>Update
        </Button>
        <Button onClick={this.close}>Forget it
        </Button>
      </Message>
    )
  }
}

ShowMessage.defaultProps = {
  updateStatus: []
}

export default ShowMessage;