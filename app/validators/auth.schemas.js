import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

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
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd][A-Za-zd@$!%*?&]{8,}$"
        )
      )
      .messages({
        "string.email": "Email must be a valid email",
        "string.empty": "Email cannot be empty",
        "any.required": "Email is required",
      })
      .required(),
    confirmPassword: Joi.ref("password"),
    arrival_date: Joi.date().utc().format(["DD-MM-YYYY HH:mm"]),
    leaving_date: Joi.date().utc().format(["DD-MM-YYYY HH:mm"]),
    role: Joi.string().min(5).max(8).required(),
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
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd][A-Za-zd@$!%*?&]{8,}$"
        )
      )
      .messages({
        "string.email": "Email must be a valid email",
        "string.empty": "Email cannot be empty",
        "any.required": "Email is required",
      })
      .required(),
  },
};

export default authSchemas;
