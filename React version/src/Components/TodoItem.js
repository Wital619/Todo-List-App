import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  render() {
    return (
      <li>{this.props.todo}</li>
    )
  }
}

TodoItem.protTypes = {
  todo: PropTypes.object
};

export default TodoItem;