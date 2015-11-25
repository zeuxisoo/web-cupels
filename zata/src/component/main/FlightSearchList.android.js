'use strict';

import React, { ListView, StyleSheet, Text, View } from 'react-native';
import CenterBlock from '../shared/CenterBlock';

class FlightSearchList extends React.Component {

    constructor(props) {
        super(props);

        var dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        this.state = {
            isLoading: false,
            isLoadingTail: false,
            dataSource: dataSource
        };
    }

    componentDidMount() {
        this.fetchFlights(1);
    }

    fetchFlights(page) {
        console.log(page);
    }

    renderRow(rowData) {

    }

    onEndReached() {

    }

    render() {
        if (this.state.dataSource.getRowCount() <= 0) {
            return (
                <CenterBlock text={this.state.isLoading ? 'Loading...' : 'Load failed'} />
            )
        }else{
            return (
                <ListView
                    ref="listview"
                    style={styles.listview}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    onEndReached={this.onEndReached}
                    automaticallyAdjustContentInsets={false}
                    keyboardShouldPersistTaps={true}
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode="on-drag" />
            );
        }
    }
}

var styles = StyleSheet.create({
    listview: {

    }
});

module.exports = FlightSearchList;
