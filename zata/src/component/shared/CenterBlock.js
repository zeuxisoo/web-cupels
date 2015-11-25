'use strict';

var React = require('react-native');

var {
    View,
    Text,
    StyleSheet
} = React;

var CenterBlock = React.createClass({
    render: function() {
        return (
            <View style={styles.centerBlock}>
                <Text>{this.props.text}</Text>
            </View>
        )
    }
});

var styles = StyleSheet.create({
    centerBlock: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

module.exports = CenterBlock;
