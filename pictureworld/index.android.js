/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  BackAndroid,
  Component,
  Navigator,
  ToolbarAndroid,
  StyleSheet,
  Text,
  View
} from 'react-native';

var MainScreen = require('./MainScreen');
var ImageView = require('./ImageView');
var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  if (route.name==='Main') {
    return (
        <View style={{flex: 1}}>
          <ToolbarAndroid
            actions={[]}
            style={styles.toolbar}
            titleColor="white"
            title={'最新'} />
          <MainScreen
            style={{flex: 1}}
            navigator={navigationOperations}
            movie={route.movie}
          />
        </View>
      );
  }else if (route.name==='ImageView') {
    return (
        <View style={{flex: 1}}>
          <ToolbarAndroid
            actions={[]}
            style={styles.toolbar}
            titleColor="white"
            title={'详细'} />
          <ImageView
            style={{flex: 1}}
            navigator={navigationOperations}
            content={route.content}
          />
        </View>
      );
  }


};

var pictureworld = React.createClass({
  render: function() {
    var initialRoute = {name: 'Main'};
    return (
      <Navigator
        style={styles.container}
        initialRoute={initialRoute}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper}
      />
    );
  }
});




const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  toolbar: {
    backgroundColor: '#03a9f4',
    height: 56,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('pictureworld', () => pictureworld);
