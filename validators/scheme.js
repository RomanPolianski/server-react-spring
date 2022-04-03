const Joi = require('joi');

const scheme = Joi.object().keys({
  userName: Joi.string().min(3).required().messages({
    'string.min': 'Username must contain 3 symbols or more.',
    'string.empty': 'Username must not be empty.',
  }),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/)
    .min(4)
    .required()
    .messages({
      'string.min': 'Password must contain 4 symbols or more.',
      'string.empty': 'Password must not be empty.',
      'string.pattern.base': 'Password must contain 1 number and 1 letter.',
    }),
  repeatPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Repeat password should be the same as the password.',
  }),
  firstName: Joi.string().min(3).required().messages({
    'string.min': 'First name must contain 3 symbols or more.',
    'string.empty': 'First name must not be empty.',
  }),
  lastName: Joi.string().min(3).required().messages({
    'string.min': 'Last name must contain 3 symbols or more.',
    'string.empty': 'Last name must not be empty.',
  }),
  age: Joi.number().invalid(0).required().messages({
    'number.base': 'Age must be a number.',
    'any.invalid': `Age cant be a zero.`,
  }),
});

module.exports = scheme;
