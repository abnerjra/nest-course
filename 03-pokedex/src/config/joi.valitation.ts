import * as Joi from "joi";

export const JoiValidationSchema = Joi.object({
  PORT: Joi.required(),
  MONGO_DB: Joi.string().default(3000),
  DEFAULT_LIMIT: Joi.number().default(6)
});