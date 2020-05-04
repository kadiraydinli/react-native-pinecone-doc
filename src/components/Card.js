import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native';
import { Text, Button } from '.';

const Card = (props) => {
    const {
        type, //elevated, outlined
        title,
        titleStyle,
        description,
        descriptionStyle,
        supportText,
        supportTextStyle,
        image,
        imageStyle,
        imageTitle,
        imageTitleStyle,
        onPress,
        onLongPress,
        underlayColor,
        actionButtonText,
        actionButtonOnPress,
        actionButtonStyle,
        actionButtonProps,
        bottomContainer,
        bottomContainerStyle,
        disabled,
        containerStyle,
        ...rest
    } = props;

    const selectedType = [
        type === "elevated" && { elevation: 1 },
        type === "outlined" && { borderWidth: 1, borderColor: "gray", borderRadius: 4 }
    ];

    return (
        <TouchableHighlight disabled={disabled} onPress={onPress} onLongPress={onLongPress}
            underlayColor={underlayColor} {...rest}
            style={StyleSheet.flatten([styles.container, selectedType, containerStyle, {width: imageStyle.width},
            disabled ? { opacity: .3 } : { opacity: 1 }])}>
            <>
                {image &&
                    <View>
                        <Image source={image} style={StyleSheet.flatten([{ width: 200, height: 150 }, imageStyle])} {...rest} />
                        <Text style={StyleSheet.flatten([styles.imageTitle, imageTitleStyle])}>{imageTitle}</Text>
                    </View>}
                <View style={styles.textContainer}>
                    <Text style={StyleSheet.flatten([styles.title, titleStyle])}>{title}</Text>
                    {description ?
                        <Text style={StyleSheet.flatten([styles.description, descriptionStyle])}>{description}</Text> : null}
                    {supportText ?
                        <Text style={StyleSheet.flatten([styles.supportText, supportTextStyle])}>{supportText}</Text> : null}
                </View>
                {bottomContainer || actionButtonOnPress &&
                    <View style={StyleSheet.flatten([styles.bottomContainer, bottomContainerStyle])}>
                        {bottomContainer ? bottomContainer :
                        <Button title={actionButtonText} type="transparent" color="#6701EB" style={actionButtonStyle}
                                onPress={actionButtonOnPress} {...actionButtonProps} />}
                    </View>}
            </>
        </TouchableHighlight>
    )
};

Card.propTypes = {
    /** Kart tipi (elevated, outlined) */
    type: PropTypes.string,
    /** Kart başlığı */
    title: PropTypes.string,
    /** Kart başlık stili */
    titleStyle: PropTypes.object,
    /** İçerik */
    description: PropTypes.string,
    /** İçerik stili */
    descriptionStyle: PropTypes.object,
    /** Destek metini */
    supportText: PropTypes.string,
    /** Destek metin stili */
    supportTextStyle: PropTypes.object,
    /** Karta görüntü ekleme */
    image: PropTypes.object,
    /** Görüntü stili */
    imageStyle: PropTypes.object,
    /** Görüntü başlığı */
    imageTitle: PropTypes.string,
    /** Görüntü başlık stili  */
    imageTitleStyle: PropTypes.object,
    /** Bileşene dokununca gerçekleşecek işlem */
    onPress: PropTypes.func,
    /** Bileşene uzun dokununca gerçekleşecek işlem */
    onLongPress: PropTypes.func,
    /** Bileşene uzun dokunulurken görünecek renk */
    underlayColor: PropTypes.string,
    /** Action buton başlığı */
    actionButtonText: PropTypes.string,
    /** Action butona dokunulunca gerçekleşek işlem */
    actionButtonOnPress: PropTypes.func,
    /** Action buton stili */
    actionButtonStyle: PropTypes.object,
    /** Action butona özel sahne donanımları ekleme */
    actionButtonProps: PropTypes.object,
    /** Alt bölüme isteğe bağlı olarak element ekleme Örnek: <Text>Hello World</Text> */
    bottomContainer: PropTypes.element,
    /** Alt bölüm stili */
    bottomContainerStyle: PropTypes.object,
    /** Kullanıcı etkileşimi devre dışı bırakır. */
    disabled: PropTypes.bool,
    /** Genel stil */
    containerStyle: PropTypes.object
};

Card.defaultProps = {
    type: "elevated",
    imageStyle: { width: 200, height: 150 },
    underlayColor: "transparent",
    actionButtonText: "OK",
    disabled: false
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        borderRadius: 4,
        overflow: "hidden"
    },
    textContainer: {
        justifyContent: "center",
        padding: 16,
    },
    bottomContainer: {
        alignItems: "flex-start",
        paddingLeft: 16,
        paddingBottom: 10,
        paddingRight: 16,
    },
    title: {
        fontSize: 21,
        fontWeight: "bold",
        color: "#000000de"
    },
    description: {
        fontSize: 17,
        color: "#00000099"
    },
    supportText: {
        fontSize: 15,
        color: "#00000099",
        marginTop: 15
    },
    imageTitle: {
        position: "absolute",
        bottom: 0,
        fontSize: 25,
        paddingLeft: 16,
        padding: 5
    }
});

export default Card;