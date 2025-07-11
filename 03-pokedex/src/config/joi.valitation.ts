import * as Joi from "joi";

export const JoiValidationSchema = Joi.object({
  PORT: Joi.required().default(3000),
  MONGO_DB: Joi.string(),
  DEFAULT_LIMIT: Joi.number().default(6)
});