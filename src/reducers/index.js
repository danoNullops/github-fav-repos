import * as type from '../actions';

const initialState = {
  favorites: [],
  commits: [],
  author: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case type.ADD_FAVORITE: {
      const found = state.favorites.find(
        fav => fav.id === action.payload.items[0].id
      );
      if (found) return state;

      return {
        ...state,
        favorites: [
          ...state.favorites,
          action.payload.items[0]
        ]
      };
    }

    case type.SEARCH_GITHUB_FAILURE: {
      return state;
    }

    case type.REMOVE_FAVORITE: {
      const favIndex = state.favorites.findIndex(fav => fav.id === action.id);
      if (favIndex === -1) return state;
      const commitIndex = state.commits.findIndex(comm => comm.id === action.id);

      return {
        ...state,
        favorites: [
          ...state.favorites.slice(0, favIndex),
          ...state.favorites.slice(favIndex + 1)
        ],
        commits: [
          ...state.commits.slice(0, commitIndex),
          ...state.commits.slice(commitIndex + 1)
        ]
      };
    }

    case type.GET_COMMITS_SUCCESS: {
      return {
        ...state,
        commits: [
          ...state.commits,
          { id: action.repo.id, data: action.payload }
        ]
      };
    }

    case type.GET_AUTHOR_SUCCESS: {
      return {
        ...state,
        author: action.payload
      };
    }

    case type.GET_AUTHOR_FAILURE: {
      return state;
    }

    default: {
      return state;
    }
  }
}
