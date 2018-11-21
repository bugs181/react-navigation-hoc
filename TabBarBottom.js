import React from 'react'

import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Image } from 'react-native'

export default class TabBarBottom extends React.PureComponent {
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
      else if (child.type.name == 'Tab' && typeof child.type.getTitle == 'function')
        stackName = child.type.getTitle(child.props)

      if (!stackName)
        stackName = child.type.name + index

      if (stack[stackName] && stack[stackName].screen)
        stackName = stackName + index

      stack[stackName] = {}
      stackProps[stackName] = child.props

      if (child.type.init && typeof child.type.init == 'function')
        stack[stackName].screen = child.type.init(child.props)
      else
        // eslint-disable-next-line no-console
        console.log(`Warning: Component '${stackName}' has no view initializer`)
    })

    return initView(stack, props, stackProps)
  }

  render() {
    return null
  }
}

function parseProps(props, stackProps) {
  let icons = {}

  if (props.icons)
    for (let stackName of Object.keys(props.icons)) {
      if (!icons[stackName])
        icons[stackName] = {}

      if (props.icons[stackName])
        icons[stackName] = props.icons[stackName]
    }

  for (let stackName of Object.keys(stackProps)) {
    if (!icons[stackName])
      icons[stackName] = {}

    if (stackProps[stackName].icons)
      icons[stackName] = stackProps[stackName].icons
  }

  // TODO: FIXME: if (props.navigationOptions, then wrap it; allowing user defined one to still work.)
  // TODO: <TabBar override: { navigationOptions } />

  return {
    navigationOptions: ({ navigation }) => {
      return ({
        tabBarIcon: ({ focused }) => {
          const { routeName } = navigation.state

          if (!icons[routeName])
            return null

          let icon = icons[routeName]

          if (focused)
            icon = icon.active
          else
            icon = icon.inactive

          return <Image style={{ height: 44, width: 44 }} source={ icon } />
        },
      })
    },
  }
}

function initView(view, props, stackProps) {
  //let tabStackProps = { props, ...stackProps }
  const TabStack = createBottomTabNavigator(view, { ...props, ...parseProps(props, stackProps) })
  //addProps(TabStack, props, stackProps)
  return TabStack
}
