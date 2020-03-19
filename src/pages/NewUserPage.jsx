/* General stuff */
import React, { useState, useEffect } from "react";
import { Switch, Redirect, Route, Link, useHistory } from "react-router-dom";
import { Formik, Form } from 'formik';

/* Custom Hooks */
import useLocalStorage from "../hooks/useLocalStorage";

/* Data */
import { schemaArray, allStepsSchema } from "../data/Form/validationConfig";
import initialFormData from "../data/Form/initialFormData";
import storeTypes from "../data/Form/storeTypes";
import usersRoles from "../data/Form/usersRoles";
import locationOptions from "../data/Form/locationOptions";

/* Containers */
import Step1 from "../containers/Form/Step1";
import Step2 from "../containers/Form/Step2";
import Step404 from "../containers/Form/Step404";

/* Custom components */
import Select from "../components/form/Select";
import TextInput from '../components/form/TextInput';
import AutocompleteInput from '../components/form/Autocomplete';
import Button from '../components/form/Button';
import Datepicker from '../components/form/Datepicker';
import RadioButtons from '../components/form/RadioButtons';

const NewUserPage = () => {
  const [newUser, setNewUser] = useState(initialFormData)
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [formSteps, setFormSteps] = useState({
    currentStep: 1,
    maxSteps: 2,
    isSubmitted: false
  });
  const [isSubmitReady, setSubmitStatus] = useLocalStorage('isSubmitReady', false);

  const history = useHistory();

  const handlePrevStep = () => {
    let newStep = formSteps.currentStep - 1;
    setFormSteps({
      ...formSteps,
      currentStep: newStep,
      isSubmitted: false
    })
    return newStep;
  }

  const handleNextStep = () => {
    if (!Boolean(document.querySelectorAll('.validation-message').length)) {
      if (formSteps.currentStep !== formSteps.maxSteps) {
        let newStep = formSteps.currentStep + 1;

        setSubmitStatus(true);
        history.push(`/form/step${newStep}`);
        setFormSteps({
          ...formSteps,
          currentStep: newStep
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

  const handleFormControl = (e) => {
    setNewUser({
      ...newUser,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  const handleUsersAutocomplete = async () => {
    fetch("https://randomuser.me/api/?results=50&nat=au&exc=login")
      .then(response => response.json())
      .then(parsedJSON => setSuggestedUsers(parsedJSON.results))
      .catch(error => console.log(error))
    // http://randomuser.me responded with error 502 so mockup was used
    // setSuggestedUsers(suggestedUsersMockup);
  }

  // Data collector for reqired keys from selected option
  let selectedData = {
    firstSelectedName: "",
    lastSelectedName: "",
    lookup: ""
  }

  const handleOption = (option) => {
    const fullName = typeof (option) === 'object' ? `${option.name.title} ${option.name.first} ${option.name.last}` : option;
    selectedData.firstSelectedName = typeof (option) === 'object' ? option.name.first : "";
    selectedData.lastSelectedName = typeof (option) === 'object' ? option.name.last : "";
    selectedData.lookup = typeof (option) === 'object' ? fullName : "";
    return fullName;
  }

  const filterOptions = {
    matchFrom: 'start',
    stringify: option => option.name.first
  };

  const handleDateChange = (date) => {
    setNewUser({
      ...newUser,
      joinDate: date
    });
  };

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
      .catch(error => { console.error(error) });
  }

  useEffect(() => {
    handleUsersAutocomplete();
    setSubmitStatus(false)
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

              <Step1 formSteps={formSteps} setFormSteps={setFormSteps} >
                <Select
                  name={"storeType"}
                  label={"Store Type"}
                  handleFormControl={handleFormControl}
                  optionList={storeTypes}
                  errors={props.errors.storeType}
                  value={props.values.storeType}
                />
              </Step1>

              {newUser.storeType === "Metro" && (
                <TextInput
                  name="storeTypeDetails"
                  label="Provide details"
                  handleFormControl={handleFormControl}
                  errors={props.errors.storeTypeDetails}
                  value={props.values.storeTypeDetails}
                />
              )}

              <AutocompleteInput
                name="userLookup"
                label="User lookup"
                selectedData={selectedData}
                onChange={() => { setNewUser({ ...newUser, firstName: selectedData.firstSelectedName, lastName: selectedData.lastSelectedName, userLookup: selectedData.lookup }); }}
                options={suggestedUsers || []}
                handleFormControl={handleFormControl}
                handleOption={handleOption}
                filterOptions={filterOptions}
                errors={props.errors.userLookup}
                value={props.values.userLookup}
              />

              <TextInput
                name="firstName"
                label="First Name"
                dataStorage={newUser}
                handleFormControl={handleFormControl}
                errors={props.errors.firstName}
                value={props.values.firstName}
              />

              <TextInput
                name="lastName"
                label="Last Name"
                dataStorage={newUser}
                handleFormControl={handleFormControl}
                errors={props.errors.lastName}
                value={props.values.lastName}
              />

              <Button
                type={'button'}
                text={'Next'}
                onClick={() => { props.validateForm(); setTimeout(() => { handleNextStep() }) }}
                className={'mui-btn mui-btn--primary mui--pull-right'}
              />
            </Route>

            <Route exact path="/form/step2">
              {!isSubmitReady && <Redirect to="/form/step1" />}

              <Step2 formSteps={formSteps} setFormSteps={setFormSteps}>
                <Select
                  name={"usersRole"}
                  label={"What is the users role?"}
                  defaultValue={'Choose an 2option'}
                  optionList={usersRoles}
                  handleFormControl={handleFormControl}
                  errors={props.errors.usersRole}
                  value={props.values.usersRole}
                />

                <Datepicker
                  name="joinDate"
                  onChange={handleDateChange}
                  value={props.values.joinDate}
                  format="MM/dd/yyyy"
                  variant="inline"
                  margin="normal"
                  label="When did the user first join?"
                  errors={props.errors.joinDate}
                />

                <RadioButtons
                  radioList={locationOptions}
                  name="isVictoriaLocation"
                  label="Is this person located in Victoria?"
                  handleFormControl={handleFormControl}
                  value={props.values.isVictoriaLocation}
                  errors={props.errors.isVictoriaLocation}
                />

                {newUser.isVictoriaLocation === "Yes" && (
                  <TextInput
                    name="locationDetails"
                    label="Where in Victoria?"
                    handleFormControl={handleFormControl}
                    errors={props.errors.locationDetails}
                    value={props.values.locationDetails}
                  />
                )}

                {formSteps.isSubmitted && <pre className="submit-message">
                  <code>Your form has been submitted.</code>
                </pre>}

                <Link to="/form/step1" onClick={handlePrevStep} className="mui-btn mui-btn--dark">Back </Link>

                <Button
                  type={'button'}
                  text={'Submit'}
                  disabled={formSteps.isSubmitted || !isSubmitReady ? true : false}
                  onClick={() => { props.validateForm(); setTimeout(() => { handleNextStep() }) }}
                  className={'mui-btn mui-btn--primary mui--pull-right'}
                />
              </Step2>

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
