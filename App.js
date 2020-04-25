/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import React, { Component } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';

// import { DemoView } from './src/js/views/DemoView';
import { DemoView  } from 'views/DemoView';
import { EmojiDictWithDataFetcher } from './src/js/views/DemoView';
import { PriceTrackerContainer, PriceTrackerWithDataFecther } from 'components/containers/PriceTrackerContainer';
import { WallpaperAppContainer, HomeScreen } from 'components/containers/WallpaperAppContainer';
import { FullScreenImageView } from 'views/FullScreenImageView';
import { WallpaperStackContainer } from 'components/containers/WallpaperStackContainer';
import { SearchWallpaper} from 'components/containers/SearchWallpaper';
import { homeScreenView } from 'views/homeScreenView';
import { AboutUsView } from 'views/AboutUsView';
import { SearchResults } from 'components/containers/SearchResultsContainer';
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default class App extends Component {
	render() {
		return (

      // with tab and stack navigation both
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="Home" >
        {/* <Stack.Screen name="Home" component={ WallpaperAppContainer } options = {{
          headerLeft: () => (
            <Button
              onPress={() => alert( 'This is a button!' )}
              title="Info"
              color="black"
            />
          )}}/> */}
        <Stack.Screen name="AboutUs" component={AboutUsView} />
        <Stack.Screen name="Demo" component={DemoView} />
        <Stack.Screen name="SearchResults" options={{headerShown: true}} component={ SearchResults } />
        <Stack.Screen name="Search" options={{ title: 'Home' }} component={ SearchWallpaper } />
        <Stack.Screen name="Home"
          component={ WallpaperStackContainer }
          options={( { route } ) => ( {
            headerTitle: getHeaderTitle( route ),
          } )}
          />
        <Stack.Screen name="FullScreenImageView" options={{headerShown: true}} component={ FullScreenImageView } />
        </Stack.Navigator>
      </NavigationContainer>

      // Intitial without navigation
      // <NavigationContainer>
      //   <View style={styles.container}>
      //     {/* <Text> Mike Check 1,2,3</Text>
      //     <DemoView/>
      //     <EmojiDictWithDataFetcher/> */}
      //     {/* <PriceTrackerWithDataFecther/> */}
      //     <WallpaperAppContainer/>
      //     {/* <PriceTrackerContainer/> */}
      //   </View>
      // </NavigationContainer>
      

      // with tab navigation only
      // <NavigationContainer>
      //   <Tab.Navigator>
      //     {/* <Tab.Screen name="Home" component={WallpaperAppContainer} options={{
      //     tabBarLabel: 'Home',
      //     tabBarIcon: ( { color } ) => (
      //       <MaterialCommunityIcons name="home" color={color} size={26} />
      //     ),
      //   }}/> */}
      //     <Tab.Screen name = "Stack" component = {WallpaperStackContainer} />
      //     <Tab.Screen name="Demo" component={DemoView} />
      //     {/* <Tab.Screen name="FullScreenImageView" component={ FullScreenImageView  } /> */}

      //   </Tab.Navigator>
      // </NavigationContainer>
		);
	}
}


// this is a nice approach to change the  title for each screen inside Tab Navigator

const  getHeaderTitle = ( route ) => {
  console.log( 'route is', route );

  // Access the tab navigator's state using `route.state`
  const routeName = route.state
    ? // Get the currently active route name in the tab navigator
      route.state.routes[ route.state.index ].name
    : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
      // In our case, it's "Home" as that's the first screen inside the navigator
      route.params?.screen || 'Home';

  switch ( routeName ) {
    case 'Home':
      return 'Home';
    case 'Search':
      return 'Search';
    case 'About Us':
      return 'About Us';
  }
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

} );
