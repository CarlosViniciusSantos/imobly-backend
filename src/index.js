import express from 'express'
import userRouter from './routes/userRouter.js'
import companyRouter from './routes/companyRouter.js'
import propertyRouter from './routes/propertyRouter.js'
import commentRouter from './routes/commentRouter.js'
import { auth } from './middlewares/auth.js'
import errorHandler from './middlewares/errorHandler.js'
import logger from './middlewares/logger.js'

const app = express()
app.use(express.json())
app.use(logger) // Middleware de logging

// Rotas públicas
app.get('/', (req, res) => res.json({ message: "Bem vindo a API" }))

// Rotas protegidas
app.use(auth) // Middleware de autenticação
app.use('/users', userRouter)
app.use('/companies', companyRouter)
app.use('/properties', propertyRouter)
app.use('/comments', commentRouter)

// Middleware de tratamento de erros
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})