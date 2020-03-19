import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Seelct = (props) => {

  const {
    name,
    label,
    handleFormControl,
    optionList,
    errors,
    value,
    className
  } = props;

  return (
    <FormControl className={`mui-select ${className || ''} ${errors && 'Mui-error'} `}>
      <InputLabel className={name}>{label}</InputLabel>
      <Select
        className={errors ? 'Mui-error' : ''}
        labelId={`${name}-label`}
        value={value}
        name={name}
        onChange={handleFormControl}
      >
        {optionList.map(option => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
      {errors ? <div className='mui--text-danger mui--text-caption validation-message'>{errors}</div> : null}
    </FormControl>
  )
}

export default Seelct;
