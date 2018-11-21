import React from 'react'
import { createStackNavigator } from 'react-navigation'

export default class Stack extends React.Component {
  constructor() {
    super()
  }

  static init(props) {
    let stack = {}
    let stackProps = {}

    React.Children.forEach(props.children, (child, index) => {
      let stackName = 'Stack'

      if (child.props.title)
        stackName = child.props.title
      else if (child.props.view && child.props.view.name)
        stackName = child.props.view.name

      if (!stackName)
        stackName = child.type.name + index

      stack[stackName] = {}
      stackProps[stackName] = child.props

      if (child.type.init && typeof child.type.init == 'function')
        stack[stackName].screen = child.type.init(child.props)
      else
        console.log(`Warning: Component '${stackName}' has no view initializer`)
    })

    return initView(stack, props, stackProps)
  }

  static getTitle(props) {
    const child = React.Children.toArray(props.children)[0]

    if (!child)
      return null

    if (child.type.name == 'Screen' && typeof child.type.getTitle == 'function')
      if (child.props.title)
        return child.props.title
      else
        return child.type.getTitle(child.props)
    else if (child.type.name == 'Stack' && typeof child.type.getTitle == 'function')
      return child.type.getTitle(child.props)

    return null
  }

  render() {
    return null
  }
}

function navigationOptions(stackProps) {
  // This event is here to allow screen components nested inside a StackNavigator to alter the TabBar.
  const navigationOptions = ({ navigation }) => {
    let { routeName } = navigation.state.routes[navigation.state.index]
    const params = stackProps[routeName]

    if (!params)
      return {}

    return {
      header: null,
      tabBarVisible: (typeof params.tabBarVisible == 'boolean' && !params.tabBarVisible) ? false : true,
    }
  }

  return navigationOptions
}

function addProps(Stack, props, stackProps) {
  Stack.navigationOptions = navigationOptions(stackProps)
}

function initView(view, props, stackProps) {
  let NavStack = createStackNavigator(view, props)
  addProps(NavStack, props, stackProps)

  return NavStack
}
