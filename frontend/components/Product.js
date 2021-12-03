import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import TitleStyle from './styles/TitleStyle';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

export default function Product({ product }) {
  return (
    <ItemStyles>
      <img
        /* ? is nested conditional chaining */
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <TitleStyle>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </TitleStyle>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: '/update',
            query: {
              id: product.id,
            },
          }}
        >
          Edit ✏️
        </Link>
      </div>
    </ItemStyles>
  );
}
