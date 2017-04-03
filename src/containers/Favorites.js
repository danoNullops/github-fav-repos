import React, { Component } from 'react';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Clear from 'material-ui/svg-icons/content/clear';

import Commits from './Commits';
import { removeFavorite } from '../actions';

function Title(props) {
  const style = {
    fontWeight: 'normal',
    fontSize: 16,
    marginLeft: 10
  };
  const iconStyle = {
    verticalAlign: 'sub'
  };

  return (
    <h3>
      {props.favorite.full_name}
      <span style={style}>
        <ActionGrade style={iconStyle} />
        {props.favorite.stargazers_count}
      </span>
    </h3>
  );
}

Title.propTypes = {
  favorite: React.PropTypes.object
};

class Favorites extends Component {
  handleClear(favoriteId) {
    this.props.dispatch(removeFavorite(favoriteId));
  }

  displayFavorites() {
    const { favorites } = this.props;

    if (!favorites.length) {
      return <div>Add your favorite repos with the field above!</div>;
    }

    const style = {
      margin: '10px 0',
      WebkitAppearance: 'inherit',
      border: '1px solid rgb(224, 224, 224)'
    };

    /* eslint react/jsx-no-bind: "off" */
    return favorites.map(favorite => (
      <ListItem
        key={favorite.id}
        style={style}
        rightIcon={<Clear onClick={this.handleClear.bind(this, favorite.id)} />}
        primaryText={<Title favorite={favorite} />}
        secondaryText={<Commits favoriteId={favorite.id} />}
      />
    ));
  }

  render() {
    return (
      <div>
        <List>
          {::this.displayFavorites()}
        </List>
      </div>
    );
  }
}

Favorites.propTypes = {
  dispatch: React.PropTypes.func,
  favorites: React.PropTypes.array
};


export default connect(({ favorites }) => ({ favorites }))(Favorites);
