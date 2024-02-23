import { Router } from 'express'
import { join } from 'path'

const clientRouter = Router()

clientRouter.get('(/*)?', (req, res) => {
  try {
    return res.sendFile(join(process.cwd(), 'public', 'index.html'))
  } catch (err) {
    console.log(err)
    return res.status(500).end()
  }
})

clientRouter.all('*', (_, res) => res.status(404).end())

export default clientRouter
