import './DefaultTemplate.css';
import React, { FC } from 'react';
import { RealertTemplateProps } from '../types';

const DefaultTemplate: FC<RealertTemplateProps & { divider?: boolean }> = ({ open, content, title, onClose }) => {
  return (
    open && (
      <div className={'realert'}>
        {!!title && (
          <>
            <em>{title}</em>
            <hr />
          </>
        )}
        <div className={'realertBody'}>{content}</div>
        <div className={'realertActions'}>
          <button onClick={onClose}>Ok</button>
        </div>
      </div>
    )
  );
};

export default DefaultTemplate;
