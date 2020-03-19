import React from "react";

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const AutocompleteInput = (props) => {

  const {
    name: name,
    label: label,
    value: value,
    onChange: onChange,
    options: options,
    handleOption: handleOption,
    filterOptions: filterOptions,
    errors: errors,
    className: className
  } = props;

  return (
    <div className={`mui-textfield mui-textfield--float-label ${className}`}>
      <Autocomplete
        name={name}
        onChange={onChange}
        value={value}
        className={errors ? 'Mui-error' : ''}
        options={options}
        getOptionLabel={option => handleOption(option)}
        filterOptions={createFilterOptions(filterOptions)}
        renderOption={(option, { inputValue }) => {
          const matches = match(option.name.first, inputValue);
          const parts = parse(option.name.first, matches);
          const lastName = option.name.last;
          const nameTitle = option.name.title;
          return (
            <div>
              <span>{nameTitle} </span>
              {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}
              <span> {lastName}</span>
            </div>
          );
        }}
        renderInput={params => (
          <TextField
            fullWidth
            name={name}
            label={label}
            {...params}
          />
        )}
      />
      {errors ? <div className="mui--text-danger mui--text-caption validation-message">{errors}</div> : null}
    </div>
  )
}

export default AutocompleteInput;
