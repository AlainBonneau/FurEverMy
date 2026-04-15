import Joi from "joi";

const validate = (schema, source) => {
  const joiSchema = Joi.object(schema);
  const { error, value } = joiSchema.validate(source, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    error.statusCode = 400;
    throw error;
  }

  return value;
};

export default validate;
