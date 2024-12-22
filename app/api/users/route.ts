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

    // Verifique se o email já existe
    const existingUser = await db.user.findUnique({
      where: {
        email: email,
      },
    })

    if (existingUser) {
      return NextResponse.json<ApiResponse<User>>({
        status: 409, // Conflito de dados
        data: undefined,
        message: 'O email já está em uso.',
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

    return NextResponse.json<ApiResponse<User>>({
      status: 200,
      data: newUser,
      message: 'Usuário cadastrado com sucesso',
    })
  } catch (error) {
    console.error(error) // Log do erro completo

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
        { status: 400 }
      )
    }

    return NextResponse.json<ApiResponse<User>>(
      {
        status: 500,
        data: undefined,
        message: 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}
