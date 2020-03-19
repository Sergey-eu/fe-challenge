import React from 'react';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

const Datepicker = (props) => {

  const {
    name,
    onChange,
    value,
    format,
    variant,
    margin,
    label,
    errors,
    className
  } = props;

  return (
    <div className={`mui-picker ${className || ''}`}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          fullWidth
          disableToolbar
          name={name}
          onChange={onChange}
          value={value}
          className={errors ? 'Mui-error' : ''}
          variant={variant}
          format={format}
          margin={margin}
          label={label}
        />
      </MuiPickersUtilsProvider>
      {errors ? <div className='mui--text-danger mui--text-caption validation-message'>{errors}</div> : null}
    </div>

  )
}

export default Datepicker;
