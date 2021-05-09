import React, { SyntheticEvent } from 'react';
import { useForm } from '../lib/useForm';
import {
  refetchFindProductByIdQuery,
  useFindProductByIdQuery,
  useUpdateProductMutation,
} from '../types/generated-queries';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import Router from 'next/router';

export const UpdateProduct = ({ id }: { id: string }) => {
  const { data, error, loading } = useFindProductByIdQuery({
    variables: { id },
  });

  const { inputs, handleChange, resetForm, clearForm } = useForm(data?.Product);
  const [
    updateProduct,
    { data: dataUpdate, error: errorUpdate, loading: loadingUpdate },
  ] = useUpdateProductMutation();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    await updateProduct({
      variables: {
        id,
        name: inputs.name,
        description: inputs.description,
        price: inputs.price,
      },
      refetchQueries: [refetchFindProductByIdQuery({ id })],
    });
    clearForm();
    void Router.push({
      pathname: `/product/${id}`,
    });
  }
  console.log(data);
  if (loading) return <p>Loading...</p>;
  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error || errorUpdate} />

      <fieldset disabled={loadingUpdate} aria-busy={loadingUpdate}>
        <label htmlFor='image'>
          Image
          <input type='file' id='image' name='image' onChange={handleChange} />
        </label>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Name'
            value={inputs?.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='price'>
          Price
          <input
            type='number'
            id='price'
            name='price'
            placeholder='Price'
            value={inputs?.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='description'>
          description
          <textarea
            cols={5}
            rows={5}
            id='description'
            name='description'
            placeholder='Description'
            value={inputs?.description}
            onChange={handleChange}
          />
        </label>

        <button type='submit'>Update Product</button>
      </fieldset>
    </Form>
  );
};
