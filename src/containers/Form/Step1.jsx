import React, { useEffect } from "react";

const Step1 = ({ setFormSteps, formSteps }) => {
  useEffect(() => {
    setFormSteps({
      ...formSteps,
      currentStep: 1
    });
  }, [setFormSteps]);
  return (
    <>
    <br/>
      {/* <h1>Step1</h1> */}
    </>
  )
}

export default Step1;
