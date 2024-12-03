import { db } from '@/lib/prisma'
import { ApiResponse } from '@/utils/ApiResponse'
import { settingsSchema } from '@/utils/SchemasValidation'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export interface UserDto {
  id: number
  email: string
  username: string
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<UserDto | null>>> {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json<ApiResponse<null>>(
        { message: 'ID é necessário', status: 400 },
        { status: 400 }
      )
    }

    const parsedId = parseInt(id)
    const body = await request.json()
    const parsedBody = settingsSchema.parse(body)

    const user = await db.user.findUnique({
      where: { id: parsedId },
    })

    if (!user) {
      return NextResponse.json<ApiResponse<null>>(
        { message: 'Usuário não encontrado', status: 404 },
        { status: 404 }
      )
    }

    const isPasswordValid = await bcrypt.compare(parsedBody.password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json<ApiResponse<null>>(
        { message: 'Senha atual incorreta', status: 400 },
        { status: 400 }
      )
    }

    const updatedData: { username?: string; email?: string; password?: string } = {}

    if (parsedBody.username) {
      updatedData.username = parsedBody.username
    }

    if (parsedBody.email) {
      updatedData.email = parsedBody.email
    }

    if (parsedBody.newPassword) {
      updatedData.password = await bcrypt.hash(parsedBody.newPassword, 10)
    }

    const updatedUser = await db.user.update({
      where: { id: parsedId },
      data: updatedData,
    })

    return NextResponse.json<ApiResponse<UserDto>>(
      {
        data: {
          id: updatedUser.id,
          username: updatedUser.username,
          email: updatedUser.email,
        },
        status: 200,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    return NextResponse.json<ApiResponse<null>>(
      { message: 'Erro interno no servidor', status: 500 },
      { status: 500 }
    )
  }
}
