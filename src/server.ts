import dotenv from 'dotenv'
import prisma from './db/connection/prisma-connection'

dotenv.config()

async function main (): Promise<void> {
  const app = (await import('./config/app')).default
  app.listen(process.env.PORT, () => {
    console.log(`Environment: ${process.env.ENVIRONMENT}`)
    console.log(`Servidor rodando em: ${process.env.HOST}:${process.env.PORT}`)
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
  })
