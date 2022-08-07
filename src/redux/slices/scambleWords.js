import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

import { WORDS } from '../words';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  gameData: {},
  isGameStarted: false,
  isGamePaused: false,
  showNextLevel: false,
  isAllWordsFound: false,
  score: 0,
  level: 0,
  bonusScore: 2000,
  dropArea: [],
  error: { exist: 'Already Found', invalid: 'Not a word' },
  fetchedData: WORDS,
};

const slice = createSlice({
  name: 'scambleWords',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET EVENTS
    resetGame(state) {
      state.isGameStarted = false;
      state.gameData = {};
      state.dropArea = [];
      state.level = 0;
      state.showNextLevel = false;
      state.isAllWordsFound = false;
      state.isGamePaused = false;
    },
    // GET EVENTS
    nextLevel(state, action) {
      state.isGameStarted = true;
      state.gameData = { c: action.payload };
      state.dropArea = [];
      state.level += 1;
      state.showNextLevel = false;
      state.isAllWordsFound = false;
    },

    // CREATE EVENT
    updateScore(state, action) {
      state.score += action.payload;

      // Bonus points
      if (state.gameData.c.userAnswers.length === state.gameData.c.opt.length) {
        state.score += state.bonusScore;
      }
    },

    letterUp(state, action) {
      const i = state.dropArea.indexOf('');
      if (i > -1) {
        //   Vue.set(state.dropArea, i, action.payload.value); // same as `state.dropArea.splice(i, 1, action.payload.value)`
      } else {
        state.dropArea.push(action.payload.value);
      }
    },
    letterDown(state, action) {
      const i = state.dropArea.indexOf(action.payload.value);
      if (i === state.dropArea.length - 1) {
        state.dropArea.pop();
      } else if (i !== -1) {
        //   Vue.set(state.dropArea, i, ""); // same as `state.dropArea.splice(i, 1, '')`
      }
    },
    arrayCleanUpDropArea(state) {
      state.dropArea.pop();
    },
    lastWord(state, action) {
      state.gameData.c.lastword = action.payload.value;
    },
    validWord(state, action) {
      state.gameData.c.userAnswers.push(action.payload.value);
      if (action.payload.value.length > 4) state.showNextLevel = true;

      if (state.gameData.c.userAnswers.length === state.gameData.c.opt.length) {
        state.isAllWordsFound = true;
      }
    },
    pauseGame(state, action) {
      state.isGamePaused = !action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { resetGame, letterUp, letterDown } = slice.actions;

// ----------------------------------------------------------------------

export function onLetterUp() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      //
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export function onLetterDown() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      //
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export function onLastWord() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      //
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export function onValidWord() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      //
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export function onArrayCleanUpDropArea() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      //
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export function onNextLevel(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      //
      dispatch(slice.actions.nextLevel(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export function onUpdateScore() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      //
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export function onPauseGame() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      //
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export function onResetGame() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      //
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
