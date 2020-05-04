import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text as RNText } from 'react-native';
import { Colors } from '../config';

const Text = (props) => {
  const {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    primary,
    success,
    info,
    warning,
    danger,
    color,
    children,
    fontSize,
    style,
    ...rest
  } = props;

  return (
    <RNText
      style={StyleSheet.flatten([
        fontSize && { fontSize: fontSize },
        h1 && { fontSize: 32 },
        h2 && { fontSize: 24 },
        h3 && { fontSize: 19 },
        h4 && { fontSize: 16 },
        h5 && { fontSize: 14 },
        h6 && { fontSize: 11 },
        color && { color: color },
        primary && { color: Colors.primary },
        success && { color: Colors.success },
        info && { color: Colors.info },
        warning && { color: Colors.warning },
        danger && { color: Colors.danger },
        style
      ])} {...rest}>
      {children}
    </RNText>
  );
};

Text.propTypes = {
  /** Yazı tipi boyutu 32 */
  h1: PropTypes.bool,
  /** Yazı tipi boyutu 24 */
  h2: PropTypes.bool,
  /** Yazı tipi boyutu 19 */
  h3: PropTypes.bool,
  /** Yazı tipi boyutu 16 */
  h4: PropTypes.bool,
  /** Yazı tipi boyutu 14 */
  h5: PropTypes.bool,
  /** Yazı tipi boyutu 11 */
  h6: PropTypes.bool,
  /** Metin rengi */
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Özel renkler */
  primary: PropTypes.bool,
  /** Özel renkler */
  success: PropTypes.bool,
  /** Özel renkler */
  info: PropTypes.bool,
  /** Özel renkler */
  warning: PropTypes.bool,
  /** Özel renkler */
  danger: PropTypes.bool,
  /**  */
  children: PropTypes.node,
  /** Metin boyutu */
  fontSize: PropTypes.number,
  /** Stil */
  style: PropTypes.object,
};

Text.defaultProps = {
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  h6: false,
  primary: false,
  success: false,
  info: false,
  warning: false,
  danger: false,
  color: 'black',
  children: '',
  fontSize: 16
};

export default Text;