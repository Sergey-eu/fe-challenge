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
    dataStorage: dataStorage,
    options: options,
    errors: errors,
    className: className
  } = props;

  // Data collector for reqired keys from selected option
  let firstSelectedName = "";
  let lastSelectedName = "";
  let lookup = "";

  const handleOption = (option) => {
    const fullName = typeof (option) === 'object' ? `${option.name.title} ${option.name.first} ${option.name.last}` : option;
    firstSelectedName = typeof (option) === 'object' ? option.name.first : "";
    lastSelectedName = typeof (option) === 'object' ? option.name.last : "";
    lookup = typeof (option) === 'object' ? fullName : "";
    return fullName;
  }

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option.name.first
  });

  return (
    <div className={`mui-textfield mui-textfield--float-label ${className}`}>
      <Autocomplete
        name={name}
        onChange={() => { props.setNewUser({ ...dataStorage, firstName: firstSelectedName, lastName: lastSelectedName, userLookup: lookup }); }}
        value={value}
        className={errors ? 'Mui-error' : ''}
        options={options}
        getOptionLabel={option => handleOption(option)}
        filterOptions={filterOptions}
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
