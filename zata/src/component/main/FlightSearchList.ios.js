'use strict';

import React, { ListView, StyleSheet, Text, View, TextInput, AsyncStorage } from 'react-native';
import CenterBlock from '../shared/CenterBlock';
import FlightSearchCell from './FlightSearchCell.ios';
import { Flight } from '../../api';

var TEXT_INPUT_PRICE  = 'text_input_price';
var LIST_VIEW_FLIGHTS = 'list_view_flights';

class FlightSearchList extends React.Component {

    constructor(props) {
        super(props);

        var dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        this.state = {
            isLoading: false,
            isLoadingTail: false,
            price: 100,
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
                    // ToastAndroid.show('Cannot fetch the auth token', ToastAndroid.SHORT);
                }

                this.setState({
                    isLoading: false
                });
            })
            .then(() => this.fetchFlights(1, this.state.price));
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
                                // ToastAndroid.show(response.errors[name].shift(), ToastAndroid.LONG);
                                return;
                            });
                            break;
                        default:
                            // ToastAndroid.show(response.message, ToastAndroid.SHORT);
                            break;
                    }

                    this.setState({
                        isLoading : false
                    });
                }else{
                    let data = (page <= 1) ? response.data : this.state.data.concat(response.data);

                    this.setState({
                        isLoading : false,
                        data      : data,
                        pagination: response.meta.pagination,
                        dataSource: this.state.dataSource.cloneWithRows(data)
                    });

                    if (page <= 1) {
                        requestAnimationFrame(() => {
                            this.refs[LIST_VIEW_FLIGHTS].getScrollResponder().scrollTo(0);
                        });
                    }
                }
            })
    }

    renderRow(rowData, sectionID, rowID, highlightRow) {
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
                this.fetchFlights(pagination.current_page + 1, this.state.price);
            }else{
                // ToastAndroid.show("No more pages :(", ToastAndroid.SHORT);
            }
        }
    }

    onChangeText(text) {
        this.setState({
            price: text
        });
    }

    onSubmitEditing(event) {
        let price = event.nativeEvent.text;

        if (price.length > 0) {
            // ToastAndroid.show("Searching...", ToastAndroid.SHORT);

            this.setState({
                price: price
            });

            this.fetchFlights(1, price);
            this.refs[TEXT_INPUT_PRICE].blur();
        }
    }

    onPressClear() {
        this.setState({
            price: 100
        });

        this.fetchFlights(1, this.state.price);
        this.refs[TEXT_INPUT_PRICE].blur();
    }

    render() {
        if (this.state.dataSource.getRowCount() <= 0) {
            return (
                <CenterBlock text={this.state.isLoading ? 'Loading...' : 'Load failed'} />
            )
        }else{
            return (
                <View style={styles.container}>
                    <View style={styles.search}>
                        <TextInput
                            ref={TEXT_INPUT_PRICE}
                            placeholder="Enter price to search"
                            placeholderTextColor="#c9bdf2"
                            keyboardType="numeric"
                            returnKeyType="search"
                            value={this.state.price}
                            onChangeText={this.onChangeText.bind(this)}
                            onSubmitEditing={this.onSubmitEditing.bind(this)}
                            style={styles.searchPrice} />
                        <View style={styles.searchClear}>
                            <Text style={styles.searchClearText} onPress={this.onPressClear.bind(this)}>Clear</Text>
                        </View>
                    </View>
                    <ListView
                        ref={LIST_VIEW_FLIGHTS}
                        style={styles.listview}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                        onEndReached={this.onEndReached.bind(this)}
                        onEndReachedThreshold={80}
                        automaticallyAdjustContentInsets={false}
                        keyboardShouldPersistTaps={true}
                        showsVerticalScrollIndicator={false}
                        keyboardDismissMode="on-drag" />
                </View>
            );
        }
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    search: {
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5
    },
    searchPrice: {
        flex: 10,
        padding: 5,
        marginRight: 5,
        borderWidth: 1,
        borderColor: '#B2E4EA'
    },
    searchClear: {
        flex: 2,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#B2E4EA'
    },
    searchClearText: {
        color: '#591C18'
    },
    listview: {

    }
});

module.exports = FlightSearchList;
