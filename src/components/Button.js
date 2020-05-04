import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, TouchableHighlight, ActivityIndicator, Platform } from 'react-native';
import { Text, Icon } from '.';
import Colors from '../config/Colors';

const Button = (props) => {
    const {
        title,
        titleStyle,
        type,
        loading,
        loadingStyle,
        disabled,
        leftIcon, //{name, color, size, type, onPress}
        rightIcon, //{name, color, size, type, onPress}
        onPress,
        onLongPress,
        onLongPressIn,
        onLongPressOut,
        shadow,
        opacity,
        Component = onLongPress ? TouchableHighlight : TouchableOpacity,
        color,
        underlayColor,
        size,
        primary,
        success,
        info,
        warning,
        danger,
        style
    } = props;

    const selected = (
        StyleSheet.flatten([primary && { backgroundColor: Colors.primary }, success && { backgroundColor: Colors.success },
        info && { backgroundColor: Colors.info }, warning && { backgroundColor: Colors.warning },
        danger && { backgroundColor: Colors.danger }])
    );

    const shadowValue = (
        typeof shadow == 'number' ? {
            ...Platform.select({
                android: { elevation: shadow },
                ios: { /*shadowOffSet: {
                    width: 1, height: 1
                }*/ }
            })
        } : typeof shadow == 'boolean' ? styles.shadow : null
    )

    let STYLES = {
        button: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            padding: 10,
            backgroundColor: color
        },
        outline: {
            backgroundColor: "transparent",
            borderColor: color,
            borderWidth: 1
        },
    }

    return (
        <Component disabled={disabled} style={StyleSheet.flatten([STYLES.button,
        type == "default" && styles.default, type == "transparent" && styles.transparent,
        type == "outline" && STYLES.outline, type == "rounded" && styles.rounded,
        size == "small" && styles.small, size == "medium" && styles.medium,
        size == "large" && styles.large, shadowValue, selected,
            { opacity: disabled ? .3 : 1 }, disabled && { backgroundColor: "#000" }, style
        ])} onPress={!loading ? onPress : null}
            onLongPress={!loading ? onLongPress : null} onShowUnderlay={onLongPressIn}
            onHideUnderlay={onLongPressOut} activeOpacity={opacity} underlayColor={underlayColor}>
            {loading ? (
                <ActivityIndicator {...loadingStyle} animating={true} />
            ) : (
                    <>
                        {leftIcon &&
                            <Icon name={leftIcon.name} color={leftIcon.color ? leftIcon.color : "white"} size={leftIcon.size}
                                type={leftIcon.type} style={{ right: 5 }} />}
                        <Text style={StyleSheet.flatten([{ color: "white" },
                        size == "small" && styles.smallText,
                        size == "medium" && styles.mediumText,
                        size == "large" && styles.largeText,
                        type == "outline" && { color: color },
                        type == "transparent" && { color: color }, disabled && { color: "#000" }, titleStyle])}>{title}</Text>
                        {rightIcon && <Icon name={rightIcon.name} color={rightIcon.color ? rightIcon.color : "white"} size={rightIcon.size}
                            type={rightIcon.type} style={{ left: 5 }} />}
                    </>
                )}
        </Component>
    )
};

Button.propTypes = {
    /** Buton başlığı */
    title: PropTypes.string,
    /** Buton başlık stili */
    titleStyle: PropTypes.object,
    /** Buton tipi */
    type: PropTypes.oneOf(["default", "transparent", "outline", "rounded"]),
    /** Yükleniyor (Spinner)  */
    loading: PropTypes.bool,
    /** Yükleniyor (Spinner) stili */
    loadingStyle: PropTypes.object,
    /** Kullanıcı etkileşimini devre dışı bırakır */
    disabled: PropTypes.bool,
    /** Buton başlığının soluna ikon yerleştirir. {name, color, size, type, onPress} */
    leftIcon: PropTypes.object,
    /** Buton başlığının sağına ikon yerleştirir. {name, color, size, type, onPress} */
    rightIcon: PropTypes.object,
    /** Bileşene dokununa gerçekleşecek işlem */
    onPress: PropTypes.func,
    /** Bileşene uzun dokununa gerçekleşecek işlem */
    onLongPress: PropTypes.func,
    /** Bileşene uzun dokunmaya başlarken gerçekleşek işlem */
    onLongPressIn: PropTypes.func,
    /** Bileşene uzun dokunduktan sonra bırakıldığında gerçekleşek işlem */
    onLongPressOut: PropTypes.func,
    /** Buton gölge */
    shadow: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    /** Buton opaklığı */
    opacity: PropTypes.number,
    /** Buton rengi */
    color: PropTypes.string,
    /** Butona uzun dokunurken butonun rengi */
    underlayColor: PropTypes.string,
    /** Buton boyutu */
    size: PropTypes.oneOf(["small", "medium", "large"]),
    /** Özel renkler */
    primary: PropTypes.bool,
    /** Özel renkler */
    success: PropTypes.bool,
    /** Özel renkler */
    info: PropTypes.bool,
    /** Özel renkler */
    warning: PropTypes.bool,
    /** Özel renkler */
    danger: PropTypes.bool,
    /** Genel stil */
    style: PropTypes.object
};

Button.defaultProps = {
    title: '',
    titleStyle: {},
    type: "default",
    loading: false,
    loadingStyle: {},
    disabled: false,
    shadow: 0,
    opacity: 0.8,
    color: "blue",
    underlayColor: "#DCDCDC",
    size: "medium",
    primary: false,
    success: false,
    info: false,
    warning: false,
    danger: false,
    style: {}
};

const styles = StyleSheet.create({
    shadow: {
        ...Platform.select({
            android: {
                elevation: 1
            },
            ios: {
                /*shadowOffSet: {
                    width: 1,
                    height: 1
                }*/
            }
        })
    },
    default: {
    },
    transparent: {
        backgroundColor: "transparent"
    },
    /*outline: {
        backgroundColor: "transparent",
        borderColor: "blue",
        borderWidth: 1
    },*/
    rounded: {
        borderRadius: 30,
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