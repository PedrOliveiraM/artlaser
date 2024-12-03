'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

enum EError {
  Configuration = 'Configuration',
}

const errorMap = {
  [EError.Configuration]: (
    <p>
      Ocorreu um problema ao tentar autenticar. Por favor, entre em contato conosco se
      este erro persistir. Código de erro único:{' '}
      <code className="rounded-sm bg-slate-100 p-1 text-xs">Configuração</code>
    </p>
  ),
}

export default function AuthErrorPage() {
  const search = useSearchParams()
  const error = search.get('error') as EError

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="block space-y-2 max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow dark:border-gray-700 dark:bg-gray-800">
        <h5 className="mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Algo deu errado
        </h5>
        <div className="font-normal text-gray-700 dark:text-gray-400">
          {errorMap[error] || 'Entre em contato conosco se o erro persistir.'}
        </div>
        <Button type="button" asChild>
          <Link href={'/'}>Página Inicial</Link>
        </Button>
      </div>
    </div>
  )
}
