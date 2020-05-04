import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated, TextInput } from 'react-native';
import { Text, IconButton } from '.';

const Input = (props) => {
    const {
        type,
        label,
        labelColor,
        labelStyle,
        value,
        onChangeText,
        placeholder,
        selectionColor,
        backgroundColor,
        helperText,
        helperTextStyle,
        errorText,
        errorTextStyle,
        characterCounter,
        maxLength,
        disabled,
        disabledColor,
        leftIcon, //{name, color, size, type, onPress}
        rightIcon, //{name, color, size, type, onPress}
        ...rest
    } = props;

    const [isFocused, setIsFocused] = useState(false);

    const [animation] = useState(new Animated.Value(0));

    const editedLabel = label.length >= 40 ? label.substring(0, 39) + "...   " : label

    const editedColor = !disabled ? (errorText ? "#b00020ff" : labelColor) : disabledColor

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isFocused || value != '' ? 1 : 0,
            duration: 200,
            useNativeDriver: false
        }).start();
        return () => {
            animation.stopAnimation();
        }
    }, [isFocused]);

    const handleFocus = () => {
        if (disabled || !props.editable) return;
        setIsFocused(true)
    };
    const handleBlur = () => {
        if (disabled || !props.editable) return;
        setIsFocused(false)
    };

    const labelPosition = {
        position: "absolute",
        left: leftIcon ? (type == "outlined" && isFocused ? 12 : 36) : 12,
        top: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [13, type == "outlined" ? -12 : 0]
        })
    };

    const outlinedStyle = {
        paddingLeft: 2,
        paddingRight: 2,
        fontSize: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 14]
        }),
        color: animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["#aaa", editedColor]
        }),
    };

    const selectionType = (
        type == "outlined" ? {
            borderRadius: 4,
            borderWidth: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 2]
            }),
            borderColor: animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['#7F7F7F', editedColor]
            })
        } : {
                borderBottomWidth: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 2]
                }),
                borderBottomColor: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#7F7F7F', editedColor]
                })
            }
    )

    return (
        <View style={[styles.container]}>
            <Animated.View style={[selectionType, { paddingTop: 5, backgroundColor: backgroundColor }]}>
                <Animated.View style={labelPosition}>
                    {(type == "outlined" && (isFocused || value.length != 0) && label.length != 0) &&
                        <View style={[styles.labelBackground, { backgroundColor: backgroundColor }]} />
                    }
                    <Animated.Text style={[outlinedStyle, labelStyle]}>
                        {editedLabel}
                    </Animated.Text>
                </Animated.View>
                <View style={styles.body}>
                    {leftIcon && <IconButton name={leftIcon.name} color={!disabled ? (errorText ? editedColor : leftIcon.color) : disabledColor} privateSize={24} size={24}
                        type={leftIcon.type} onPress={leftIcon.onPress} />}
                    <TextInput
                        {...rest}
                        placeholder={!isFocused ? "" : placeholder}
                        backgroundColor="transparent"
                        style={[styles.input, disabled && { color: disabledColor }]}
                        value={(!disabled || props.editable) && value}
                        onChangeText={(!disabled || props.editable) && onChangeText}
                        editable={!disabled}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        maxLength={maxLength}
                        blurOnSubmit
                    />
                    {rightIcon && <IconButton name={rightIcon.name} color={!disabled ? (errorText ? editedColor : rightIcon.color) : disabledColor} privateSize={24} size={24}
                        type={rightIcon.type} onPress={rightIcon.onPress} />}
                </View>
            </Animated.View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingLeft: 12, paddingRight: 8 }}>
                <Text style={{ color: !disabled ? (errorText ? "#b00020ff" : "#000") : disabledColor }, helperTextStyle, errorTextStyle}>{helperText || errorText}</Text>
                {characterCounter && <Text>{value.length} / {maxLength}</Text>}
            </View>
        </View>
    )
};

Input.propTypes = {
    /** Input tipi */
    type: PropTypes.oneOf(["filled", "outlined"]),
    /** Inputun üst kısmına etiket ekleme */
    label: PropTypes.string,
    /** Etiket rengi */
    labelColor: PropTypes.string,
    /** Etiket stili */
    labelStyle: PropTypes.object,
    /** Input değeri */
    value: PropTypes.string,
    /** Input içerisindeki metin değiştiğinde gerçekleşek işlem */
    onChangeText: PropTypes.func,
    /** Metin girişi olmadan önceki görünecek metin */
    placeholder: PropTypes.string,
    /** Seçilen yazının rengi */
    selectionColor: PropTypes.string,
    /** Arkaplan rengi */
    backgroundColor: PropTypes.string,
    /** Yardımcı metin */
    helperText: PropTypes.string,
    /** Yardımcı metin stili */
    helperTextStyle: PropTypes.object,
    /** Hata metni */
    errorText: PropTypes.string,
    /** Hata metni stili */
    errorTextStyle: PropTypes.object,
    /** Karakter sayacı */
    characterCounter: PropTypes.bool,
    /** Maksimum karakter uzunluğu */
    maxLength: PropTypes.number,
    /** Kullanıcı etkileşimini devre dışı bırakır */
    disabled: PropTypes.bool,
    /** Devre dışı olduğunundaki rengi */
    disabledColor: PropTypes.string,
    /** Input'un soluna ikon yerleştirir {name, color, size, type, onPress} */
    leftIcon: PropTypes.object,
    /** Input'un sağına ikon yerleştirir {name, color, size, type, onPress} */
    rightIcon: PropTypes.object,
};

Input.defaultProps = {
    type: "filled",
    label: "",
    labelColor: "blue",
    selectionColor: "blue",
    backgroundColor: "white",
    characterCounter: false,
    disabled: false,
    disabledColor: "#B3B3B3",
    editable: true
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 5,
    },
    body: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 12,
        paddingRight: 12
    },
    input: {
        flex: 1,
        minHeight: 40,
        fontSize: 18,
        color: '#000'
    },
    labelBackground: {
        width: "100%",
        height: "50%",
        position: "absolute",
        bottom: 0
    }
});

export default Input;