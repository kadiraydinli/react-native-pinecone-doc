import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from '..';

const Card = (props) => {
    const {
        type,
        title,
        titleStyle,
        content,
        contentStyle,
        image,
        imageStyle,
        imageTitle,
        omer,
        imageTitleStyle,
        //imageProps,
        shadow,
        shadowStyle,
        onPress,
        containerStyle,
        ...rest
    } = props;

    /*const selectedType = (
        type == "1" && 
    )*/

    const widthValue = imageStyle.width;

    return (
        <TouchableOpacity onPress={onPress} {...rest}
            style={StyleSheet.flatten([styles.Card, {width: widthValue, elevation: shadow}, containerStyle])}>
            <View>
                <Image source={image} style={imageStyle} {...rest} />
                <Text style={[styles.imageTitle, imageTitleStyle]}>{imageTitle}</Text>
            </View>
            <Text style={StyleSheet.flatten([styles.title, titleStyle])}>{title}</Text>
            <Text style={contentStyle}>{content}</Text>
        </TouchableOpacity>
    )
};

Card.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    content: PropTypes.string,
    contentStyle: PropTypes.object,
    image: PropTypes.object,
    imageStyle: PropTypes.object,
    imageTitle: PropTypes.string,
    imageTitleStyle: PropTypes.object,
    //imageProps: PropTypes.object,
    shadow: PropTypes.number,
    shadowStyle: PropTypes.object,
    onPress: PropTypes.func,
    containerStyle: PropTypes.object
};

Card.defaultProps = {
    type: "1",
    title: "",
    titleStyle: {},
    content: "",
    contentStyle: {},
    image: {},
    imageStyle: {width: 200, height: 150},
    imageTitle: "",
    imageTitleStyle: {},
    shadow: 2,
    shadowStyle: {},
    containerStyle: {}
};

const styles = StyleSheet.create({
    Card: {
        alignItems: "center",
        //width: "60%",
        justifyContent: "center",
        backgroundColor: "#F5F5F5",
        borderRadius: 1,
        padding: 5
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "flex-start"
    },
    imageTitle: {
        position: "absolute",
        bottom: 0,
        fontSize: 25,
        padding: 5
    }
});

export default Card;