import React, { useEffect } from "react";

const Step2 = (props) => {

  const {
    setFormSteps: setFormSteps, 
    formSteps: formSteps, 
    children: children
  } = props;

  useEffect(() => {
    setFormSteps({
      ...formSteps,
      currentStep: 2
    });
  }, [setFormSteps]);

  return (
    <>
      {children}
    </>
  );
}

export default Step2;
