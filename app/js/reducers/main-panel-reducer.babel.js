import C from '../constants';

const INTIAL_SIZE  = 400;
const INITIAL_STATE = {
  prevHeight:   INTIAL_SIZE,
  ySize:        INTIAL_SIZE,
  isHidden:     false,
  isTransition: false
};

const mainPanel = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'MAIN_PANEL_HIDE_TOGGLE': {
    const isHidden = !state.isHidden;
    const ySize = (isHidden) ? C.PLAYER_HEIGHT : state.prevHeight;
    const prevHeight = (isHidden) ? state.ySize : C.PLAYER_HEIGHT;
    const isTransition = true;

    return { ...state, isHidden, ySize, prevHeight, isTransition };
  }
  case 'MAIN_PANEL_SET_YSIZE': {
    return { ...state, ySize: state.ySize - action.data };
  }
  case 'MAIN_PANEL_RESET_TRANSITION': {
    return { ...state, isTransition: false };
  }
  case 'MAIN_PANEL_SAVE_YPREV': {
    return { ...state, prevHeight: state.ySize };
  }
  case 'MAIN_PANEL_SET_HIDDEN': {
    return { ...state, isHidden: action.data };
  }
  }
  return state;
};

export default mainPanel;
