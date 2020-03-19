import * as Yup from 'yup';

const step1Schema = Yup.object().shape({
  storeType: Yup.string()
    .required('Required field'),
  storeTypeDetails: Yup.string()
    .required('Required field'),
  userLookup: Yup.string()
    .required('Required field'),
  firstName: Yup.string()
    .required('Required field'),
  lastName: Yup.string()
    .required('Required field'),
});

const step2Schema = Yup.object().shape({
  joinDate: Yup.string()
    .required('Required field').nullable(),
  isVictoriaLocation: Yup.string()
    .required('Required field'),
  locationDetails: Yup.string()
    .required('Required field')
});

export const allStepsSchema = step2Schema.concat(step1Schema);
export const schemaArray = [step1Schema, step2Schema];
