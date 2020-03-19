import React from 'react';

import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const RadioButtons = (props) => {

  const {
    radioList,
    name,
    label,
    handleFormControl,
    value,
    errors,
    className
  } = props;

  return (
    <div className={`mui-radio ${className || ''}`}>
      <FormLabel component='legend'>{label}</FormLabel>
      <RadioGroup
        name={name}
        onChange={handleFormControl}
        value={value}
        className={errors && 'error'}>
        {radioList.map(button => (
          <FormControlLabel key={button.value} value={button.value} control={<Radio color='primary' />} label={button.value} />
        ))}
      </RadioGroup>
      {errors ? <div className='mui--text-danger mui--text-caption validation-message'>{errors}</div> : null}
    </div>
  )
}

export default RadioButtons;
