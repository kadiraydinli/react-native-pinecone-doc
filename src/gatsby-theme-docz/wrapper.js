import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf'

// The doc prop contains some metadata about the page being rendered that you can use.
const Wrapper = ({ children, doc }) => <React.Fragment>
    <Helmet>
        <meta charSet="utf-8" />
        <style type="text/css">{`@font-face {
            src: url(${iconFont});
          font-family: FontAwesome;
        }`}
        </style>
        <link rel="icon"
            type="image/png"
            href="http://example.com/myicon.png"
        />
    </Helmet>
    {children}
</React.Fragment>
export default Wrapper