

 'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  SegmentedControlIOS,
} = React;

var MainScreen = require('./MainScreen');
var RefreshView = require('./RefreshView');

var pictureworld = React.createClass({
  render: function() {

    return (
      <NavigatorIOS
        translucent={true}
        style={styles.container}
        initialRoute={{
          title: '最新',
          component: MainScreen,
        }}
      >
    </NavigatorIOS>
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
