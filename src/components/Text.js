import React from 'react';
import PropTypes from 'prop-types'
import { Text as RNText } from 'react-native';
import { Colors } from '../config';

/*const headingDeafults = {
    h1: 32,
    h2: 24,
    h3: 19,
    h4: 16,
    h5: 14,
    h6: 11,
}*/

const Text = ({
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
}) => (
  <RNText
    style={[
      h1 && { fontSize: 32 },
      h2 && { fontSize: 24 },
      h3 && { fontSize: 19 },
      h4 && { fontSize: 16 },
      h5 && { fontSize: 14 },
      h6 && { fontSize: 11 },
      color && { color: color },
      fontSize && { fontSize: fontSize },
      primary && { color: Colors.primary },
      success && { color: Colors.success },
      info && { color: Colors.info },
      warning && { color: Colors.warning },
      danger && { color: Colors.danger },
      style
    ]}
    {...rest}
  >
    {children}
  </RNText>
);

Text.propTypes = {
  /** Yazı boyutunu ayarla */
  fontSize: PropTypes.number,
  /** Yazı rengini ayarla */
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Yazı boyutunu 32 yap */
  h1: PropTypes.bool,
  /** Yazı boyutunu 24 yap */
  h2: PropTypes.bool,
  /** Yazı boyutunu 19 yap */
  h3: PropTypes.bool,
  /** Yazı boyutunu 16 yap */
  h4: PropTypes.bool,
  /** Yazı boyutunu 14 yap */
  h5: PropTypes.bool,
  /** Yazı boyutunu 11 yap */
  h6: PropTypes.bool,
  primary: PropTypes.bool,
  success: PropTypes.bool,
  info: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,
  /** Gösterilecek yazı */
  children: PropTypes.node,
  /** Stil ver */
  style: PropTypes.object
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
  color: "black",
  children: "",
  fontSize: 16,
  style: {}
};

export default Text;

