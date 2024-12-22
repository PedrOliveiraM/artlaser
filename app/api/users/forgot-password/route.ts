import { db } from '@/lib/prisma'
import { hashPassword } from '@/utils/auth'
import { sendPasswordRecoveryEmail } from '@/utils/mailersend'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// Função para gerar senha temporária
function generateTemporaryPassword(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Schema de validação do corpo da requisição
const userSchema = z.object({
  username: z.string(),
  email: z.string().email('O email precisa ser válido.'),
})

// Interface da resposta API
interface ApiResponse<T> {
  status: number
  data?: T
  message: string
}

export async function POST(request: Request) {
  try {
    // Parse do body usando o schema
    const body = await request.json()
    const { username, email } = userSchema.parse(body)

    // Busca o usuário no banco
    const user = await db.user.findFirst({
      where: { email, username },
    })

    if (!user) {
      return NextResponse.json<ApiResponse<null>>({
        status: 404,
        data: null,
        message: 'Usuário não encontrado com o email e nome de usuário fornecidos.',
      })
    }

    // Gera e salva a senha temporária
    const temporaryPassword = generateTemporaryPassword()
    const temporaryPasswordHash = await hashPassword(temporaryPassword)

    await db.user.update({
      where: { id: user.id },
      data: { password: temporaryPasswordHash },
    })

    // Envia o email com a senha temporária
    await sendPasswordRecoveryEmail(email, username, temporaryPassword)

    // Retorna uma mensagem de sucesso
    return NextResponse.json<ApiResponse<null>>({
      status: 200,
      data: null,
      message: 'Senha temporária gerada e enviada para o email fornecido.',
    })
  } catch (error) {
    // Tratamento de erros
    return NextResponse.json<ApiResponse<null>>({
      status: 400,
      data: null,
      message:
        error instanceof z.ZodError
          ? error.errors[0].message
          : 'Erro ao processar a solicitação.',
    })
  }
}
