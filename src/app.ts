import { env } from './env'
import { app } from './bootstrap'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() =>
    console.log(`http server running : http://${env.HOST}:${env.PORT}`),
  )
