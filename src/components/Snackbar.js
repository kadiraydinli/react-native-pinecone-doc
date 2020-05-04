import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated, Easing, Platform } from 'react-native';
import { Text, Button } from '.';

const Snackbar = (props) => {
    const {
        visible,
        text,
        textStyle,
        backgroundColor,
        position,
        actionOnPress,
        actionText,
        actionTextStyle,
        actionStyle
    } = props;

    const [animation] = useState(new Animated.Value(-50));

    const durationValues = {
        visible: 225,
        inVisible: 195
    }

    const positionValue = (
        position == "bottom" ? { marginBottom: animation, bottom: 0 } :
            position == "top" ? { marginTop: animation, top: 0 } : null
    );

    useEffect(() => {
        Animated.timing(animation, {
            toValue: visible ? (Platform.OS == "android" ? 20 : 0) : -100,
            duration: visible ? durationValues.visible : durationValues.inVisible,
            easing: Easing.linear,
            useNativeDriver: false
        }).start();
        return () => {
            animation.stopAnimation();
        }
    }, [visible]);

    return (
        <Animated.View style={[styles.container, positionValue]}>
            <View style={[styles.view, { backgroundColor: backgroundColor }]}>
                <Text style={StyleSheet.flatten([styles.text, textStyle])}>{text}</Text>
                <Button opacity={0.5} onPress={actionOnPress} title={actionText}
                    type="transparent" style={actionStyle} titleStyle={actionTextStyle} />
            </View>
        </Animated.View>
    )
};

Snackbar.propTypes = {
    /** Bileşenin görünür olup olmaması */
    visible: PropTypes.bool,
    /** Bileşen içerisindeki metin */
    text: PropTypes.string,
    /** Metin stili */
    textStyle: PropTypes.object,
    /** Arkaplan rengi */
    backgroundColor: PropTypes.string,
    /** Bileşenin konumu */
    position: PropTypes.oneOf(["top", "bottom"]),
    /** Eylem butonuna dokununca gerçekleşecek işlem */
    actionOnPress: PropTypes.func,
    /** Eylem butonunun metini */
    actionText: PropTypes.string,
    /** Eylem butonunun metin stili */
    actionTextStyle: PropTypes.object,
    /** Eylem butonunun stili */
    actionStyle: PropTypes.object,
};

Snackbar.defaultProps = {
    text: "",
    textStyle: { color: "#ffffffde", fontSize: 14 },
    backgroundColor: "#000000dd",
    position: "bottom",
    actionOnPress: () => { },
    actionText: "ACTION",
    actionTextStyle: { color: "#BB86FC", fontSize: 14 },
    actionStyle: {},
};

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            android: {
                width: "95%",
                alignSelf: "center"
            },
            ios: { width: "100%" }
        }),
        position: "absolute"
    },
    view: {
        ...Platform.select({
            android: {
                borderRadius: 4,
                elevation: 3
            }
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
    },
    text: {
        flex: 2,
        flexWrap: "wrap",
        alignContent: "stretch"
    }
});

export default Snackbar;