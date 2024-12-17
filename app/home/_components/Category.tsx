import { Button } from '@/components/ui/button'

export function Category({ name }: { name: string }) {
  return (
    <Button variant={'link'} className="flex justify-start">
      {name}
    </Button>
  )
}
