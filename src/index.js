import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRouter.js'
import companyRouter from './routes/companyRouter.js'
import propertyRouter from './routes/propertyRouter.js'
import commentRouter from './routes/commentRouter.js'
import authRouter from './routes/authRouter.js'
import sessionRouter from './routes/sessionRouter.js' // Importar o roteador de sessões
import errorHandler from './middlewares/errorHandler.js'
import logger from './middlewares/logger.js'

const app = express()
app.use(express.json())
app.use(logger) // Middleware de logging

app.use(cors())

// Rotas públicas
app.get('/', (req, res) => res.json({ message: "Bem vindo a API" }))
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/companies', companyRouter)
app.use('/properties', propertyRouter)
app.use('/comments', commentRouter)
app.use('/sessions', sessionRouter) // Adicionar o roteador de sessões

// Middleware de tratamento de erros
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})