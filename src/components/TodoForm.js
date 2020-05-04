import React from 'react';
import './Todo.css';

class TodoForm extends React.Component {
  constructor() {
    super()
    this.state = {
     name: ''
    }
  }

  handleChanges = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  submit = e => {
    e.preventDefault();
    this.props.addNewItem(this.state.name)
    this.setState({
        name: ''
      });
  }

  render() {
    return (
      <form onSubmit={this.submit}> 
        <input type="text" name="name" value={this.state.name} onChange={this.handleChanges} />    
        <button>Add</button>
      </form>
    );
  }
}

export default TodoForm;