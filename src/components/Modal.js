import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Modal as RNModal, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Text } from '.';

const width = Dimensions.get('window').width;

const Modal = (props) => {
    const {
        children,
        visible,
        width,
        height,
        backgroundColor,
        borderStyle, // {thickness, radius, color}
        onRequestClose,
        containerStyle,
        ...rest
    } = props;

    return (
        <RNModal visible={visible} animationType="fade" onRequestClose={onRequestClose} transparent {...rest}>
            <View style={{ flex: 1, justifyContent: "center" }}>
                <TouchableOpacity activeOpacity={1} style={styles.touch} onPress={onRequestClose} />
                <View style={StyleSheet.flatten([styles.content, {
                    backgroundColor: backgroundColor,
                    borderWidth: borderStyle.thickness, borderRadius: borderStyle.radius,
                    borderColor: borderStyle.color
                }])}>
                    {children}
                </View>
            </View>
        </RNModal>
    )
};

Modal.propTypes = {
    /** Bileşenin görünür olup olmaması */
    visible: PropTypes.bool,
    /** Bileşen genişliği */
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Bileşen yüksekliği */
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Arkaplan rengi */
    backgroundColor: PropTypes.string,
    /** Kenarlık stili {thickness, radius, color} */
    borderStyle: PropTypes.object,
    /** Geri düğmesine basınca gerçekleşecek işlem. Varsayılan olarak Modal'ı kapatıyor. */
    onRequestClose: PropTypes.func,
    /** Genel stil */
    containerStyle: PropTypes.object
};

Modal.defaultProps = {
    visible: false,
    width: width / 1.3,
    height: null,
    backgroundColor: "white",
    borderStyle: { thickness: 1, color: "transparent", radius: 10 },
    onRequestClose: () => {},
    containerStyle: {}
};

const styles = StyleSheet.create({
    content: {
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