import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { UserForm } from '../_components/UserForm'

export default async function Settings() {
  const user = await db.user.findFirst()

  if (!user) return 'erro'

  return (
    <div className="h-screen flex justify-center items-center">
      <UserForm email={user?.email} username={user.username} />
    </div>
  )
}
