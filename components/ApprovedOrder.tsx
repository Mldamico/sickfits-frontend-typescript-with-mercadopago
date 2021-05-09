import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {
  refetchCurrentUserQuery,
  useCheckoutMutation,
} from '../types/generated-queries';
import nProgress from 'nprogress';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useUser } from './User';

export const ApprovedOrder = () => {
  const me = useUser();
  const router = useRouter();
  const [checkout] = useCheckoutMutation({
    refetchQueries: [refetchCurrentUserQuery()],
  });

  useEffect(() => {
    const { query } = router;

    if (query.status === 'approved') {
      checkoutHandler(query.payment_id);
    }
  }, []);

  const checkoutHandler = async (payment_id) => {
    nProgress.start();
    const amount = calcTotalPrice(me.cart);
    console.log(amount);
    console.log(payment_id);
    const order = await checkout({ variables: { amount, id: payment_id } });
    router.push({
      pathname: `/order/[id]`,
      query: { id: order.data.checkout.id },
    });

    nProgress.done();
  };
  return (
    <div>
      <h2>Order Approved, Loading...</h2>
    </div>
  );
};
