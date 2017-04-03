import React, { Component } from 'react';
import { Link } from 'react-router';
import Moment from 'react-moment';
import { connect } from 'react-redux';

class Commits extends Component {
  showCommits(commitsForRepo) {
    const anchorStyle = { textDecoration: 'none' };
    const headerStyle = { margin: '16px 0 0 0', color: '#3F51B5' };

    return commitsForRepo.data.map((commit, i) => {
      const timeStyle = { float: 'right', fontStyle: 'italic' };
      const listItemStyle = {};
      if (i > 0) {
        timeStyle.marginTop = 16;
        listItemStyle.borderTop = '1px solid #BDBDBD';
      }

      return (
        <li
          key={commit.commit.url}
          style={listItemStyle}>
          <span style={timeStyle}>
            <Moment fromNow>{commit.commit.author.date}</Moment>
          </span>
          <Link to={`/author/${commit.author.login}`} style={anchorStyle} href="#">
            <h4 style={headerStyle}>{commit.author.login}:</h4>
          </Link>
          <p>{commit.commit.message}</p>
        </li>
      );
    });
  }

  render() {
    let commitsForRepo;
    if (this.props.commits) {
      commitsForRepo = this.props.commits.find(comm =>
        comm.id === this.props.favoriteId
      );
    }

    if (!commitsForRepo) return <div>Loading...</div>;

    const style = { listStyle: 'none', padding: '0 15px' };

    return (
      <ul style={style}>
        {::this.showCommits(commitsForRepo)}
      </ul>
    );
  }
}

Commits.propTypes = {
  commits: React.PropTypes.array,
  favoriteId: React.PropTypes.number
};


export default connect(({ commits }) => ({ commits }))(Commits);
