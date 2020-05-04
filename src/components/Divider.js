import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text } from '.';

const Divider = (props) => {
    const {
        title,
        titleColor,
        titleStyle,
        titlePosition,
        color,
        thickness,
        style
    } = props;

    const viewStyle = (
        StyleSheet.flatten([styles.divider, title && { margin: "3.5%" }, !title && { margin: 0 },
        { borderColor: color, borderBottomWidth: thickness }, style])
    );

    const titlePositionStyle = [
        titlePosition == "left" ? [{ width: "15%", }, { flex: 1 }] :
            titlePosition == "center" ? [{ flex: 1 }, { flex: 1 }] :
                titlePosition == "right" ? [{ flex: 1 }, { width: "15%" }] : null
    ]

    return (
        <View style={styles.container}>
            <View style={StyleSheet.flatten([viewStyle, titlePositionStyle[0][0]])} />
            <Text style={StyleSheet.flatten([{ color: color }, titleColor && { color: titleColor }, titleStyle])}>{title}</Text>
            <View style={StyleSheet.flatten([viewStyle, titlePositionStyle[0][1]])} />
        </View>
    )
};

Divider.propTypes = {
    /** Bileşen başlığı */
    title: PropTypes.string,
    /** Başlığın rengi */
    titleColor: PropTypes.string,
    /** Başlığın stili  */
    titleStyle: PropTypes.object,
    /** Başlığın konumu */
    titlePosition: PropTypes.oneOf(["left", "center", "right"]),
    /** Bileşen rengi */
    color: PropTypes.string,
    /** Divider kalınlığı */
    thickness: PropTypes.number,
    /** Genel stil */
    style: PropTypes.object
};

Divider.defaultProps = {
    //title: "",
    titleStyle: {},
    titlePosition: "center",
    thickness: 1,
    style: {}
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center"
    },
    divider: {
        margin: "3.5%",
        //width: "40%",
        //flex: 1,
        borderBottomWidth: 1,
        borderRadius: 1,
        height: StyleSheet.hairlineWidth,
    },
});

export default Divider;