import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Platform, Text, PanResponder, Animated, Button } from 'react-native';
import { Icon } from "..";

const Slider = (props) => {
    const {
        //value,
        onValueChange,
        step,
        minimumValue,
        maximumValue,
        color,
        trackColor,
        trackSize,
        thumbColor,
        thumbSize,
        size,
    } = props;

    /*const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            pan.setOffset({
                x: pan.x._value
            })
        },
        onPanResponderMove: Animated.event([
            null,
            { dx: pan.x }
        ]),
        onPanResponderEnd: () => {
            pan.flattenOffset();
        }
    })).current;*/

    const position = new Animated.ValueXY();

    const [width, setWidth] = useState(0);
    const [value, setValue] = useState(0);

    const [veri, setVeri] = useState(0);
    const [data, setData] = useState(0);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => onMove(gestureState),
        onPanResponderRelease: (evt, gestureState) => onEndMove()
    })
    
    const getBottomOffsetFromValue = (value) => {
        if(width == null) return 0;
        const valueOffset = value - minimumValue;
        const totalRange = maximumValue - minimumValue;
        const percentage = valueOffset - totalRange;
        return width * percentage;
    }

    const onMove = (gestureState) => {
        const newDeltaValue = getValueFromOffset(gestureState.dx);
        alert(newDeltaValue)
        setValue(newDeltaValue);
    }

    const onEndMove = () => {
        setValue(value)
    }

    const getValueFromOffset = (offset) => {
        if (width == null) return 0;
        return ((maximumValue - minimumValue) * offset) / width;
    }


    const onLayout = (i) => {
        const {width} = i.nativeEvent.layout
        setWidth(width)
    }

    useEffect(() => {
        //alert(JSON.stringify(position))
    })

    return (
        <View style={styles.container}>
            <Text>gesture: {data}</Text>
            <Text>view: {veri}</Text>
            <Button title="tıkla" onPress={() => alert(JSON.stringify(position))} />
            <View style={styles.track} onLayout={onLayout} />
            <Animated.View style={{ width: 50, height: 50, backgroundColor: "green", transform: [{ translateX: position.x }] }}
                {...panResponder.panHandlers}>
                <View style={styles.thumb} />
            </Animated.View>
        </View>
    )
};

Slider.propTypes = {
    //value: PropTypes.number,
    onValueChange: PropTypes.func,
    step: PropTypes.number,
    minimumValue: PropTypes.number,
    maximumValue: PropTypes.number,
    color: PropTypes.string,
    trackColor: PropTypes.string,
    trackSize: PropTypes.number,
    thumbColor: PropTypes.string,
    thumbSize: PropTypes.number,
    size: PropTypes.number,
};

Slider.defaultProps = {
    minimumValue: 0,
    maximumValue: 100,
    step: 1
};


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //width: "100%",
        //height: 40,
        backgroundColor: "red",
        //alignItems: "center",
        justifyContent: "center",
        ...Platform.select({
            default: { elevation: 2 },
            ios: {}
        })
    },
    track: {
        width: "100%",
        height: 20,
        position: "absolute",
        backgroundColor: "green"
    },
    thumb: {
        //position: "absolute",
        height: 50,
        width: 50,
        backgroundColor: "blue",
        borderRadius: 50
    }
});

export default Slider;