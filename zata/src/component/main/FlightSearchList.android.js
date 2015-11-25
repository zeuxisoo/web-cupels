'use strict';

import React, { ListView, StyleSheet, Text, View, AsyncStorage, ToastAndroid } from 'react-native';
import CenterBlock from '../shared/CenterBlock';
import { Flight } from '../../api';

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
        this.fetchAuthToken();
    }

    fetchAuthToken() {
        this.setState({
            isLoading: true
        });

        Flight
            .authSign()
            .then((response) => {
                if (response) {
                    AsyncStorage.setItem('auth-token', response.token);
                }else{
                    ToastAndroid.show('Cannot fetch the auth token', ToastAndroid.SHORT);
                }

                this.setState({
                    isLoading: false
                });
            })
            .then(() => this.fetchFlights(1, 100));
    }

    fetchFlights(page, price) {
        this.setState({
            isLoading: true
        });

        Flight
            .fetchAll({
                price: price
            })
            .then((response) => {
                console.log(response);

                if (response.status_code) {
                    switch(response.status_code) {
                        case 422:
                            Object.keys(response.errors).forEach((name) => {
                                ToastAndroid.show(response.errors[name].shift(), ToastAndroid.LONG);
                                return;
                            });
                            break;
                        default:
                            ToastAndroid.show(response.message, ToastAndroid.SHORT);
                            break;
                    }
                }else{
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(response.data)
                    });
                }

                this.setState({
                    isLoading: false
                });
            })
    }

    renderRow(rowData) {
        return (
            <View>
                <Text>123</Text>
            </View>
        )
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
