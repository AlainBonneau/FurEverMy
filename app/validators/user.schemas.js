import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
const allowedRoles = ["user", "Employé", "Admin"];

const userSchemas = {
  createUser: {
    avatar: Joi.string().min(1).allow(null, ""),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "fr"] },
      })
      .required(),
    lastname: Joi.string().min(1).max(30).required(),
    firstname: Joi.string().min(1).max(30).required(),
    birthdate: Joi.date().utc().format(["DD-MM-YYYY"]).required(),
    password: Joi.string().min(8).pattern(passwordRegex).required(),
    role: Joi.string()
      .valid(...allowedRoles)
      .required(),
    is_active: Joi.boolean(),
  },

  updateData: {
    avatar: Joi.string().min(1).allow(null, ""),
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
    lastname: Joi.string()
      .min(1)
      .max(30)
      .messages({
        "string.base": "Username should be a string",
        "string.empty": "Username cannot be empty",
        "any.required": "Username is required",
      })
      .required(),
    firstname: Joi.string().min(1).max(30).required(),
    birthdate: Joi.date().utc().format(["DD-MM-YYYY"]).required(),
    password: Joi.string()
      .min(8)
      .pattern(passwordRegex)

      .messages({
        "string.base": "Username should be a string",
        "string.empty": "Username cannot be empty",
        "any.required": "Username is required",
      })
      .required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    arrival_date: Joi.date().utc().format(["DD-MM-YYYY HH:mm"]),
    leaving_date: Joi.date().utc().format(["DD-MM-YYYY HH:mm"]),
    role: Joi.string()
      .valid(...allowedRoles)
      .messages({
        "string.base": "Username should be a string",
        "string.empty": "Username cannot be empty",
        "any.required": "Username is required",
      })
      .required(),
    is_active: Joi.boolean(),
  },
};

export default userSchemas;
