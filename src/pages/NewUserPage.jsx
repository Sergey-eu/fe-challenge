/* General stuff */
import React, { useState, useEffect } from "react";
import { Switch, Redirect, Route, Link, useHistory } from "react-router-dom";
import { Formik, Field, Form } from 'formik';

/* Components imports */
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import "date-fns";

import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

/* Containers imports */
import Step1 from "../containers/Form/Step1";
import Step2 from "../containers/Form/Step2";
import Step404 from "../containers/Form/Step404";

/* Data imports */
import storeTypes from "../data/Form/storeTypes";
import usersRoles from "../data/Form/usersRoles";
import initialFormData from "../data/Form/initialFormData";
import { schemaArray, allStepsSchema } from "../data/Form/validationConfig";
import suggestedUsersMockup from "../data/Form/suggestedUsers";

const NewUserPage = () => {
  const [newUser, setNewUser] = useState(initialFormData)
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [formSteps, setFormSteps] = useState({
    currentStep: 1,
    maxSteps: 2,
    isSubmitReady: false,
    isSubmitted: false
  });

  const history = useHistory();

  const handleNextStep = () => {
    if (!Boolean(document.querySelectorAll('.validation-message').length)) {
      if (formSteps.currentStep !== formSteps.maxSteps) {
        let newStep = formSteps.currentStep + 1;
        history.push(`/form/step${newStep}`);
        setFormSteps({
          ...formSteps,
          currentStep: newStep,
          isSubmitReady: true
        })
        return newStep;
      } else {
        handleFormSubmit();
        setNewUser(initialFormData)
        setFormSteps({
          ...formSteps,
          isSubmitted: true
        })
      }
    }
  }

  const handlePrevStep = () => {
    let newStep = formSteps.currentStep - 1;
    setFormSteps({
      ...formSteps,
      currentStep: newStep,
      isSubmitted: false
    })
    return newStep;
  }

  const handleUsersAutocomplete = async () => {

    // http://randomuser.me responded with error 502 so suggestedUsersMockup was used
    // fetch("https://randomuser.me/api/?results=50&nat=au&exc=login")
    //   .then(response => response.json())
    //   .then(parsedJSON => setSuggestedUsers(parsedJSON.result))
    //   .catch(error => console.log(error))
    setSuggestedUsers(suggestedUsersMockup);
  }

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option.name.first
  });

  const handleInput = (e) => {
    setNewUser({
      ...newUser,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  const handleDateChange = (date) => {
    setNewUser({
      ...newUser,
      joinDate: date
    });
  };

  // Data collector for option selected in Autocomplete
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

  const handleFormSubmit = () => {
    let userData = newUser;

    fetch("https://webhook.site/76c989af-0b79-419d-ab0e-508ac1b93b44", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => { console.log(response) })
      .catch(error => { console.error(error) });
  }

  useEffect(() => {
    handleUsersAutocomplete();
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={newUser}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={formSteps.currentStep === formSteps.maxSteps ? allStepsSchema : schemaArray[formSteps.currentStep - 1]}>

      {(props) => (
        <Form className="mui-form mui-panel mui-col-md-6 mui-col-md-offset-3 mui-page-title" >
          <Switch>
            <Route exact path="/form">
              <Redirect to="/form/step1" />
            </Route>

            <Route exact path="/form/step1">
              <Step1 formSteps={formSteps} setFormSteps={setFormSteps} />

              <div className="mui-select">
                <Field as="select"
                  name="storeType"
                  onChange={handleInput}
                  value={newUser.storeType}
                  className={`${props.errors.storeType ? 'mui--is-not-empty' : ''}`} >
                  <option value="" disabled defaultValue>Choose an option</option>
                  {storeTypes.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <label htmlFor="storeType">Store Type</label>
                {props.errors.storeType ? <div className="mui--text-danger mui--text-caption validation-message">{props.errors.storeType}</div> : null}
              </div>

              {newUser.storeType === "Metro" && (
                <div className="mui-textfield mui-textfield--float-label">
                  <Field type="text"
                    name="storeTypeDetails"
                    onChange={handleInput}
                    value={newUser.storeTypeDetails} className={props.errors.storeTypeDetails ? 'mui--is-not-empty' : ''} />
                  <label htmlFor="storeTypeDetails">Provide details</label>
                  {props.errors.storeTypeDetails ? <div className="mui--text-danger mui--text-caption validation-message">{props.errors.storeTypeDetails}</div> : null}
                </div>
              )}

              <div className="mui-textfield mui-textfield--float-label">
                <Autocomplete
                  disableClearable
                  name="userLookup"
                  onChange={() => { setNewUser({ ...newUser, firstName: firstSelectedName, lastName: lastSelectedName, userLookup: lookup }); }}
                  value={newUser.userLookup}
                  className={props.errors.userLookup ? 'Mui-error' : ''}
                  options={suggestedUsers || []}
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
                      name="userLookup"
                      label="User lookup"
                      value={newUser.userLookup}
                      {...params}
                    />
                  )}
                />
                {props.errors.userLookup ? <div className="mui--text-danger mui--text-caption validation-message">{props.errors.userLookup}</div> : null}
              </div>

              <div className='mui-textfield mui-textfield--float-label'>
                <Field type="text"
                  name="firstName"
                  onChange={handleInput}
                  value={newUser.firstName} className={props.errors.firstName ? 'mui--is-not-empty' : ''} />
                <label htmlFor="firstName">First Name</label>
                {props.errors.firstName ? <div className="mui--text-danger mui--text-caption validation-message">{props.errors.firstName}</div> : null}
              </div>

              <div className="mui-textfield mui-textfield--float-label">
                <Field type="text"
                  name="lastName"
                  onChange={handleInput}
                  value={newUser.lastName} className={props.errors.lastName ? 'mui--is-not-empty' : ''} />
                <label htmlFor="lastName">Last Name</label>
                {props.errors.lastName ? <div className="mui--text-danger mui--text-caption validation-message">{props.errors.lastName}</div> : null}
              </div>

              <button type='button' onClick={() => { props.validateForm(); setTimeout(() => { handleNextStep() }) }} className="mui-btn mui-btn--primary mui--pull-right" >Next</button>
            </Route>

            <Route exact path="/form/step2">
              <Step2 formSteps={formSteps} setFormSteps={setFormSteps} />

              <div className="mui-select">
                <Field as="select"
                  name="usersRole"
                  onChange={handleInput}
                  value={newUser.usersRole}>
                  <option value="" disabled defaultValue>Choose an option</option>
                  {usersRoles.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <label htmlFor="usersRole">What is the users role?</label>
              </div>

              <div className="mui-picker">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    fullWidth
                    disableToolbar
                    name="joinDate"
                    onChange={handleDateChange}
                    value={newUser.joinDate}
                    className={props.errors.joinDate ? 'Mui-error' : ''}
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="When did the user first join?"
                  />
                </MuiPickersUtilsProvider>
                {props.errors.joinDate ? <div className="mui--text-danger mui--text-caption validation-message">{props.errors.joinDate}</div> : null}
              </div>

              <div className="mui-radio">
                <FormLabel component="legend">Is this person located in Victoria?</FormLabel>
                <RadioGroup
                  name="isVictoriaLocation"
                  onChange={handleInput}
                  value={newUser.isVictoriaLocation}
                  className={props.errors.isVictoriaLocation && 'error'}>
                  <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />
                </RadioGroup>
                {props.errors.isVictoriaLocation ? <div className="mui--text-danger mui--text-caption validation-message">{props.errors.isVictoriaLocation}</div> : null}
              </div>

              {newUser.isVictoriaLocation === "Yes" && (
                <div className="mui-textfield mui-textfield--float-label">
                  <Field type="text"
                    name="locationDetails"
                    onChange={handleInput}
                    value={newUser.locationDetails} className={props.errors.locationDetails ? 'mui--is-not-empty' : ''} />
                  <label htmlFor="locationDetails">Where in Victoria?</label>
                  {props.errors.locationDetails ? <div className="mui--text-danger mui--text-caption validation-message">{props.errors.locationDetails}</div> : null}
                </div>
              )}

              {formSteps.isSubmitted && <pre className="submit-message">
                <code>Your form has been submitted.</code>
              </pre>}

              <Link to="/form/step1" onClick={handlePrevStep} className="mui-btn mui-btn--dark">Back </Link>
              <button type='button' 
                disabled={formSteps.isSubmitted || !formSteps.isSubmitReady ? true : false}
                onClick={() => { props.validateForm(); setTimeout(() => { handleNextStep() }) }}
                className="mui-btn mui-btn--primary mui--pull-right">submit</button>
            </Route>
            
            <Route>
              <Step404 />
            </Route>
          </ Switch>
        </Form>
      )}
    </Formik>
  )
}

export default NewUserPage;
