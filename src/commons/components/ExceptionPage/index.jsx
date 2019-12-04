import React from 'react';
import PropTypes from 'prop-types';
import { exceptionPages } from './exceptionPageType.js';
import './index.less';
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
/**
 * 异常页面展示组件
 */
export default class ExceptionPage extends React.Component {
  static displayName = 'ExceptionPage'+seiIntl.get({key: 'gwmBdm_000196', desc: '异常页面'});

  static propTypes = {
    /** define exception type */
    type: PropTypes.string.isRequired,
  };

  render() {
    const { type } = this.props;
    const exceptionPath = exceptionPages[type] || exceptionPages.nullpage;
    return (
      <div className="exception-container">
        <img alt={seiIntl.get({key: 'gwmBdm_000197', desc: '页面异常'})} src={exceptionPath} />
      </div>
    );
  }
}
