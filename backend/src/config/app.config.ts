// config/app.config.ts
export default () => ({
  app: {
    name: process.env.APP_NAME || 'Fresha Clone',
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'superSecretKey',
    expiresIn: '7d',
  },
  mail: {
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.MAIL_PORT || '587', 10),
    user: process.env.MAIL_USER || 'example@gmail.com',
    pass: process.env.MAIL_PASS || 'password',
  },
});
