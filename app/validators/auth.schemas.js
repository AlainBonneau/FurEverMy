import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

const authSchemas = {
  registerData: {
    avatar: Joi.string().min(1),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "fr"] },
      })
      .messages({
        "string.email": "Email must be a valid email",
        "string.empty": "Email cannot be empty",
        "any.required": "Email is required",
      })
      .required(),
    lastname: Joi.string().min(1).max(30).required(),
    firstname: Joi.string().min(1).max(30).required(),
    birthdate: Joi.date()
      .utc()
      .format(["DD-MM-YYYY"])
      .messages({
        "string.email": "Email must be a valid email",
        "string.empty": "Email cannot be empty",
        "any.required": "Email is required",
      })
      .required(),
    password: Joi.string()
      .min(8)
      .pattern(passwordRegex)
      .messages({
        "string.email": "Email must be a valid email",
        "string.empty": "Email cannot be empty",
        "any.required": "Email is required",
      })
      .required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    arrival_date: Joi.date().utc().format(["DD-MM-YYYY HH:mm"]),
    leaving_date: Joi.date().utc().format(["DD-MM-YYYY HH:mm"]),
    role: Joi.any().forbidden(),
  },

  loginData: {
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "fr"] },
      })
      .messages({
        "string.email": "Email must be a valid email",
        "string.empty": "Email cannot be empty",
        "any.required": "Email is required",
      })
      .required(),
    password: Joi.string()
      .min(8)
      .pattern(passwordRegex)
      .messages({
        "string.email": "Email must be a valid email",
        "string.empty": "Email cannot be empty",
        "any.required": "Email is required",
      })
      .required(),
  },
};

export default authSchemas;
