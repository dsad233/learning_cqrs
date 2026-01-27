import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // Default
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  DB_HOST: Joi.string().hostname().required().default('localhost'),
  DB_PORT: Joi.number().port().default(3306),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  // Redis
  REDIS_HOST: Joi.string().hostname().required().default('localhost'),
  REDIS_PORT: Joi.number().port().required().default(6379),
  REDIS_DB: Joi.number().required(),

  // Bcrypt
  BCRYPT_SALT: Joi.number().required(),
  // Nodemailer
  MAILER_HOST: Joi.string().required(),
  MAILER_PORT: Joi.number().required(),
  MAIL_USER: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),
  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
});
