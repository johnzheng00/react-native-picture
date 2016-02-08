'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var ImageView = React.createClass({
  render: function() {
  return (
    <View style={styles.container}>
      <Image resizeMode='contain' source={{uri:this.props.content.url}} style={styles.image}/>
      <Text style={styles.instructions}>
        {this.props.content.comment}
      </Text>
    </View>
  );
}

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    flex: 1,
    width:500,
    height: 400,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    flex: 1,
    position:'absolute',
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    left: 0,
    textAlign: 'center',
    marginBottom: 5,
  },
});

module.exports = ImageView;
