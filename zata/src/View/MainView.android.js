'use strict';

import React, { StyleSheet, ToolbarAndroid, Text, View } from 'react-native';
import FlightSearchList from '../component/main/FlightSearchList.android';

class MainView extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ToolbarAndroid title="Zata" titleColor="white" style={styles.toolbar} />
                <FlightSearchList />
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
        backgroundColor: '#218693',
        height: 56
    }
});

module.exports = MainView;
