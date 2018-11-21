import React from 'react'
import { createAppContainer } from 'react-navigation'

export default class Navigator extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      view: null,
    }
  }

  componentDidMount() {
    this.setState({ view: React.Children.only(this.props.children) })

    const child = React.Children.only(this.props.children)

    if (child.type.init && typeof child.type.init == 'function') {
      const View = child.type.init(child.props)

      // Backward compatibility for react-navigation 2
      if (this.props.version && this.props.version < 3)
        return this.setState({ view: <View /> })

      const AppContainer = createAppContainer(View)
      return this.setState({ view: <AppContainer /> })
    }

    this.setState({ view: null })
  }

  render() {
    return this.state.view
  }
}
