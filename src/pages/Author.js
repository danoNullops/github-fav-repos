import React, { Component } from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { getAuthorInfo } from '../actions';

class Author extends Component {
  componentDidMount() {
    const { author, params } = this.props;
    if (!author.login || author.login !== params.user) {
      this.props.dispatch(getAuthorInfo(params.user));
    }
  }

  showAuthorDetails() {
    const { author, params } = this.props;
    if (!author.login || author.login !== params.user) {
      return <div>Loading...</div>;
    }

    const { login, name, bio, followers } = author;
    const avatarUrl = author.avatar_url;
    const createdAt = author.created_at;
    const style = { fontWeight: 'bold', width: 100 };

    return (
      <Card>
        <CardHeader
          title={name}
          subtitle={login}
          avatar={avatarUrl}
        />
        <CardText>
          <table>
            <tbody>
              <tr>
                <td style={style}>Bio</td>
                <td>{bio || 'No bio'}</td>
              </tr>
              <tr>
                <td style={style}>Followers</td>
                <td>{followers || 0}</td>
              </tr>
              <tr>
                <td style={style}>Created</td>
                <td><Moment fromNow>{createdAt}</Moment></td>
              </tr>
            </tbody>
          </table>
        </CardText>
      </Card>
    );
  }

  render() {
    const style = { margin: '10px 0' };

    return (
      <div>
        <Link to="/">
          <RaisedButton label="Back" primary style={style} />
        </Link>
        {::this.showAuthorDetails()}
      </div>
    );
  }
}

Author.propTypes = {
  params: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  author: React.PropTypes.object
};

export default connect(({ author }) => ({ author }))(Author);
