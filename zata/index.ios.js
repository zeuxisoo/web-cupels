/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, { AppRegistry, StyleSheet, Navigator, View } from 'react-native';
import MainView from './src/view/MainView.ios';

class Zata extends React.Component {

    routeMapper(route, navigator) {
        _navigator = navigator;

        if (route.name === 'main') {
            return (
                <View style={styles.container}>
                    <MainView navigator={navigator} />
                </View>
            );
        }
    }

    render() {
        let initialRoute = { name: 'main' };

        return (
            <Navigator
              style={styles.container}
              initialRoute={initialRoute}
              configureScene={() => Navigator.SceneConfigs.FloatFromRight}
              renderScene={this.routeMapper} />
        );
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    }
});

AppRegistry.registerComponent('zata', () => Zata);
