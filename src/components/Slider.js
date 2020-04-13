import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, Image, Dimensions, Animated } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const SCROLLVIEW_REF = 'scrollview';
//var timerId;

function _startAutoPlay() {
    this.timerId = setInterval(_goToNext,1000);
}

function _stopAutoPlay() {
    if(this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
    }
}

function _goToNext() {
    let nextIndex = this._currentIndex + 1 % this._childrenCount;
    this.refs[SCROLLVIEW_REF].scrollTo({x:200*nextIndex})
}

function _onScroll(event) {
    //let {height} = event.nativeEvent.layout;
}

const Slider = (props) => {
    const [autoPlay, setAutoPlay] = useState(false);

    const xOffset = new Animated.Value(0);
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: xOffset } } }]);

    const {
        images,
        style
    } = props;

    useEffect(() => {
        if(autoPlay) _startAutoPlay();
    }, []);

    return (
        <View style={{ height: "100%", width: "100%" }}>
            <ScrollView onLayout={_onScroll()}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToEnd
                pagingEnabled>
                {images.map(image => (
                    <Image resizeMode="cover" source={{ uri: image}} key={image} style={styles.image} />
                ))}
            </ScrollView>
            <View style={styles.circleView}>
                {images.map((image, i) => (
                    <View key={image} style={[styles.circle]} />
                ))}
            </View>
        </View>
    )
};

Slider.propTypes = {
    title: PropTypes.string,
    titleColor: PropTypes.string,
    titleStyle: PropTypes.object,
    titlePosition: PropTypes.oneOf(["left", "center", "right"]),
    color: PropTypes.string,
    thickness: PropTypes.number,
    style: PropTypes.object
};

Slider.defaultProps = {
    title: "",
    titleStyle: {},
    titlePosition: "center",
    thickness: 1,
    style: {}
};

const styles = StyleSheet.create({
    image: {
        height: "100%",
        width: DEVICE_WIDTH
    },
    circleView: {
        position: "absolute",
        bottom: 15,
        width: "100%",
        height: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    circle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        margin: 5,
        backgroundColor: "#fff"
    }
});

export default Slider;