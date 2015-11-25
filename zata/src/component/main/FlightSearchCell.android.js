'use strict';

import React, { StyleSheet, TouchableNativeFeedback, Text, View } from 'react-native';

class FlightSearchCell extends React.Component {

    render() {
        var flight = this.props.flight;

        return (
            <View style={styles.cell}>
                <TouchableNativeFeedback>
                    <View style={styles.container}>
                        <View style={styles.heading}>
                            <Text style={styles.headingLocation}>{flight.departure_port} => {flight.arrival_port}</Text>
                            <Text style={styles.headingPrice}>{flight.ticket_price}</Text>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.bodyRow}>
                                <Text style={styles.bodyRowName}>航空公司</Text>
                                <Text style={styles.bodyRowValue}>{flight.company_code}</Text>
                                <Text style={styles.bodyRowName}>客艙類別</Text>
                                <Text style={styles.bodyRowValue}>{flight.cabin}</Text>
                            </View>
                            <View style={styles.bodyRow}>
                                <Text style={styles.bodyRowName}>停留最短</Text>
                                <Text style={styles.bodyRowValue}>{flight.stay_day_min}</Text>
                                <Text style={styles.bodyRowName}>停留最長</Text>
                                <Text style={styles.bodyRowValue}>{flight.stay_day_max}</Text>
                            </View>
                            <View style={styles.bodyRow}>
                                <Text style={styles.bodyRowName}>有效期由</Text>
                                <Text style={styles.bodyRowValue}>{flight.valid_date_from}</Text>
                                <Text style={styles.bodyRowName}>有效期至</Text>
                                <Text style={styles.bodyRowValue}>{flight.valid_date_to}</Text>
                            </View>
                            <View style={styles.bodyRow}>
                                <Text style={styles.bodyRowName}>出票期由</Text>
                                <Text style={styles.bodyRowValue}>{flight.valid_buy_ticket_date_from}</Text>
                                <Text style={styles.bodyRowName}>出票期至</Text>
                                <Text style={styles.bodyRowValue}>{flight.valid_buy_ticket_date_to}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }

}

var styles = StyleSheet.create({
    cell: {
        flex: 1,
        margin: 5,
        backgroundColor: '#FFFFFF'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 0
    },
    heading: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#B2E4EA'
    },
    headingLocation: {
        flex: 9,
        color: '#591C18',
        fontSize: 16,
        fontWeight: 'bold'
    },
    headingPrice: {
        flex: 3,
        textAlign: 'right'
    },
    body: {
        padding: 5,
    },
    bodyRow: {
        flex: 1,
        flexDirection: 'row'
    },
    bodyRowName: {
        flex: 3,
        color: '#292C37',
        fontSize: 14
    },
    bodyRowValue: {
        flex: 3,
        textAlign: 'right',
        marginRight: 10,
        color: '#CCCCCC',
        fontSize: 14
    }
});

module.exports = FlightSearchCell;
