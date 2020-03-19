import React, { useEffect } from 'react';

const Step2 = (props) => {

  const {
    setFormSteps, 
    formSteps, 
    children
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
