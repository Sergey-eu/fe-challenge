import React from 'react';
import { Field } from 'formik';

const TextInput = (props) => {

  const {
    name: name,
    value: value,
    label: label,
    handleFormControl: handleFormControl,
    errors: errors,
    className: className
  } = props;

  return (
    <div className={`mui-textfield mui-textfield--float-label ${className}`}>
      <Field type='text'
        name={name}
        value={value}
        onChange={handleFormControl}
        className={errors ? 'mui--is-not-empty' : ''} />
      <label htmlFor='storeTypeDetails'>{label}</label>
      {errors ? <div className='mui--text-danger mui--text-caption validation-message'>{errors}</div> : null}
    </div>
  )
}

export default TextInput;
