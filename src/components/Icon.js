import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icons } from "../../src/config";

const Icon = (props) => {
    const {
        name,
        size,
        color,
        type,
        style
    } = props;

    const IconComponent = Icons(type || "FontAwesome");

    return (
        <View style={style}>
            <IconComponent name={name} size={size} color={color} />
        </View>
    )
};

Icon.propTypes = {
    /** Ikon ismi */
    name: PropTypes.string.isRequired,
    /** Boyut */
    size: PropTypes.number,
    /** Renk */
    color: PropTypes.string,
    /** Ikon tipi */
    type: PropTypes.string
};

Icon.defaultProps = {
    name: "",
    size: 24,
    color: "black",
    type: "FontAwesome"
};

export default Icon;