import yargs from 'yargs'
import { join } from 'path'
import { hideBin } from 'yargs/helpers'
import { config } from 'dotenv'
import express from 'express'
import { errors } from 'celebrate'
import errorHandler from './middlewares/errorHandler'
import apiRouter from './modules/apiRouter'
import mysql from 'mysql2'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import clientRouter from './modules/clientRouter'
import cors from 'cors'
import { DEF_OPTIONS } from './defines'

export const argv = yargs(hideBin(process.argv))
  .options({
    port: { type: 'number', default: DEF_OPTIONS.PORT, number: true },
    mode: {
      type: 'string',
      default: DEF_OPTIONS.ENV,
      string: true,
      choices: ['production', 'development'],
    },
  })
  .parseSync()

config({
  path: join(process.cwd(), '.env.' + argv.mode),
  debug: argv.mode === 'development',
})

const PORT = process.env?.['PORT'] || 5000

export const db = mysql.createConnection({
  host: process.env?.['DB_HOST'] || 'localhost',
  user: process.env?.['DB_USER'] || 'root',
  password: process.env?.['DB_PASSWORD'] || 'root',
  database: process.env?.['DB_SCHEMA'] || 'auth_mysql',
}).promise()

function main() {
  const app = express()

  app.use(express.static(process.cwd() + '/public'))
  app.use(cors())
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use('/api', apiRouter)
  app.use(errors())
  app.use(errorHandler)
  app.use(clientRouter)

  app.listen(PORT, () => {
    console.log(`[express]: Server is running at ${PORT} port`)
  })
}

try {
  main()
} catch (e) {
  console.error((e as Error).message)
  process.exit(0)
}
