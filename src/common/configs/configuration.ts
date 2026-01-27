export default () => ({
  // Default
  NODE_ENV: process.env.NODE_ENV,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_DATABASE: process.env.DB_DATABASE,

  // Redis
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: Number(process.env.REDIS_PORT),
  REDIS_DB: Number(process.env.REDIS_DB),

  // Bcrypt
  BCRYPT_SALT: Number(process.env.BCRYPT_SALT),

  // Nodemailer
  MAILER_HOST: process.env.MAILER_HOST,
  MAILER_PORT: Number(process.env.MAILER_PORT),
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,

  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
});
