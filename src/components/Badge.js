import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Text} from '..';

const Badge = (props) => {
    const {
        value,
        valueStyle,
        color,
        primary,
        success,
        info,
        warning,
        danger,
        style,
    } = props;

    return(
        <View style={StyleSheet.flatten([styles.badge, color && {backgroundColor: color},
            primary && { backgroundColor: '#2457ff' }, success && { backgroundColor: '#19ff5a' },
            info && { backgroundColor: '#24dbff' }, warning && { backgroundColor: '#ffc619' },
            danger && { backgroundColor: '#c41d1d' }, style ])}>
            <Text style={StyleSheet.flatten([{ fontSize: 12, color: "white" }, valueStyle])}>{value}</Text>
        </View>
    )
};

Badge.propTypes = {
    /** Rozet metin değeri */
    value: PropTypes.string,
    /** Rozet metin stili */
    valueStyle: PropTypes.object,
    /** Rozet rengi */
    color: PropTypes.string,
    primary: PropTypes.bool,
    success: PropTypes.bool,
    info: PropTypes.bool,
    warning: PropTypes.bool,
    danger: PropTypes.bool,
    /** Stil */
    style: PropTypes.object
};

Badge.defaultProps = {
    value: "",
    valueStyle: {},
    color: "red",
    primary: false,
    success: false,
    info: false,
    warning: false,
    danger: false,
    style: {}
};

const styles = StyleSheet.create({
    badge: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 18,
        padding: 5,
        minWidth: 35,
        height: 35,
        //borderWidth: StyleSheet.hairlineWidth,
        //borderColor: "white",
        backgroundColor: "red"
    }
});

export default Badge;