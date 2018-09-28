import React, { Component } from 'react';
import MainInput from './MainInput';
import TodoList from './TodoList';

class App extends Component {
  state = {
    inputData: ''
  };

  render() {
    return (
      <div>
        <MainInput onDataChange={this.handleDataChange}/>
        <TodoList newTodo={this.state.inputData}/>
      </div>
    )
  }

  handleDataChange = data => this.setState({
    inputData: data
  });
}



export default App;
