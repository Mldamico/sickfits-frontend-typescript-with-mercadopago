import { useSingleOrderQuery } from '../../types/generated-queries';
import DisplayError from '../../components/ErrorMessage';
import OrderStyles from '../../components/styles/OrderStyles';
import React from 'react';
import Head from 'next/head';
import formatMoney from '../../lib/formatMoney';
type SingleOrderPageProps = {
  query: {
    id: string;
  };
};
export default function SingleOrderPage({ query }: SingleOrderPageProps) {
  const { data, error, loading } = useSingleOrderQuery({
    variables: { id: query.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { order } = data;

  return (
    <OrderStyles>
      <Head>
        <title>Sick Fits - {data.order.id}</title>
      </Head>
      <p>
        <span>Order Id:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Order Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Item Count:</span>
        <span>{order.items.length}</span>
      </p>
      <div className='items'>
        {data.order.items.map((item) => (
          <div className='order-item' key={item.id}>
            <img src={item.photo.image.publicUrlTransformed} alt={item.name} />
            <div className='item-details'>
              <h2>{item.name}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>Sub Total: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
}
