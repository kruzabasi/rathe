const joi = require("@hapi/joi");

const checkSignin = data => {
  const validationSchema = joi.object({
    email: joi
      .string()
      .min(4)
      .required()
      .email(),
    password: joi
      .string()
      .min(4)
      .required()
  });
  return validationSchema.validate(data);
};
const checkSignup = data => {
  const validationSchema = joi.object({
    fullName: joi
      .string()
      .min(4)
      .required(),
    userName: joi
      .string()
      .min(4)
      .required(),
    email: joi
      .string()
      .min(4)
      .required()
      .email(),
    password: joi
      .string()
      .min(4)
      .required(),
    address: joi
      .string()
      .min(4)
      .required()
  });
  return validationSchema.validate(data);
};

module.exports.checkSignin = checkSignin;
module.exports.checkSignup = checkSignup;
