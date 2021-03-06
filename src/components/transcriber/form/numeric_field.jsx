import React from 'react';
import { css } from 'constants/css';

export default class NumericField extends React.Component {
    render() {
        const { field, onFieldFocus, onFieldChange, value } = this.props,
            placeholder = field.placeholder || `-- ${field.label} --`,
            maxLength = field.maxLength || 16,
            style = {
                borderRadius: css.radius,
                padding: '2px 4px',
                width: field.width || '100%',
            };
        return (
            <input type="number" style={style} value={value}
               name={field.name}
               maxLength={maxLength}
               onFocus={() => onFieldFocus(field.name)}
               onChange={(e) => onFieldChange(field.name, e.target.value)}
               placeholder={placeholder}/>
        );
    }
}
