import React, { useEffect } from 'react';

const Step1 = (props) => {

  const {
    setFormSteps: setFormSteps, 
    formSteps: formSteps, 
    children: children
  } = props;

  useEffect(() => {
    setFormSteps({
      ...formSteps,
      currentStep: 1
    });
  }, [setFormSteps]);
  
  return (
    <>
      {children}
    </>
  )
}

export default Step1;
