import ProductChangeForm from '../../_components/Alt-product'
import { getProductById } from '../../_actions/actions'
import Loading from '@/components/loading'

interface IParams {
  id: string
}

interface IDefaultValues {
  name: string | undefined
  description: string | undefined
  category: string | undefined
  retailPrice: number | undefined
  wholesalePrice: number | undefined
  minQuantity: number | undefined
  status: 'ativo' | 'inativo'
  imageUrl?: string | undefined
}

export default async function Page({ params: { id } }: { params: IParams }) {
  const product = await getProductById(id)

  if (!product) return <Loading />

  const defaultValues: IDefaultValues = {
    name: product.data?.name,
    description: product.data?.description,
    category: product.data?.category,
    retailPrice: product.data?.retailPrice.toNumber(),
    wholesalePrice: product.data?.wholesalePrice.toNumber(),
    minQuantity: product.data?.minQuantity,
    status: product.data?.status ? 'ativo' : 'inativo',
    imageUrl: product.data?.imageUrl,
  }
  return (
    <div>
      <ProductChangeForm defaultValues={defaultValues} />
    </div>
  )
}
