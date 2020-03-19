import React, { useEffect } from 'react';

const Step1 = (props) => {

  const {
    setFormSteps, 
    formSteps, 
    children
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
