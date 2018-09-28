import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MainInput extends Component {
  onChange = e => {
    if (e.key === 'Enter' && e.target.value) {
      this.props.onDataChange({ todo: e.target.value, id: `${e.target.value}${Math.random()}` });
      e.target.value = '';
    }
  };

  render() {
    return (
      <input type="text"
             placeholder="Create todo"
             onKeyUp={this.onChange} />
    )
  }
}

MainInput.protoTypes = {
  onDataChange: PropTypes.func
};

export default MainInput;