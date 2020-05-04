import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text } from '.';
import Colors from '../config/Colors';

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

    return (
        <View style={StyleSheet.flatten([styles.container, color && { backgroundColor: color },
            primary && { backgroundColor: Colors.primary }, success && { backgroundColor: Colors.success },
        info && { backgroundColor: Colors.info }, warning && { backgroundColor: Colors.warning },
        danger && { backgroundColor: Colors.danger }, style])}>
            <Text style={StyleSheet.flatten([{ fontSize: 12, color: "white" }, valueStyle])}>{value}</Text>
        </View>
    )
};

Badge.propTypes = {
    /** Bileşen metini */
    value: PropTypes.string,
    /** Bileşen metin stili */
    valueStyle: PropTypes.object,
    /** Renk */
    color: PropTypes.string,
    /** Özel renk */
    primary: PropTypes.bool,
    /** Özel renk */
    success: PropTypes.bool,
    /** Özel renk */
    info: PropTypes.bool,
    /** Özel renk */
    warning: PropTypes.bool,
    /** Özel renk */
    danger: PropTypes.bool,
    /** Genel stil */
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
    container: {
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