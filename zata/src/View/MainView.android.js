'use strict';

var React = require('react-native');
var FlightSearchList = require('../component/main/FlightSearchList.android');

var {
    AppRegistry,
    StyleSheet,
    ToolbarAndroid,
    Text,
    View,
} = React;

var MainView = React.createClass({
    render: function() {
        return (
            <View style={styles.container}>
                <ToolbarAndroid title="Zata" titleColor="white" style={styles.toolbar} />
                <FlightSearchList />
            </View>
        )
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FAFAFA'
    },
    toolbar: {
        backgroundColor: '#00a2ed',
        height: 56
    }
});

module.exports = MainView;
