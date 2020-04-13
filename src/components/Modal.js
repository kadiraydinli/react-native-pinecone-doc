import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Modal as RNModal, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Text } from '..';

const width = Dimensions.get('window').width;

const Modal = (props) => {
    const {
        children,
        visible,
        width,
        height,
        backgroundColor,
        backgroundImage,
        backgroundImageStyle,
        borderStyle,
        onRequestClose,
        shadow,
        containerStyle,
        ...rest
    } = props;

    return (
        <RNModal visible={visible} animationType="fade" onRequestClose={onRequestClose} transparent {...rest}>
            <View style={{ flex: 1, justifyContent: "center" }}>
                <TouchableOpacity style={styles.touch} onPress={onRequestClose} />
                <View style={StyleSheet.flatten([styles.Modal, {backgroundColor: backgroundColor, borderWidth: borderStyle.thickness, 
                    borderRadius: borderStyle.radius, borderColor: borderStyle.color}])}>
                        <Image source={backgroundImage} style={[{width: width, height: "100%", borderRadius: borderStyle.radius, position: "absolute"}, backgroundImageStyle]} />
                    {children}
                </View>
            </View>
        </RNModal>
    )
};

Modal.propTypes = {
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    borderStyle: PropTypes.object,
    onRequestClose: PropTypes.func,
    containerStyle: PropTypes.object
};

Modal.defaultProps = {
    visible: false,
    width: width / 1.3,
    height: null,
    backgroundColor: "white",
    borderStyle: {thickness: 1, color: "transparent", radius: 10},
    onRequestClose: {},
    containerStyle: {}
};

const styles = StyleSheet.create({
    Modal: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        width: width / 1.3,
        borderRadius: 8,
        position: "absolute",
        elevation: 2
    },
    view: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2A2E43",
        padding: 10,
        width: "90%",
        borderRadius: 10,
        position: "absolute"
    },
    touch: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(128, 128, 128, 0.9)"
    }
});

export default Modal;