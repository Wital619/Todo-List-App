import React, {Component} from 'react';
import TodoItem from './TodoItem'
import PropTypes from 'prop-types';

class TodoList extends Component {
  state = {
    todos: [
      {
        id: '1',
        todo: 'Помити посуду',
      },
      {
        id: '2',
        todo: 'Погладити кота',
      },
      {
        id: '3',
        todo: 'Зварити їсти',
      }
    ]
  };

  componentWillReceiveProps(nextProps) {
    this.addNewTodo(nextProps.newTodo);
  }

  render() {
    return (
      <ul>
        {this.state.todos.map(todoItem => <TodoItem todo={todoItem.todo} key={todoItem.id} />)}
      </ul>
    );
  }

  addNewTodo = nextProps => this.setState({
    todos: this.state.todos.concat([nextProps])
  });
}

TodoList.protTypes = {
  newTodo: PropTypes.object
};

export default TodoList;