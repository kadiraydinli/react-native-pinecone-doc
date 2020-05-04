import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Text, Icon } from ".";

const CheckBox = (props) => {
    const {
        iconType,
        iconProps,
        size,
        checked,
        title,
        titleLeft,
        titleColor,
        titleStyle,
        titleProps,
        onPress,
        color,
        checkedColor,
        uncheckedColor,
        checkedIcon,
        uncheckedIcon,
        disabled
    } = props;

    const CONTAINER = {
        flexDirection: titleLeft ? "row-reverse" : "row",
        justifyContent: "center",
        alignItems: "center",
        opacity: disabled ? .3 : 1,
        padding: 5
    };

    const ICON_STYLE = {
        width: size * 1.5,
        height: size * 1.5,
        justifyContent: "center",
        alignItems: "center"
    };

    return (
        <TouchableOpacity disabled={disabled} onPress={() => onPress(!checked)} style={CONTAINER}>
            <Icon {...iconProps}
                name={checked ? (checkedIcon ? checkedIcon : "check-square") :
                    (uncheckedIcon ? uncheckedIcon : "square-o")}
                type={iconType}
                color={disabled ? "#000" : (color ? color : (checked ? checkedColor : uncheckedColor))}
                size={size}
                style={ICON_STYLE} />
            <Text style={{ color: disabled ? "#000" : titleColor }, titleStyle} {...titleProps}>{title}</Text>
        </TouchableOpacity>
    )
};

CheckBox.propTypes = {
    /** İkon tipi */
    iconType: PropTypes.string,
    /** İkon bileşeninin özel sahne donanımlarına erişme */
    iconProps: PropTypes.object,
    /** CheckBox işaretli olup olmaması */
    checked: PropTypes.bool.isRequired,
    /** CheckBox başlığı */
    title: PropTypes.string,
    /** Başlığı sola taşır */
    titleLeft: PropTypes.bool,
    /** Başlık rengi */
    titleColor: PropTypes.string,
    /** Başlık stili */
    titleStyle: PropTypes.object,
    /** Başlık bileşeninin özel sahne donanımlarına erişme */
    titleProps: PropTypes.object,
    /** Dokununca gerçekleşecek işlem */
    onPress: PropTypes.func,
    /** Arkaplan rengi */
    color: PropTypes.string,
    /** checked true olduğunda ikonun rengi */
    checkedColor: PropTypes.string,
    /** checked false olduğunda ikonun rengi */
    uncheckedColor: PropTypes.string,
    /** checked true olduğunda ikon */
    checkedIcon: PropTypes.string,
    /** checked false olduğunda ikon */
    uncheckedIcon: PropTypes.string,
    /** Kullanıcı etkileşimini devre dışı bırakır */
    disabled: PropTypes.bool,
    /** Bileşenin boyutu */
    size: PropTypes.number
};

CheckBox.defaultProps = {
    iconType: "FontAwesome",
    checked: false,
    titleLeft: false,
    checkedColor: "#000",
    uncheckedColor: "#000",
    disabled: false,
    size: 24
};

export default CheckBox;