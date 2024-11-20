import Loading from '@/components/loading'
import { getBannerById } from '../../_actions/banner/actions'
import BannerFormTemplate from '../../_components/BannerForm'

interface IParams {
  id: string
}

interface IBannerDto {
  id?: string
  name?: string
  status?: boolean
  imageUrl?: string
}

interface IDefaultValues {
  id: number | undefined
  name: string | undefined
  status: 'ativo' | 'inativo'
  imageUrl?: string | undefined
}

export default async function AltBanner({ params: { id } }: { params: IParams }) {
  const banner = await getBannerById(id)

  const bannerDto: IBannerDto = {
    id: banner.data?.id.toString(),
    name: banner.data?.name,
    status: banner.data?.status,
    imageUrl: banner.data?.imageUrl,
  }

  if (!banner) return <Loading />

  const defaultValues: IDefaultValues = {
    id: banner.data?.id,
    name: banner.data?.name,
    status: banner.data?.status ? 'ativo' : 'inativo',
    imageUrl: banner.data?.imageUrl,
  }

  return (
    <div>
      <BannerFormTemplate
        type={'Alterar'}
        data={bannerDto}
        defaultValues={defaultValues}
      />
    </div>
  )
}
