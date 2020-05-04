import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Text, IconButton } from '.';

const Header = (props) => {
    const {
        title,
        titleColor,
        titlePlacement,
        titleStyle,
        subTitle,
        subTitleColor,
        subTitlePlacement,
        subTitleStyle,
        placement,
        backgroundColor,
        statusBarColor,
        statusBarProps,
        leftIcon,
        leftIconOnPress,
        leftIconOnLongPress,
        rightIcon,
        rightIconOnPress,
        rightIconOnLongPress,
        containerStyle,
        leftContainer,
        leftContainerStyle,
        centerContainer,
        centerContainerStyle,
        rightContainer,
        rightContainerStyle
    } = props;

    const centerPlacementValue = (
        !placement && (titlePlacement || subTitlePlacement) ? null :
            placement == "left" ? "flex-start" :
                placement == "right" ? "flex-end" : placement
    )

    const titlePlacementValue = (
        placement && !titlePlacement ? placement : placement && titlePlacement ? titlePlacement : titlePlacement
    )

    const subTitlePlacementValue = (
        placement && !subTitlePlacement ? placement : placement && subTitlePlacement ? subTitlePlacement : subTitlePlacement
    )

    return (
        <>
            <StatusBar backgroundColor={statusBarColor} {...statusBarProps} />
            <View style={[{ backgroundColor: backgroundColor }, styles.container, containerStyle]}>
                <View style={[styles.Views, { alignItems: "flex-start" }, leftContainerStyle]}>
                    {!leftContainer && leftIcon ?
                        (<IconButton {...leftIcon} onPress={leftIconOnPress} onLongPress={leftIconOnLongPress} />) :
                        (leftContainer)}
                </View>
                <View style={[{ justifyContent: "center", alignItems: centerPlacementValue }, centerContainerStyle]}>
                    {!centerContainer ? (<>
                        <Text style={StyleSheet.flatten([{ fontSize: 20, textAlign: titlePlacementValue, color: titleColor}, titleStyle])}>
                            {title}
                        </Text>
                        {subTitle ?
                            <Text style={StyleSheet.flatten([{ fontSize: 15, textAlign: subTitlePlacementValue, color: subTitleColor }, subTitleStyle])}>
                                {subTitle}
                            </Text> : null}
                    </>) : (centerContainer)}
                </View>
                <View style={[styles.Views, { alignItems: "flex-end" }, rightContainerStyle]}>
                    {!rightContainer && rightIcon ? (<IconButton {...rightIcon} onPress={rightIconOnPress} onLongPress={rightIconOnLongPress} />) :
                        (<>{rightContainer}</>)}
                </View>
            </View>
        </>
    )
};

Header.propTypes = {
    /** Bileşen başlığı */
    title: PropTypes.string,
    /** Başlık rengi */
    titleColor: PropTypes.string,
    /** Başlık konumu */
    titlePlacement: PropTypes.oneOf(["left", "center", "right"]),
    /** Başlık stili */
    titleStyle: PropTypes.object,
    /** Alt başlık */
    subTitle: PropTypes.string,
    /** Alt başlık rengi */
    subTitleColor: PropTypes.string,
    /** Alt başlık konumu */
    subTitlePlacement: PropTypes.oneOf(["left", "center", "right"]),
    /** Alt başlık stili */
    subTitleStyle: PropTypes.object,
    /** Başık ve alt başlığını konumunu ayarlar */
    placement: PropTypes.oneOf(["left", "center", "right"]),
    /** Arkaplan rengi */
    backgroundColor: PropTypes.string,
    /** Durum çubuğu rengi */
    statusBarColor: PropTypes.string,
    /** StatusBar bileşenine iletilecek özellikler */
    statusBarProps: PropTypes.object,
    /** Sol ikon {name, color, size, type, props} */
    leftIcon: PropTypes.object,
    /** Sol ikona dokunuluna gerçekleşek işlem */
    leftIconOnPress: PropTypes.func,
    /** Sol ikona uzun dokunuluna gerçekleşek işlem */
    leftIconOnLongPress: PropTypes.func,
    /** Sağ ikon {name, color, size, type, props} */
    rightIcon: PropTypes.object,
    /** Sağ ikona dokunuluna gerçekleşek işlem */
    rightIconOnPress: PropTypes.func,
    /** Sağ ikona uzun dokunuluna gerçekleşek işlem */
    rightIconOnLongPress: PropTypes.func,
    /** Genel stil */
    containerStyle: PropTypes.object,
    /** Sol kutucuk içerisine istenilen bileşenler tanımlanabilir. {<Text>Hello World</Text>} */
    leftContainer: PropTypes.element,
    /** Sol kutucuk stili */
    leftContainerStyle: PropTypes.object,
    /** Orta kutucuk içerisine istenilen bileşenler tanımlanabilir. {<Text>Hello World</Text>} */
    centerContainer: PropTypes.element,
    /** Orta kutucuk stili */
    centerContainerStyle: PropTypes.object,
    /** Sağ kutucuk içerisine istenilen bileşenler tanımlanabilir. {<Text>Hello World</Text>} */
    rightContainer: PropTypes.element,
    /** Sağ kutucuk stili */
    rightContainerStyle: PropTypes.object
};

Header.defaultProps = {
    title: "",
    titleColor: "black",
    titlePlacement: "center",
    titleStyle: {},
    subTitle: "",
    subTitleColor: "black",
    subTitlePlacement: "center",
    subTitleStyle: {},
    //placement: "center",
    backgroundColor: "white",
    statusBarColor: "white",
    statusBarProps: { barStyle: "dark-content" },
    leftIcon: null,
    rightIcon: null,
    containerStyle: {},
    leftContainerStyle: { flex: 1 },
    centerContainerStyle: { flex: 3 },
    rightContainerStyle: { flex: 1 }
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 56,
        flexDirection: "row",
        justifyContent: "center",
        borderBottomColor: '#F5F5F5',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    Views: {
        flex: 1,
        justifyContent: "center"
    }
});

export default Header;