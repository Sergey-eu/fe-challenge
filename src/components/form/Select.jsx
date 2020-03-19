import React from 'react';
import { Field } from 'formik';

const Select = (props) => {
  
  const {
    name: name, 
    label: label,
    value: value,
    handleFormControl: handleFormControl, 
    placeholder: placeholder,
    optionList: optionList,
    errors: errors,
    className: className
  } = props;

  return (
    <div className={`mui-select ${className}`}>
      <Field as='select'
        name={name}
        onChange={handleFormControl}
        value={value}
        className={`${errors ? 'mui--is-not-empty' : ''}`} >
        <option value='' defaultValue>{placeholder ||  'Choose an option'}</option>
        {optionList.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
        <label htmlFor={name}>{label}</label>
      {errors ? <div className='mui--text-danger mui--text-caption validation-message'>{errors}</div> : null}
      
    </div>
  )
}

export default Select;
