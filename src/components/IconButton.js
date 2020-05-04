import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Platform, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Icon } from ".";

const IconButton = (props) => {
    const {
        name,
        size,
        color,
        backgroundColor,
        onPress,
        onLongPress,
        underlayColor,
        raised,
        disabled,
        type,
        Component = onPress ? (onLongPress ? TouchableHighlight : TouchableOpacity) :
            onLongPress ? TouchableHighlight : View,
        privateSize, //{x, y}
    } = props;

    const privateSizeValue = privateSize ? privateSize : size * 2;

    return (
        <Component disabled={disabled} onPress={onPress} onLongPress={onLongPress} underlayColor={underlayColor}
            style={[{ width: privateSizeValue, height: privateSizeValue, backgroundColor: backgroundColor },
            styles.IconButton, raised && styles.raised, disabled && styles.disabled]}>
            <Icon name={name} size={size} color={disabled ? "#000" : color} type={type} />
        </Component>
    )
};

IconButton.propTypes = {
    /** Ikon ismi */
    name: PropTypes.string.isRequired,
    /** Ikon boyutu */
    size: PropTypes.number,
    /** Ikon rengi */
    color: PropTypes.string,
    /** Arkaplan rengi */
    backgroundColor: PropTypes.string,
    /** Dokununca gerçekleşecek işlem */
    onPress: PropTypes.func,
    /** Bileşene uzun dokununa gerçekleşecek işlem */
    onLongPress: PropTypes.func,
    /** Bileşen uzun dokunurken bileşenin rengi */
    underlayColor: PropTypes.string,
    /** Bileşen gölgesi */
    raised: PropTypes.bool,
    /** Kullanıcı etkileşimini devre dışı bırakır */
    disabled: PropTypes.bool,
    /** Ikon tipi */
    type: PropTypes.string
};

IconButton.defaultProps = {
    name: "",
    size: 30,
    color: "black",
    underlayColor: "transparent",
    raised: false,
    disabled: false,
    type: "FontAwesome"
};

const styles = StyleSheet.create({
    IconButton: {
        justifyContent: "center",
        alignItems: "center"
    },
    raised: {
        padding: 12,
        borderRadius: 200,
        ...Platform.select({
            android: {
                elevation: 2
            },
            ios: {}
        }),
    },
    disabled: {
        opacity: 0.3
    }
});

export default IconButton;