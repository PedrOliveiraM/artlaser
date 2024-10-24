import { getProductById } from '../../_actions/actions'
import ProductForm from '../../_components/ProductForm'

interface IParams {
  id: string
}

export default async function AltProduct({
  params: { id },
}: {
  params: IParams
}) {
  const ID = parseInt(id)
  const product = await getProductById(ID)

  return (
    <>
      <ProductForm data={product.data} />
    </>
  )
}
