import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

import Favorites from '../containers/Favorites';
import { searchGithub } from '../actions';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  handleTermUpdate(e) {
    this.setState({ term: e.target.value });
  }

  handleSearchSubmit(e) {
    e.preventDefault();

    this.props.dispatch(searchGithub(this.state.term));
    this.setState({ term: '' });
  }

  render() {
    const formStyle = { margin: 'auto', textAlign: 'center' };
    const btnStyle = { marginLeft: 10, verticalAlign: '20%' };
    const floatingLabelStyle = {
      color: '#616161',
      fontSize: 18
    };
    const floatingLabelFocusStyle = { color: 'rgb(0, 188, 212)' };

    return (
      <div>
        <form onSubmit={::this.handleSearchSubmit} style={formStyle}>
          <TextField
            floatingLabelText="Add Repo to Favorites"
            floatingLabelStyle={floatingLabelStyle}
            floatingLabelFocusStyle={floatingLabelFocusStyle}
            onChange={::this.handleTermUpdate}
            value={this.state.term}
          />
          <RaisedButton type="Submit" label="Add" primary style={btnStyle} />
        </form>
        <Favorites />
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: React.PropTypes.func
};


export default connect()(HomePage);
