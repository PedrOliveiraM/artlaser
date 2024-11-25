import { db } from '@/lib/prisma'
import { ApiResponse } from '@/utils/ApiResponse'
import { hashPassword, verifyPassword } from '@/utils/auth'
import { userSchema } from '@/utils/SchemasValidation'
import { User } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function updateUser(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const id = parseInt(params.id)

    const { username, email, password, newPassword } = userSchema.parse(body)

    const user = await db.user.findUnique({ where: { id } })
    if (!user) {
      return NextResponse.json<ApiResponse<User>>(
        {
          status: 404,
          data: undefined,
          message: 'Usuário não encontrado',
        },
        { status: 404 }
      )
    }

    if (!(await verifyPassword(password, user.password))) {
      return NextResponse.json<ApiResponse<User>>(
        {
          status: 403,
          data: undefined,
          message: 'Senha incorreta',
        },
        { status: 403 }
      )
    }

    // Validação de dados duplicados
    const duplicateCheck = await db.user.findFirst({
      where: {
        OR: [{ username }, { email }],
        AND: { id: { not: id } },
      },
    })

    if (duplicateCheck) {
      return NextResponse.json<ApiResponse<User>>(
        {
          status: 409,
          data: undefined,
          message: 'Nome de usuário ou email já em uso',
        },
        { status: 409 }
      )
    }

    const newPasswordHashed = newPassword
      ? await hashPassword(newPassword)
      : user.password

    const updatedUser = await db.user.update({
      where: { id },
      data: {
        username,
        email,
        password: newPasswordHashed,
      },
    })

    return NextResponse.json<ApiResponse<User>>(
      {
        status: 200,
        data: updatedUser,
        message: 'Alteração feita com sucesso',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    return NextResponse.json<ApiResponse<User>>(
      {
        status: 500,
        data: undefined,
        message: 'Erro desconhecido ao atualizar usuário',
      },
      { status: 500 }
    )
  }
}
