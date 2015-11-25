/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var MainView = require('./src/View/MainView.android')

var {
    AppRegistry,
    StyleSheet,
    BackAndroid,
    Navigator,
    View
} = React;

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', function() {
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
        _navigator.pop();
        return true;
    }
    return false;
});

var zata = React.createClass({
    routeMapper: function(route, navigator) {
        if (route.name === 'main') {
            return (
                <View style={styles.container}>
                    <MainView navigator={navigator} />
                </View>
            );
        }
    },

    render: function() {
        var initialRoute = { name: 'main' };

        return (
            <Navigator
              style={styles.container}
              initialRoute={initialRoute}
              configureScene={() => Navigator.SceneConfigs.FadeAndroid}
              renderScene={this.routeMapper} />
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    }
});

AppRegistry.registerComponent('zata', () => zata);
