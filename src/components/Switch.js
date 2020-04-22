import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import { Text, Icon } from "..";
import { Colors } from "../config";

const Switch = (props) => {
    const {
        value,
        onValueChange,
        color,
        disabled,
        size
    } = props;

    useEffect(() => {
        //if(color ==)
        alert(hexToRgbA(Colors[color]))
    }, []);

    function hexToRgbA(hex) {
        let c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ', 0.5)';
        }
        throw new Error('Bad Hex');
    }

    return (
        <TouchableOpacity disabled={disabled} style={styles.container}>
            <View style={{ width: 40, height: 10, justifyContent: "center", borderRadius: 70, alignItems: "center", opacity: .5, backgroundColor: "red"}}>
                <View style={{ width: 30, height: 30, borderRadius: 70, alignSelf: "flex-start", right: 15, backgroundColor: "rgba(0,0,105,1)" }} />
            </View>
        </TouchableOpacity>
    )
};

Switch.propTypes = {
    value: PropTypes.bool,
    onValueChange: PropTypes.func,
    disabled: PropTypes.bool,
    size: PropTypes.number
};

Switch.defaultProps = {
    disabled: false
};


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    }
});

export default Switch;