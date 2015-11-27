'use strict';

import React, { StyleSheet, ToolbarAndroid, Text, View } from 'react-native';
import NavigationBar from 'react-native-navbar';
import FlightSearchList from '../component/main/FlightSearchList.ios';

class MainView extends React.Component {
    render() {
        const titleConfig = {
            title: "Zata",
            tintColor: '#FFFFFF'
        };

        return (
            <View style={styles.container}>
                <NavigationBar style={styles.toolbar} title={titleConfig} />
                <FlightSearchList title="Home" />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FAFAFA'
    },
    toolbar: {
        backgroundColor: '#218693'
    }
});

module.exports = MainView;
