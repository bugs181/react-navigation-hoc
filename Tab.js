import React from 'react'

export default class Tab extends React.PureComponent {
  constructor() {
    super()
  }

  static init(props) {
    if (!props)
      return null

    const child = React.Children.only(props.children)
    if (child.type.init && typeof child.type.init == 'function')
      return child.type.init(child.props)

    return null
  }

  static getTitle(props) {
    const child = React.Children.only(props.children)

    if (child.props.title)
      return child.props.title

    if (child.type.name == 'Screen' && typeof child.type.getTitle == 'function')
      return child.type.getTitle(child.props)
    else if (child.type.name == 'Stack' && typeof child.type.getTitle == 'function')
      return child.type.getTitle(child.props)

    return null
  }

  render() {
    return null
  }
}
