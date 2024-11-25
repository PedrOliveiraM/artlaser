import { db } from '@/lib/prisma'
import { UserForm } from '../_components/UserForm'

export default async function Settings() {
  const user = await db.user.findFirst()

  if (!user) return 'erro'

  return (
    <div className="h-screen flex justify-center items-center">
      <UserForm id={user?.id} email={user?.email} username={user.username} />
    </div>
  )
}
