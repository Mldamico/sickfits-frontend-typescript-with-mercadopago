import React from 'react';
import { Product as productType } from '../types/generated-queries';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import Link from 'next/link';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import { DeleteProduct } from './DeleteProduct';
import { AddToCart } from './AddToCart';
type ProductProps = { product: productType };

export const Product = ({ product }: ProductProps) => {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <div className='buttonList'>
        <Link
          href={{
            pathname: '/update',
            query: {
              id: product.id,
            },
          }}
        >
          Edit
        </Link>
        <AddToCart id={product.id} />
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </ItemStyles>
  );
};
