'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import {
  PureRenderMixin,
  React,
} from 'react-for-atom';

const {PropTypes} = React;

/**
 * A checkbox component with an input checkbox and a label. We restrict the label to a string
 * to ensure this component is pure.
 */
export default class NuclideCheckbox extends React.Component {
  state: void;

  static propTypes = {
    checked: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props: Object) {
    super(props);
    (this: any)._onChange = this._onChange.bind(this);
  }

  shouldComponentUpdate(nextProps: Object, nextState: void): boolean {
    return PureRenderMixin.shouldComponentUpdate.call(this, nextProps, nextState);
  }

  render(): ReactElement {
    return (
      <label className="nuclide-ui-checkbox-label">
        <input
          checked={this.props.checked}
          className="nuclide-ui-checkbox"
          onChange={this._onChange}
          type="checkbox"
        />
        {' '}{this.props.label}
      </label>
    );
  }

  _onChange(event: SyntheticEvent) {
    const isChecked = ((event.target: any): HTMLInputElement).checked;
    this.props.onChange.call(null, isChecked);
  }
}
