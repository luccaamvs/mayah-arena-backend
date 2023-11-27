import dotenv from 'dotenv'
dotenv.config()

export default {
  environment: process.env.ENVIRONMENT,
  host: process.env.HOST,
  port: process.env.PORT,
  databaseUrlDev: process.env.DATABASE_URL_DEV,
  databaseUrlHomolog: process.env.DATABASE_URL_HOMOLOG,
  jwtSecret: process.env.JWT_SECRET ?? 'my_jwt_secret'
}
