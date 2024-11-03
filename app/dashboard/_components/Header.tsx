import User from './User'

export function Header() {
  return (
    <header className="flex items-center justify-between py-3">
      <h1 className="pt-3 text-4xl font-bold">Artlaser Dashboard</h1>
      <User />
    </header>
  )
}
