import Head from 'next/head';
import React from 'react';
import PaginationStyles from './styles/PaginationStyles';
import Link from 'next/link';
import { usePaginationQuery } from '../types/generated-queries';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

export const Pagination = ({ page }: { page: number }) => {
  const { data, error, loading } = usePaginationQuery();
  if (loading) return <p>Loading</p>;
  if (error) return <DisplayError error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} of {pageCount}
        </title>
      </Head>

      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}> ← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  );
};