import Joi from 'joi';

export const userFormConfig = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    validation: Joi.string().min(2).max(50).required().messages({
      'string.empty': 'First name is required',
      'string.min': 'First name must be at least 2 characters',
      'string.max': 'First name cannot exceed 50 characters'
    })
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    validation: Joi.string().min(2).max(50).required().messages({
      'string.empty': 'Last name is required',
      'string.min': 'Last name must be at least 2 characters',
      'string.max': 'Last name cannot exceed 50 characters'
    })
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    type: 'tel',
    required: true,
    validation: Joi.string().pattern(/^(?:\+91[-\s]?)?[0-9]{10}$/).required().messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Please enter a valid phone number'
    })
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    validation: Joi.string().email({ tlds: { allow: false } }).required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address'
    })
  }
];

export const createValidationSchema = (config) => {
  const schemaObject = {};
  config.forEach(field => {
    schemaObject[field.name] = field.validation;
  });
  return Joi.object(schemaObject);
};

export const userValidationSchema = createValidationSchema(userFormConfig);