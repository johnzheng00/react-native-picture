

 'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;

var MainScreen = require('./MainScreen');
var RefreshView = require('./RefreshView');
var RefreshMainScreen = require('./RefreshMainScreen');

var pictureworld = React.createClass({
  render: function() {

    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Movies',
          component: MainScreen,
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('pictureworld', () => pictureworld);

module.exports = pictureworld;
