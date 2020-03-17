import React, { useEffect } from "react";

const Step2 = ({ setFormSteps, formSteps }) => {
  useEffect(() => {
    setFormSteps({
      ...formSteps,
      currentStep: 2
    });
  }, [setFormSteps]);
  //handleFormSteps(2)

  return (
    <>
    <br/>
      {/* <h1>Step2</h1> */}
    </>
  );
}

export default Step2;
