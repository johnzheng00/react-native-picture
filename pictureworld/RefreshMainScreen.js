
'use strict';

var React = require('react-native');
var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  Platform,
  View,
} = React;

var ImageView = require('./ImageView');
var RefreshableListView = require('react-native-refreshable-listview')

var API_URL = 'http://picture.ftng.net/new/listjson';
var API_TOKEN = 'UikQCWFkyHiRyeXICMLPSzmHCeqedUpy';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var RefreshMainScreen = React.createClass({

  statics: {
    title: '<ListView> - Grid Layout',
    description: 'Flexbox grid layout.'
  },

  getInitialState: function() {

    return {
      dataSource: ds.cloneWithRows(this._genRows({})),
    };
  },

  _pressData: ({}: {[key: number]: boolean}),

componentWillMount: function() {
    this.fetchData(1);
  },


  _urlForQueryAndPage: function(pageNumber: number): string {
    return (
        API_URL + '?token=' + API_TOKEN +  '&page=' + pageNumber
      );
  },

  fetchData: function(pageNumber: number){


    fetch("http://picture.ftng.net/new/listjson?token=UikQCWFkyHiRyeXICMLPSzmHCeqedUpy&page="+pageNumber)
    .then((response) => response.json())
      .then((responseText) => {
        this.setState({
         dataSource: this.state.dataSource.cloneWithRows(responseText.content),
         loaded: true,
       });
      })
      .catch((error) => {
        console.warn(error);
      });

  },

  render: function() {
    return (
      // ListView wraps ScrollView and so takes on its properties.
      // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
      <RefreshableListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        refreshDescription="Refreshing pictures"
        loadData={this.fetchData(2)}
      />
    );
  },

  _renderRow: function(content: object, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight onPress={()=>this._pressRow(content)}  underlayColor="transparent">
        <View >
          <View style={styles.row}>
            <Image style={styles.thumb} source={{uri:content.url}}/>
            <Text style={styles.text} numberOfLines={2}>
              {content.comment}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 100; ii++) {
      var pressedText = pressData[ii] ? ' (X)' : '';
      dataBlob.push('Cell ' + ii + pressedText);
    }
    return dataBlob;
  },

  _pressRow: function(content: object) {
    console.log("xxxx");
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: 'title',
        component: ImageView,
        passProps: {content},
      });
    } else {
      this.props.navigator.push({
        title: 'title',
        name: 'movie',
        content: content,
      });
    }
  },
});



var styles = StyleSheet.create({
  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 3,
    width: 150,
    height: 150,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 150,
    height: 150
  },
  text: {
    position:'absolute',
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 135,
    left: 0,
    width: 150,
    height: 15,

    fontWeight: 'bold',
    flexWrap: 'nowrap',
    textDecorationStyle: 'dotted'
  },
});

module.exports = RefreshMainScreen;
