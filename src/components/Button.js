import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, ActivityIndicator, Platform} from 'react-native';
import {Text} from '..';

const Button = (props) => {
    const {
        title,
        titleStyle,
        type,
        loading,
        loadingStyle,
        disabled,
        disabledStyle,
        iconLeft,
        iconRight,
        onPress,
        onPressIn,
        onPressOut,
        onLongPress,
        shadow,
        shadowStyle,
        color,
        size,
        primary,
        success,
        info,
        warning,
        danger
    } = props;

    function status() {
        if (!loading)
            onPress();
    }

    return(
        <TouchableOpacity {...disabled} style={StyleSheet.flatten([styles.button,
            type == "default" && styles.default, type == "transparent" && styles.transparent,
            type == "outline" && styles.outline, type == "rounded" && styles.rounded,
            size == "small" && styles.small, size == "medium" && styles.medium,
            size == "large" && styles.large,
            shadow && styles.shadow])} onPress={() => status()}>
                {loading ? (
                    <ActivityIndicator {...loadingStyle} animating={true} />
                ) : (
                    <Text style = {StyleSheet.flatten([{color: "white" }, size == "small" && styles.smallText,
                size == "medium" && styles.mediumText, size == "large" && styles.largeText])}>{title}</Text>
                )}
        </TouchableOpacity>
    )
};

Button.propTypes = {
    /** Button metini */
    title: PropTypes.string,
    /** Button metin stili */
    titleStyle: PropTypes.object,
    /** Button tipi */
    type: PropTypes.oneOf(["default", "transparent", "outline", "rounded"]),
    /** Yükleniyor... */
    loading: PropTypes.bool,
    loadingStyle: PropTypes.object,
    disabled: PropTypes.bool,
    iconLeft: PropTypes.object,
    iconRight: PropTypes.object,
    onPress: PropTypes.func,
    shadow: PropTypes.number,
    shadowStyle: PropTypes.object,
    color: PropTypes.string,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    primary: PropTypes.bool,
    success: PropTypes.bool,
    info: PropTypes.bool,
    warning: PropTypes.bool,
    danger: PropTypes.bool,
};

Button.defaultProps = {
    title: '',
    titleStyle: {},
    type: "default",
    loading: false,
    loadingStyle: {},
    disabled: false,
    iconLeft: {},
    iconRight: {},
    onPress: () => alert("Hello World!"),
    shadow: 0,
    shadowStyle: {},
    size: "medium",
    primary: false,
    success: false,
    info: false,
    warning: false,
    danger: false,
};

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        padding: 10,
        backgroundColor: "red"
    },
    shadow: {
        ...Platform.select({
            android: {
                elevation: 1
            },
            default: {
                shadowOffSet: {1:1}
            }
        })
    },
    default: {
        backgroundColor: "red"
    },
    transparent: {
        backgroundColor: "transparent"
    },
    outline: {
        backgroundColor: "transparent",
        borderColor: "red",
        borderWidth: 1
    },
    rounded: {
        borderRadius: 20,
        padding: 15
    },
    small: { padding: 8 },
    smallText: { fontSize: 14 },
    medium: { padding: 10 },
    mediumText: { fontSize: 16 },
    large: { padding: 15 },
    largeText: { fontSize: 20 }
});

export default Button;