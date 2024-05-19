import './DefaultTemplate.css';
import React, { FC } from 'react';
import { RealertTemplateProps } from '../types';

const DefaultTemplate: FC<RealertTemplateProps> = ({ open, content, title, onClose, okText = 'OK' }) => {
  return (
    open && (
      <div className={'realert'}>
        {!!title && <div className={'realertTitle'}>{title}</div>}
        <div className={'realertBody'}>{content}</div>
        <div className={'realertActions'}>
          <button onClick={onClose}>{okText}</button>
        </div>
      </div>
    )
  );
};

export default DefaultTemplate;
