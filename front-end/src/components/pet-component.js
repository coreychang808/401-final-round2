import React from 'react';
import {connect} from 'react-redux';
// import superagent from 'superagent';
import './pet.css';

class Pets extends React.Component {
  constructor(props){
    super (props);

    this.state = {
      pets: {},
      nameInput: '',
      toyInput: '',
    };
  }

  componentDidMount() {
    fetch('http://localhost:4000/toys')
      .then(res => res.json())
      .then(data => this.setState({ pets: data }));
  }

  handleDelete = (event, _id) => {
    event.preventDefault();
    fetch('http://localhost:4000/toys', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id }),
    }).then(res => res.json())
      .then(data => this.setState({ pets: data }));
  }


  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }


  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    fetch('http://localhost:4000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.nameInput, favoriteToy: this.state.toyInput }),
    })
      .then(response => response.json())
      .then(data => this.setState((prevState) => {
        return { pets: {...prevState.pets, data} }
      }));
  }
  render() {
    console.log(this.state.pets)
    return (
      <>
      <div className="all">
      <h1>Favorite Toys</h1>
        {Object.keys(this.state.pets).map((keyName, i) => (
        <div key={i}>
            <p>{this.state.pets[keyName].name} -- {this.state.pets[keyName].favoriteToy} 
            <button onClick={(event) => this.handleDelete(event, this.state.pets._id)}>Delete</button></p>
        </div>
          )
        )}
     

      <form onSubmit = {this.handleSubmit}>
        <input
            placeholder="name"
            name="nameInput"
            value={this.state.nameInput}
            onChange={this.handleChange}
          />
        <input
            placeholder="favoriteToy"
            name="toyInput"
            value={this.state.toyInput}
            onChange={this.handleChange}
          />
        < button type='submit'>Add</button>
      </form>
      </div>
    </>);
    }
}

const mapStateToProps = (state) => ({
    pets: state.pets,
  });

const mapDispatchToProps = (dispatch) => ({
  loadStore : (pets) => {
    dispatch({
      type: 'SCORE_LOAD',
      payload: pets,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Pets);