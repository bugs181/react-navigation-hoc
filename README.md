# react-navigation-hoc
Declarative Higher Order Components for react-navigation

Navigator is a set of React components providing a declarative API alternative to react-navigation.

# Install: #
    npm install --save react-navigation-hoc
    
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
- Nested Navigators
- Screen component lifecycle methods
- Works for version ~2 and ^3 of react-navigation

# Prerequisites: #
- react-navigation
- react-navigation-tabs

# Available components: #
- \<Navigator /> - Top level component required to initialize children components.
- \<TabBarBottom /> - createBottomTabNavigator
- \<Tab /> - Helper component
- \<Stack /> - createStackNavigator
- \<Screen /> - Wrapper component for your screens

