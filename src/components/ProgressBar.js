import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { Text } from '.';

const INDETERMINATE_WIDTH_FACTOR = 0.3;
const BAR_WIDTH_ZERO_POSITION =
    INDETERMINATE_WIDTH_FACTOR / (1 + INDETERMINATE_WIDTH_FACTOR);

const ProgressBar = (props) => {
    const {
        value,
        maxValue,
        width,
        height,
        filledColor,
        unfilledColor,
        animated,
        indeterminate,
        text,
        showText,
        textStyle,
        textProps,
        borderStyle,
        containerStyle,
        onComplete,
        ...rest
    } = props;

    const [widthValue, setWidth] = useState(0);
    const [progressValue] = useState(new Animated.Value(indeterminate ? INDETERMINATE_WIDTH_FACTOR : value));
    const [indeterminateValue] = useState(new Animated.Value(BAR_WIDTH_ZERO_POSITION));

    function handledOnLayout({ nativeEvent }) {
        setWidth(nativeEvent.layout.width);
    };

    /*function indeterminateAnimation() {
        Animated.timing(indeterminateValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear
        }).start(x => {
            if(x.finished) {
                indeterminateAnimation();
            }
        });
    }*/

    useEffect(() => {
        if (indeterminate) {
            //indeterminateAnimation();
        }
        else {
            const percentage = value / maxValue;
            //const percentage = indeterminate ? 0.3 : Math.min(Math.max(value, 0), 1)
            //setPercent(new Animated.Value(percentage))
            const rowWidth = Math.max(0, Math.floor(widthValue * percentage - borderStyle.width));
            //progressV = rowWidth
            if (animated) {
                Animated.timing(progressValue, {
                    toValue: rowWidth,
                    useNativeDriver: false
                    //duration: 1000
                }).start();
            }
            else {
                progressValue(rowWidth);
            }
            if (value >= maxValue) {
                onComplete();
            }
        }
        return () => {
            progressValue.stopAnimation();
        }
    }, [value]);

    const ProgressBarStyle = {
        width: width,
        height: height,
        backgroundColor: unfilledColor,
        borderWidth: borderStyle.width,
        borderColor: borderStyle.color,
        borderRadius: borderStyle.radius,
        overflow: "hidden",
        justifyContent: "center"
    }

    return (
        <View onLayout={handledOnLayout} style={[ProgressBarStyle, containerStyle]} {...rest}>
            <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: filledColor, width: progressValue }]} />
            {showText ?
                <Text style={StyleSheet.flatten([{ textAlign: "center", color: "gray" }, textStyle])} {...textProps}>
                    {text ? text : value / maxValue * 100 + "%"}
                </Text>
                : null}
        </View>
    )
};

ProgressBar.propTypes = {
    /** ProgressBar değeri */
    value: PropTypes.number,
    /** Maksimum değer */
    maxValue: PropTypes.number,
    /** Bileşen genişliği */
    width: PropTypes.number,
    /** Bileşen yüksekliği */
    height: PropTypes.number,
    /** İlermenin olduğu dolu kısmın rngi */
    filledColor: PropTypes.string,
    /** İlermenin olmadığı boş kısmın rengi */
    unfilledColor: PropTypes.string,
    /** Animasoyunun olup olmaması */
    animated: PropTypes.bool,
    /** ProgressBar belirsiz şekilde ilerleme gösterip göstermemesi  */
    indeterminate: PropTypes.bool,
    /** Bileşen içerisinde özel metin */
    text: PropTypes.string,
    /** ProgressBar'ın ilermesini gösteren metinin görünür olup olmaması */
    showText: PropTypes.bool,
    /** Metin stili */
    textStyle: PropTypes.object,
    /** Text bileşenine iletilecek özellikler */
    textProps: PropTypes.object,
    /** Kenar stili {width, color, radius} */
    borderStyle: PropTypes.object,
    /** Genel stil */
    containerStyle: PropTypes.object,
    /** ProgressBar tamamlandığında gerçekleşecek işlem */
    onComplete: PropTypes.func
};

ProgressBar.defaultProps = {
    value: 0,
    maxValue: 100,
    width: 200,
    height: 20,
    filledColor: "blue",
    unfilledColor: "transparent",
    animated: true,
    indeterminate: false,
    text: "",
    showText: false,
    textStyle: {},
    borderStyle: { width: 1, color: "blue", radius: 30 },
    containerStyle: {},
    onComplete: () => { }
};

export default ProgressBar;