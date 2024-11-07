import ProductChangeForm from '../../_components/Alt-product'
import { getProductById } from '../../_actions/actions'

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
}

export default async function Page({ params: { id } }: { params: IParams }) {
  const product = await getProductById(id)

  if (!product) return 'd'

  const defaultValues: IDefaultValues = {
    name: product.data?.name,
    description: product.data?.description,
    category: product.data?.category,
    retailPrice: product.data?.retailPrice.toNumber(),
    wholesalePrice: product.data?.wholesalePrice.toNumber(),
    minQuantity: product.data?.minQuantity,
    status: product.data?.status ? 'ativo' : 'inativo',
  }
  return (
    <div>
      <ProductChangeForm defaultValues={defaultValues} />
    </div>
  )
}
