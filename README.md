# react-navigation-hoc
Declarative Higher Order Components for react-navigation

Navigator is a set of React components providing a declarative API alternative to react-navigation.

# Example: #

    import React from 'react';
    import { Navigator, TabBarBottom, Tab, Screen } from 'react-navigation-hoc'
    
    import Hello from './screens/Hello'
    import World from './screens/World'
    
    export default class App extends React.Component {
      render() {
        return (
          <Navigator>
            <TabBarBottom initialRouteName='HelloTab'>
              <Tab title='HelloTab'>
                <Screen view={ Hello } />
              </Tab>
    
              <Tab title='WorldTab'>
                <Screen>{ World }</Screen>
              </Tab>
            </TabBarBottom>
          </Navigator>
        );
      }
    }

<br>

# Features: #
- Declarative style react-navigation
- Navigators use component properties
- Nested StackNavigators inside TabNavigators
- Screen component lifecycle methods

# Prerequisites: #
- react-navigation
- react-navigation-tabs
