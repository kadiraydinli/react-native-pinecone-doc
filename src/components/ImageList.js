import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Platform, Text, Image, Dimensions, Button } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ImageList = (props) => {
    const {
        images,
        columns
    } = props;

    useEffect(() => {
        //dimensions('https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg')
        //dimensions()
    }, []);

    const [widths, setWidths] = useState([]);
    const [heights, setHeights] = useState([]);

    const [data, setData] = useState(0);

    /*const dimensions =  async (element) => {
        if (element.dimensions) {
            //alert("ilk")
            return { width: element.dimensions.width, height: element.dimensions.height }
        }
        else {
            if (element.uri) {
                //alert("sonraki")
                return { width: 50, height: 50 }
            }
            else {
                //alert("kdld")
                return { width: 0, height: 0 }
            }
        }
    }*/
    const dimensions = () => {
        for (let i = 0; i <= images.length - 1; i++) {
            setData(data + 1)
            if (images[i].dimensions) {
                //alert("ilk")
                setWidths([...widths, images[i].dimensions.width])
                setHeights([...heights, images[i].dimensions.height])
            }
            else {
                if (images[i].uri) {
                    //alert("sonraki")
                    Image.getSize(images[i].uri,
                        (width, height) => {
                            setWidths([...widths, width])
                            setHeights([...heights, height])
                        }, (error) => {
                            setWidths([...widths, 0])
                            setHeights([...heights, 0])
                        });
                }
                else {
                    //alert("kdld")
                    setWidths([...widths, 0])
                    setHeights([...heights, 0])
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            {images.map((image, index) => (
                <View style={{ borderWidth: 0, padding: 0}}>
                    <Image key={index} source={image.source ? image.source : { uri: image.uri }}
                        style={[styles.image, { width: WIDTH / columns, height: HEIGHT / 3 }]} />
                </View>
            ))}
        </View>
    )
};

ImageList.propTypes = {
    images: PropTypes.array,
    columns: PropTypes.number
};

ImageList.defaultProps = {
    columns: 2
};


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //width: "100%",
        //height: 40,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    image: {
        
    }
});

export default ImageList;