import { h, Component } from 'preact';
import {bind} from 'decko';
import Hammer from 'hammerjs';
import C from '../constants';
import isSelectedByConnection from '../helpers/is-selected-by-connection';
import {classNames, refs, compose} from '../helpers/style-decorator';

const CLASSES = require('../../css/blocks/spot.postcss.css.json');
require('../../css/blocks/spot');

@compose(classNames(CLASSES), refs)
class Spot extends Component {
  render () {
    const {meta, type, state} = this.props;
    const {delay, duration} = state;
    const {dDelay, dDuration} = this.state;

    const delayWidth = delay/10 + dDelay;
    const durationWidth = duration/10 + dDuration;

    const style = {
      width: `${(type === 'start') ? delayWidth : durationWidth}em`
    };

    return (
      <div className={this._getClassName()} style={style} data-component="spot">
        <div className="spot__dot" ref="_dot" />
        {this.props.children}
      </div>
    );
  }

  _getClassName() {
    const {type} = this.props;

    const endClass = (type === 'end') ? 'spot--end' : '';
    const selectClass = this._isSelected() ? 'is-selected' : '';

    return `spot ${endClass} ${selectClass} ${this._getEasingClass()}`;
  }

  _getEasingClass() {
    const {type, state} = this.props;
    if (type === 'start') { return ''; }

    const durationWidth = state.duration/10 + this.state.dDuration;
    return (durationWidth >= 80) ? 'is-easing' : '';
  }

  _isSelected() {
    const {type, state, entireState, meta} = this.props;
    const {selectedSpot, points} = entireState;
    const {id, spotIndex, type: selType, prop } = selectedSpot;

    return (  meta.id === id &&
              type === selType &&
              meta.spotIndex === spotIndex &&
              meta.prop === prop
            ) || isSelectedByConnection({...meta, type}, selectedSpot, points);
  }

  componentWillMount() { this.setState({ dDelay: 0, dDuration: 0 }); }

  componentDidMount() {
    const mc  = new Hammer.Manager(this._dot);
    mc.add(new Hammer.Pan);
    mc.add(new Hammer.Tap);
    mc.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    mc.on('pan', this._pan);
    mc.on('panend', this._panEnd);
    mc.on('tap', this._tap);
  }

  @bind
  _pan(e) {
    const direction = this.props.type;
    if (direction === 'end') {
      const threshold = C.MIN_DURATION;
      const min = - this.props.duration + threshold;
      const dDuration = (e.deltaX*10 < min) ? min/10 : e.deltaX;
      this.setState({ dDuration });
    }
    if (direction === 'start') { this.setState({ dDelay: e.deltaX }); }
  }

  @bind
  _panEnd(e) {
    const {meta}  = this.props;
    const {store} = this.context;

    store.dispatch({
      type: 'SHIFT_SEGMENT',
      data: {
        delay:    this.state.dDelay*10,
        duration: this.state.dDuration*10,
        ...meta
      }
    });

    this.setState({ dDelay: 0, dDuration: 0 });
  }

  @bind
  _tap(e) {
    const {store} = this.context;
    const {meta, type}  = this.props;

    store.dispatch({ type: 'SET_SELECTED_SPOT', data: { type, ...meta } });
  }
}

export default Spot;
