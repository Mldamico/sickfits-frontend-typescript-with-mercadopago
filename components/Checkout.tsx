import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import SickButton from './styles/SickButton';
import nProgress from 'nprogress';
import {
  refetchCurrentUserQuery,
  useCheckoutMutation,
  useMercadoPagoMutation,
} from '../types/generated-queries';
import calcTotalPrice from '../lib/calcTotalPrice';
const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

// async function buyThing(cart) {
//   console.log(cart);
//   var orderData = {
//     cart,
//   };
//   try {
//     const response = await fetch('/api/mp', {
//       method: 'POST',
//       body: JSON.stringify(orderData),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const data = await response.json();

//     console.log(data);
//     if (!response.ok) {
//       throw Error('Something went wrong');
//     }
//     return data;
//   } catch (error) {
//     console.log('Error');
//     throw Error(error);
//   }
// }

export const Checkout = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [mercadoPago, { data: mpData }] = useMercadoPagoMutation();

  const buy = async (e) => {
    e.preventDefault();
    setLoading(true);
    nProgress.start();
    try {
      // const { initPoint } = await buyThing(cart);
      setLoading(true);
      nProgress.start();
      const { data } = await mercadoPago();
      console.log(data);
      setLoading(false);
      nProgress.done();
      router.push(data.mercadoPago);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <CheckoutFormStyles onSubmit={buy}>
      {error && 'Something went wrong'}
      <SickButton>Pay With Mercado Pago</SickButton>
    </CheckoutFormStyles>
  );
};

export interface MP {
  collection_id: string;
  collection_status: string;
  external_reference: string;
  merchant_account_id: string;
  merchant_order_id: string;
  payment_id: string;
  payment_type: string;
  preference_id: string;
  processing_mode: string;
  site_id: string;
  status: string;
}
