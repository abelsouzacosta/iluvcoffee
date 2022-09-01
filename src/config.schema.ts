import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  DATABASE_PORT: Joi.string().required(),
  API_KEY: Joi.string().required(),
});
