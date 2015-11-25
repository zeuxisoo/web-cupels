'use strict';

import React, { ListView, StyleSheet, Text, View, AsyncStorage, ToastAndroid } from 'react-native';
import CenterBlock from '../shared/CenterBlock';
import FlightSearchCell from './FlightSearchCell';
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
            data: [],
            pagination: {},
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
                page : page,
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

                    this.setState({
                        isLoading : false
                    });
                }else{
                    let data = this.state.data.concat(response.data);

                    this.setState({
                        isLoading : false,
                        data      : data,
                        pagination: response.meta.pagination,
                        dataSource: this.state.dataSource.cloneWithRows(data)
                    });
                }
            })
    }

    renderRow(rowData) {
        return (
            <FlightSearchCell flight={rowData} />
        )
    }

    onEndReached() {
        if (this.state.isLoading === true)  {
            return;
        }else{
            let pagination = this.state.pagination;

            if (pagination.current_page < pagination.total_pages) {
                this.fetchFlights(pagination.current_page + 1, 100);
            }else{
                ToastAndroid.show("No more pages :(", ToastAndroid.SHORT);
            }
        }
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
                    onEndReached={this.onEndReached.bind(this)}
                    onEndReachedThreshold={80}
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
