import React from 'react'

export default class Screen extends React.PureComponent {
  constructor() {
    super()
  }

  static init(props) {
    if (!props)
      return null

    if (props.view)
      return (sProps) => <ScreenWrapper view={ props.view } { ...props.props } { ...sProps }/>
    else if (props.children && typeof props.children == 'function')
      return (sProps) => <ScreenWrapper view={ props.children } { ...props.props } { ...sProps }/>
  }

  static getTitle(props) {
    if (props.view && props.view.name)
      return props.view.name

    return null
  }

  render() {
    return null
  }
}

export class ScreenWrapper extends React.Component {
  constructor() {
    super()

    this.ref = null
    this._lifecyles = {}

    this._refHandler = this._refHandler.bind(this)
    this._setupLifecycleMethods = this._setupLifecycleMethods.bind(this)
  }

  render() {
    return <this.props.view { ...this.props } ref={ this._refHandler } />
  }

  componentDidMount() {
    this._setupLifecycleMethods('willFocus')
    this._setupLifecycleMethods('didFocus')
    this._setupLifecycleMethods('willBlur')
    this._setupLifecycleMethods('didBlur')
  }

  componentWillUnmount() {
    this._removeLifecycleMethods()
  }

  _refHandler(c) {
    this.ref = c
    return c
  }

  _setupLifecycleMethods(lifecycle) {
    if (this.ref && typeof this.ref[lifecycle] == 'function')
      this._lifecyles[lifecycle] = this.props.navigation.addListener(lifecycle, (payload) => this.ref[lifecycle](payload))
  }

  _removeLifecycleMethods() {
    for (let lifecycle of Object.keys(this._lifecyles)) {
      if (this._lifecyles[lifecycle] && typeof this._lifecyles[lifecycle].remove == 'function')
        this._lifecyles[lifecycle].remove()
    }
  }
}
