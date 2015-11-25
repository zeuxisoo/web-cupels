'use strict';

var React = require('react-native');
var CenterBlock = require('../shared/CenterBlock');

var {
    ListView,
    StyleSheet,
    Text,
    View,
} = React;

var FlightSearchList = React.createClass({
    getInitialState: function() {
        var dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        return {
            isLoading: false,
            isLoadingTail: false,
            dataSource: dataSource
        };
    },

    componentDidMount: function() {
        this.fetchFlights(1);
    },

    fetchFlights: function(page) {
        console.log(page);
    },

    renderRow: function(rowData) {

    },

    onEndReached: function() {

    },

    render: function() {
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
});

var styles = StyleSheet.create({
    listview: {

    }
});

module.exports = FlightSearchList;
