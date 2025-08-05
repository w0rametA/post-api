import * as dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: process.env.PORT,
  database: {
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || 6680),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: !!(process.env.DB_SYNCHRONIZE === 'true'),
    log: !!(process.env.DB_LOGGING === 'true'),
  },
  jwt: {
    secret: process.env.SECRET_KEY,
  },
  initialUser: {
    username: process.env.USER_USERNAME,
    password: process.env.USER_PASSWORD,
  },
}
