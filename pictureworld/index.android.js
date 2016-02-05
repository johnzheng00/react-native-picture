/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  ToolbarAndroid,
  StyleSheet,
  Text,
  View
} from 'react-native';

var MainScreen = require('./MainScreen');

class pictureworld extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
      <ToolbarAndroid style={styles.toolbar}
        actions={[]}
        titleColor="white"
        title="Movies" />
      <MainScreen
        style={{flex: 1}}
      />
    </View>
    );
  }
}

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
