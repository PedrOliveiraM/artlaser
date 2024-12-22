import { db } from '@/lib/prisma'
import { ApiResponse } from '@/utils/ApiResponse'
import { userSchema } from '@/utils/SchemasValidation'
import { hashPassword } from '@/utils/auth'
import { User } from '@prisma/client'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

interface IUser {
  username: string
  email: string
  password: string
}

export async function POST(request: Request) {
  try {
    const body: IUser = await request.json()

    const { username, email, password } = userSchema.parse(body)

    if (!email || !password) {
      return NextResponse.json<ApiResponse<User>>({
        status: 400,
        data: undefined,
        message: 'Está faltando email ou senha',
      })
    }

    const hashedPassword = await hashPassword(password)

    if (!hashedPassword) {
      throw new Error('Problema em gerar o hash da senha')
    }

    const newUser = await db.user.create({
      data: {
        username: username || '',
        email,
        password: hashedPassword,
      },
    })

    // Retorna sucesso
    return NextResponse.json<ApiResponse<User>>({
      status: 200,
      data: newUser,
      message: 'Usuário cadastrado com sucesso',
    })
  } catch (error) {
    if (error instanceof ZodError) {
      const errosMessage: string[] = error.errors.map(
        err => `${err.path.join('.')} - ${err.message}`
      )

      return NextResponse.json<ApiResponse<User>>(
        {
          status: 400,
          data: undefined,
          message: 'Erro de validação nos campos',
          errors: errosMessage,
        },
        { status: 400 } // Define explicitamente o status HTTP
      )
    }

    return NextResponse.json<ApiResponse<User>>(
      {
        status: 500,
        data: undefined,
        message: 'Erro desconhecido',
      },
      { status: 500 } // Define explicitamente o status HTTP
    )
  }
}
