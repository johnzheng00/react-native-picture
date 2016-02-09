
'use strict';

var React = require('react-native');
var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Navigator,
  ActivityIndicatorIOS,
  ProgressBarAndroid,
  Text,
  Platform,
  View,
} = React;

//var navigator = new Navigator();
var ImageView = require('./ImageView');
var TimerMixin = require('react-timer-mixin');

var API_URL = 'http://picture.ftng.net/new/listjson';
var API_TOKEN = 'UikQCWFkyHiRyeXICMLPSzmHCeqedUpy';

var pictures = new Array(10);

var MainScreen = React.createClass({
  mixins: [TimerMixin],

  timeoutID: (null: any),



  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(pictures),
      isLoading: false,
      isLoadingTail: false,
      pageNumber: 0,
    };
  },


componentWillMount: function() {
    this.loadData(1);
  },


  _urlForQueryAndPage: function(pageNumber: number): string {
    return (
        API_URL + '?token=' + API_TOKEN +  '&page=' + pageNumber
      );
  },

  loadData: function(pageNumber: number){
    this.setState({
      isLoadingTail: true,
   });

    fetch("http://picture.ftng.net/new/listjson?token=UikQCWFkyHiRyeXICMLPSzmHCeqedUpy&page="+pageNumber)
    .then((response) => response.json())
      .then((responseText) => {
        pictures = responseText.content;
        // for (var i in responseText.content) {
        //   pictures.push(responseText.content[i]);
        // }

        this.setState({
         dataSource: this.state.dataSource.cloneWithRows(pictures),
         loaded: true,
         isLoadingTail: false,
       });
      })
      .catch((error) => {
        console.warn(error);
      });

  },

  onEndReached: function(){

    if (this.state.isLoadingTail) {
          // We're already fetching or have all the elements so noop
          return;
    }
    this.setState({
      pageNumber: this.state.pageNumber + 1,
      isLoadingTail: true,
    });
    var pageNumber = this.state.pageNumber;
    fetch("http://picture.ftng.net/new/listjson?token=UikQCWFkyHiRyeXICMLPSzmHCeqedUpy&page="+pageNumber)
    .then((response) => response.json())
      .then((responseText) => {
        for (var i in responseText.content) {
          pictures.push(responseText.content[i]);
        }
        this.setState({
         dataSource: this.state.dataSource.cloneWithRows(pictures),
         loaded: true,
         isLoadingTail: false,
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
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        renderFooter={this.renderFooter}
        onEndReached={this.onEndReached}
      />
    );
  },

  _renderRow: function(content: object, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight onPress={()=>this._pressRow(content)}  underlayColor="transparent">
        <View >
          <View style={styles.row}>
            <Image style={styles.thumb} source={{uri:content.s_url}}/>
            <Text style={styles.text} numberOfLines={2}>
              {content.comment}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  renderFooter: function() {
  if (!this.state.isLoadingTail) {
    return <View style={styles.scrollSpinner} />;
  }
  if (Platform.OS === 'ios') {
    return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
  } else {
    return (
      <View  style={{alignItems: 'center'}}>
        <ProgressBarAndroid styleAttr="Large"/>
      </View>
    );
  }
},


  _pressRow: function(content: object) {
    console.log("xxxx");
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: '详细',
        component: ImageView,
        passProps: {content},
      });
    } else {
      this.props.navigator.push({
        title: '详细',
        name: 'ImageView',
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
    borderWidth: 0,
    borderRadius: 0,
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
  scrollSpinner: {
    marginVertical: 20,
  },
});

module.exports = MainScreen;
