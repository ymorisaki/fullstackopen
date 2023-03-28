import logger from "./logger"

const requestLogger = (req: any, res: any, next: any) => {
  logger.info(`Method: ${req.method}`)
  logger.info(`Path: ${req.path}`)
  logger.info(`Body: ${req.body}`)
  logger.info('---')
  next()
}

const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.error(err.message)

  if (err.name === 'CastError' || err.name === 'ValidationError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(err)
}

const unknownEndPoint = (req: any, res: any) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

export = {
  requestLogger,
  errorHandler,
  unknownEndPoint
}
