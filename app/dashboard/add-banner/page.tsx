import BannerFormTemplate from '../_components/BannerForm'

interface IParams {
  id: string
}

interface IDefaultValues {
  id: number | undefined
  name: string | undefined
  status: 'ativo' | 'inativo'
  imageUrl?: string | undefined
}

export default async function AltBanner({ params: { id } }: { params: IParams }) {
  const defaultValues: IDefaultValues = {
    id: undefined,
    name: undefined,
    status: 'inativo',
    imageUrl: undefined,
  }

  return (
    <div>
      <BannerFormTemplate type={'Cadastrar'} data={null} defaultValues={defaultValues} />
    </div>
  )
}
