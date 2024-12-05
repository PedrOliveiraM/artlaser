import { SignIn } from '@/components/signin-button'

const Home = async () => {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Página em Construção 🚧</h1>
      <p className="text-lg mb-6 text-center">
        Estamos trabalhando para trazer melhorias! Por favor, faça login para acessar a
        área administrativa.
      </p>
      <SignIn />
    </main>
  )
}

export default Home
