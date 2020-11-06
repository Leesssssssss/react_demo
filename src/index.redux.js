const add = 1;
const reduce = 2;

// reducer
export function counter (state = 0, action) {
  switch (action.type) {
    case add:
      return state + 1;
    case reduce:
      return state - 1;
    default:
      return 10;
  }
}

// action creator
export function addItem () {
  return { type: add };
}

export function reduceItem () {
  return { type: reduce };
}

export function addItemAsync () {
  return dispatch => {
    setTimeout(() => {
      dispatch(addItem());
    }, 2000);
  };
}