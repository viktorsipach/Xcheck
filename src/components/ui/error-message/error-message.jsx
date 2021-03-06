import React from 'react';
import PropTypes from 'prop-types';
import './error-message.scss';

const ErrorMessage = ({ children }) => (
  <div className="error-message" role="textbox">
    {children}
  </div>
);

ErrorMessage.propTypes = {
  children: PropTypes.string,
};

ErrorMessage.defaultProps = {
  children: '',
};

export default React.memo(ErrorMessage);
