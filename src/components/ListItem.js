import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { Text, IconButton, Avatar } from '.';

const ListItem = (props) => {
    const {
        title,
        titleStyle,
        titleProps,
        description,
        descriptionStyle,
        descriptionProps,
        onPress,
        onLongPress,
        Component = onPress || onLongPress ? TouchableHighlight : View,
        backgroundColor,
        underlayColor,
        left,
        leftIcon,
        leftIconProps,
        leftAvatar,
        leftAvatarProps,
        right,
        rightIcon,
        rightIconProps,
        rightText,
        rightTextStyle,
        rightTextProps,
        bottomDivider,
        topDivider,
        disabled
    } = props;

    const selectedForLeft = (
        left && left ||
        leftIcon && (<IconButton privateSize={leftIcon.size || 24} name={leftIcon.name}
            color={leftIcon.color} size={leftIcon.size || 24} type={leftIcon.type} onPress={leftIcon.onPress}
            onLongPress={leftIcon.onLongPress} underlayColor={leftIcon.underlayColor}
            {...leftIconProps} />) ||
        leftAvatar && (<Avatar source={leftAvatar.source} value={leftAvatar.value}
            valueStyle={leftAvatar.valueStyle} type={leftAvatar.type} backgroundColor={leftAvatar.backgroundColor}
            size={leftAvatar.size || 40} onPress={onPress} {...leftAvatarProps} />)
    );

    const selectedForRight = (
        right && right ||
        rightIcon && (<IconButton privateSize={rightIcon.size || 24} name={rightIcon.name} color={rightIcon.color}
            size={rightIcon.size} type={rightIcon.type} onPress={rightIcon.onPress} onLongPress={rightIcon.onLongPress}
            underlayColor={rightIcon.underlayColor} {...rightIconProps} />) ||
        rightText && (<Text style={StyleSheet.flatten([styles.rightText, rightTextStyle])} {...rightTextProps}>{rightText}</Text>)
    );

    const divider = [
        bottomDivider && { borderBottomWidth: StyleSheet.hairlineWidth },
        topDivider && { borderTopWidth: StyleSheet.hairlineWidth },
    ];

    return (
        <Component disabled={disabled}
            style={[styles.container, { borderColor: "#D1D1D6" },
            disabled ? { backgroundColor: "#000", opacity: .3 } : { backgroundColor: backgroundColor, opacity: 1 },
                divider]}
            onPress={onPress} onLongPress={onLongPress} underlayColor={underlayColor}>
            <>
                {(left || leftIcon || leftAvatar) &&
                    <View style={{ marginRight: leftIcon && leftIcon.size <= 24 ? 32 : 16 }}>
                        {selectedForLeft}
                    </View>}
                <View style={{ flex: 1 }}>
                    <Text style={StyleSheet.flatten([styles.title, titleStyle])} {...titleProps}>{title}</Text>
                    {description &&
                        <Text style={StyleSheet.flatten([styles.description, descriptionStyle])} {...descriptionProps}>{description}</Text>}
                </View>
                {(right || rightIcon || rightText) &&
                    <View style={{ marginLeft: rightText ? 28 : 16 }}>
                        {selectedForRight}
                    </View>}
            </>
        </Component>
    )
};

ListItem.propTypes = {
    /** Liste içerisindeki görüntülenecek başlık */
    title: PropTypes.string.isRequired,
    /** Liste başlığının stili */
    titleStyle: PropTypes.object,
    /** Liste başlığının özel bileşenleri */
    titleProps: PropTypes.object,
    /** Başlığın altında yer alan açıklama metini */
    description: PropTypes.string,
    /** Açıklama metninin stili */
    descriptionStyle: PropTypes.object,
    /** Açıklama metninin özel bileşenleri */
    descriptionProps: PropTypes.object,
    /** Dokunulunca gerçekleşecek işlem */
    onPress: PropTypes.func,
    /** Uzun dokunulunca gerçekleşecek işlem */
    onLongPress: PropTypes.func,
    /** Arka plan rengi */
    backgroundColor: PropTypes.string,
    /** Uzun dokunulurken görünecek renk */
    underlayColor: PropTypes.string,
    /** ListItem'ın sol element */
    left: PropTypes.element,
    /** Sol ikon {name, color, size, type, onPress, onLongPress, underlayColor} */
    leftIcon: PropTypes.object,
    /** Sol Icon bileşeninin özel sahne donanımları */
    leftIconProps: PropTypes.object,
    /** Sol Avatar {source, value, valueStyle, type, backgroundColor, size, onPress} */
    leftAvatar: PropTypes.object,
    /** Sol Avatar özel sahne donanımları */
    leftAvatarProps: PropTypes.object,
    /** ListItem'ın sağ element */
    right: PropTypes.element,
    /** Sağ ikon {name, color, size, type, onPress, onLongPress, underlayColor} */
    rightIcon: PropTypes.object,
    /** Sağ Icon bileşeninin özel sahne donanımları */
    rightIconProps: PropTypes.object,
    /** Sağ küçük metin */
    rightText: PropTypes.string,
    /** Sağ küçük metin stili */
    rightTextStyle: PropTypes.object,
    /** Sağ küçük metin için Text bileşeninin özel sahne donanımları */
    rightTextProps: PropTypes.object,
    /** Alt ayırıcı */
    bottomDivider: PropTypes.bool,
    /** Üst ayırıcı */
    topDivider: PropTypes.bool,
    /** Kullanıcı ile etkileşimi devre dışı bırakır */
    disabled: PropTypes.bool
};

ListItem.defaultProps = {
    underlayColor: "gray",
    backgroundColor: "white",
    disabled: false
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        minHeight: 48,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12
    },
    title: {
        fontSize: 16,
        color: "#000000de"
    },
    description: {
        fontSize: 14,
        color: "#00000099"
    },
    rightText: {
        fontSize: 12,
        color: "#00000099"
    }
});

export default ListItem;