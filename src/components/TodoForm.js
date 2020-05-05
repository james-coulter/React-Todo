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
      localStorage.setItem("list", JSON.stringify(this.list));
      localStorage.setItem("newItem", "");
  }

  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });

    // update localStorage
    localStorage.setItem(key, value);
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