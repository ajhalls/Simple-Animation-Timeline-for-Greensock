import { h, Component } from 'preact';
import {bind} from 'decko';
import Hammer from 'hammerjs';
import C from '../constants';

const CLASSES = require('../../css/blocks/point.postcss.css.json');
require('../../css/blocks/point');

class Point extends Component {
  // getInitialState() { return { deltaX: 0, deltaY: 0 }; }
  constructor() {
    super();
    this.state = { deltaX: 0, deltaY: 0 };
  }
  render () {
    const {state} = this.props;
    let [x, y]  = this._getXY();

    const style = { transform: `translate(${x}px, ${y}px)` };

    return (
      <div  style={style}
            className={this._getClassName(state)}
            onClick={this._onClick}
            title={state.name}
            data-component="point"></div>
    );
  }

  _getXY() {
    const [x, y] = this._getCoords();
    const {deltaX, deltaY} = this.state;

    return [ x + deltaX, y + deltaY ];
  }

  _getCoords() {
    const {state, entireState} = this.props;
    const {selectedSpot, points} = entireState;

    if (selectedSpot.id == null) {return state.currentProps[C.POSITION_NAME];}

    const {id, prop, spotIndex, type} = selectedSpot;
    return points[id].props[prop][spotIndex][type].value;
  }

  _getClassName(state) {
    const selectClass = (state.isSelected) ? CLASSES['is-selected']: '';
    return `${CLASSES['point']} ${selectClass}`;
  }

  componentDidMount() {
    const mc = new Hammer.Manager(this.base);
    mc.add(new Hammer.Pan);

    mc.on('pan', this._onPan);
    mc.on('panend', this._onPanEnd);
  }

  @bind
  _onPan(e) {
    const { deltaX, deltaY} = e;
    this._isPan = true;

    this.setState({ deltaX, deltaY });
  }

  @bind
  _onPanEnd(e) {
    const {store} = this.context;
    const {state, entireState} = this.props;
    const {id} = state;
    const {selectedSpot} = entireState;
    const { deltaX, deltaY } = e;

    if (selectedSpot.id == null) {
      store.dispatch({
        type: 'CHANGE_POINT_CURRENT_POSITION', data: { deltaX, deltaY, id }
      });
    } else {
      store.dispatch({
        type: 'UPDATE_SELECTED_SPOT',
        data: { ...selectedSpot, value: this._getXY() }
      });
    }
    this.setState({ deltaX: 0, deltaY: 0 });
  }

  @bind
  _onClick(e) {
    if (this._isPan) { return this._isPan = false; }
    const {state} = this.props;
    const {store} = this.context;

    store.dispatch({ type: 'SELECT_POINT', data: state.id });
  }
}

export default Point;
