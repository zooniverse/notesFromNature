import React from 'react';
import ReactDOM from 'react-dom';
import { proxyUrl } from  'helpers/url_helpers';
import { css } from 'constants/css';

export default class ProxyIFrame extends React.Component {
    render() {
        return (
            <iframe src={proxyUrl()} style={css.hidden} onLoad={this.handleLoad} />
        );
    }
}
