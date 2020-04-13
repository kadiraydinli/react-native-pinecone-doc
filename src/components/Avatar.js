import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import {Text} from '..';

const avatarSizes = {
    small: 50,
    medium: 70,
    large: 100
};

const Avatar = (props) => {
    const {
        source,
        onPress,
        Component = onPress ? TouchableOpacity : View,
        size,
        value,
        valueStyle,
        icon,
        avatarStyle,
        type,
        avatarMini,
        avatarMiniPosition,
        avatarMiniOnPress,
        MiniComponent = avatarMiniOnPress ? TouchableOpacity : View,
        style,
    } = props;

    const width = size ? avatarSizes[size] : 50;
    const fontSize = width / 2;

    const selectedType = [
        type == "square" && { borderRadius: 3 },
        type == "rounded" && { borderRadius: 70 }
    ];

    const avatarMiniStyle = { width: width / 3, height: width / 3, position: "absolute" };

    const avatarMiniPositionStyle = [
        avatarMiniPosition == "topLeft" && { alignSelf: "flex-start", top: 0},
        avatarMiniPosition == "topRight" && { alignSelf: "flex-end", top: 0}, 
        avatarMiniPosition == "bottomLeft" && { alignSelf: "flex-start", bottom: 0}, 
        avatarMiniPosition == "bottomRight" && { alignSelf: "flex-end", bottom: 0},
    ];
    
    const selectedComponent = (
        (value && (<Text fontSize={fontSize} color="white" style={valueStyle}>{value}</Text>) || 
            source && (<Image source={source} style={
                StyleSheet.flatten([{width: width, height: width}, selectedType, avatarStyle])} />))
    );

    return(
        <Component onPress={onPress} 
            style={StyleSheet.flatten([styles.Avatar, {width: width, height: width}, selectedType, style])}>
            {selectedComponent}
            <MiniComponent onPress={avatarMiniOnPress} 
                style={[avatarMiniStyle, avatarMiniPositionStyle]}>{avatarMini}</MiniComponent>
        </Component>
    )
};

Avatar.propTypes = {
    /** Görüntü kaynağı */
    source: PropTypes.object,
    /** Bileşene dokununca olacak işlev */
    onPress: PropTypes.func,
    Component: PropTypes.oneOf([View, TouchableOpacity]),
    /** Avatar boyutu */
    size: PropTypes.oneOf(["small", "medium", "large"]),
    /** Avatar metni */
    value: PropTypes.string,
    /** Avatar metin stili */
    valueStyle: PropTypes.object,
    /** Icon */
    icon: PropTypes.object,
    /** Avatar stili */
    avatarStyle: PropTypes.object,
    /** Avatar tipi */
    type: PropTypes.oneOf(["square", "rounded"]),
    /** Avatar'ın istenilen köşesine istenilen bileşenin koyulmasını sağlar. */
    avatarMini: PropTypes.element,
    /** Avatar mininin pozisyonu */
    avatarMiniPosition: PropTypes.string,
    /** Avatar miniye dokununca olacak işlev */
    avatarMiniOnPress: PropTypes.func,
    MiniComponent: PropTypes.oneOf([View, TouchableOpacity]),
    /** Genel stil */
    style: PropTypes.object
};

Avatar.defaultProps = {
    source: {},
    size: "medium",
    value: "",
    valueStyle: {},
    icon: {},
    avatarStyle: {},
    type: "rounded",
    avatarMiniPosition: "bottomRight",
    style: {}
};

const styles = StyleSheet.create({
    Avatar: {
        backgroundColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3
    }
});

export default Avatar;