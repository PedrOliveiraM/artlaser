import { db } from '@/lib/prisma'
import { ApiResponse } from '@/utils/ApiResponse'
import { verifyPassword } from '@/utils/auth'
import { User } from '@prisma/client'
import { NextResponse } from 'next/server'
interface IUserProps {
  username: string
  email: string
  password: string
}

export async function POST(request: Request) {
  try {
    const body: IUserProps = await request.json()

    const { username, email, password } = body

    const user = await db.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    })

    if (!user)
      return NextResponse.json<ApiResponse<User>>({
        status: 404,
        message: 'Usuário não encontrado',
      })

    const isValid = await verifyPassword(password, user.password)

    if (!isValid) {
      return NextResponse.json<ApiResponse<User>>({
        status: 401,
        message: 'Credenciais não inválidas',
      })
    }

    return NextResponse.json<ApiResponse<User>>({
      status: 200,
      message: 'Login bem-sucedido',
    })
  } catch (error) {
    NextResponse.json<ApiResponse<User>>({
      status: 500,
      message: 'Erro interno no servidor',
    })
  }
}
