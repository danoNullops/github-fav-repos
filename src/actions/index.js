import axios from 'axios';

export const SEARCH_GITHUB_FAILURE = 'SEARCH_GITHUB_FAILURE';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const GET_COMMITS_SUCCESS = 'GET_COMMITS_SUCCESS';
export const GET_COMMITS_FAILURE = 'GET_COMMITS_FAILURE';
export const GET_AUTHOR_SUCCESS = 'GET_AUTHOR_SUCCESS';
export const GET_AUTHOR_FAILURE = 'GET_AUTHOR_FAILURE';

function fetchGithubRepo(term) {
  return axios.get(`https://api.github.com/search/repositories?q=${term}`);
}

function fetchGithubCommits(repo) {
  return axios.get(
    `https://api.github.com/repos/${repo.items[0].full_name}/commits?page=1&per_page=3`
  );
}

function fetchAuthorInfo(user) {
  return axios.get(`https://api.github.com/users/${user}`);
}

function addFavorite(payload) {
  return {
    type: ADD_FAVORITE,
    payload
  };
}

function getCommitsSuccess(payload, repo) {
  return {
    type: GET_COMMITS_SUCCESS,
    payload,
    repo
  };
}

function getCommitsFailure(error) {
  return {
    type: GET_COMMITS_FAILURE,
    error
  };
}

function getCommits(favorite) {
  return function getCommitsThunk(dispatch) {
    if (!favorite.items[0]) {
      return dispatch(getCommitsFailure(new Error('First item does not exist')));
    }
    return fetchGithubCommits(favorite)
      .then(res => {
        dispatch(getCommitsSuccess(res.data, favorite.items[0]));
      })
      .catch(err => {
        dispatch(getCommitsFailure(err));
      });
  };
}

function searchGithubFailure(error) {
  return {
    type: SEARCH_GITHUB_FAILURE,
    error
  };
}

export function searchGithub(term) {
  return function searchGithubThunk(dispatch) {
    return fetchGithubRepo(term)
      .then(res => {
        dispatch(addFavorite(res.data));
        dispatch(getCommits(res.data));
      })
      .catch(err => {
        dispatch(searchGithubFailure(err));
      });
  };
}

export function removeFavorite(id) {
  return {
    type: REMOVE_FAVORITE,
    id
  };
}

function getAuthorInfoSuccess(payload) {
  return {
    type: GET_AUTHOR_SUCCESS,
    payload
  };
}

function getAuthorInfoFailure(error) {
  return {
    type: GET_AUTHOR_FAILURE,
    error
  };
}

export function getAuthorInfo(user) {
  return function getAuthorInfoThunk(dispatch) {
    return fetchAuthorInfo(user)
      .then(res => {
        dispatch(getAuthorInfoSuccess(res.data));
      })
      .catch(err => {
        dispatch(getAuthorInfoFailure(err));
      });
  };
}
