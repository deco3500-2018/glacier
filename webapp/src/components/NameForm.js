import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class NameForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'hllo',
            isSubmitted: false
        };
    }
  
    handleChange = (event) => {
        this.setState({user: event.target.value, ...this.state});
    }
  
    handleSubmit = (event) => {
        //alert('A name was submitted: ' + this.state.user);
        event.preventDefault();
        this.setState({...this.state, isSubmitted: true})
        console.log("state", this.state);
        
    }
  
    render() {
        const isSub = this.state.isSubmitted
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                Name:
                <input type="text" value={this.state.user} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            { isSub && (
                <Redirect to={'/list'}/>
            )}
        </div>
        );
    }
}
  
export default NameForm;
