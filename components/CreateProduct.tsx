import React, { SyntheticEvent } from 'react';
import { useState } from 'react';
import { useForm } from '../lib/useForm';
import {
  refetchAllProductsQuery,
  useCreateProductMutation,
} from '../types/generated-queries';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import Router from 'next/router';

export const CreateProduct = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: '',
    price: 0,
    description: '',
  });
  const [
    createProductMutation,
    { data, error, loading },
  ] = useCreateProductMutation({
    variables: {
      name: inputs.name,
      price: inputs.price,
      description: inputs.description,
      image: inputs.image,
    },
    refetchQueries: [refetchAllProductsQuery()],
  });

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    await createProductMutation();
    clearForm();
    void Router.push({
      pathname: `/product/${data.createProduct.id}`,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
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
            value={inputs.name}
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
            value={inputs.price}
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
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type='submit'>+ Add Product</button>
      </fieldset>
    </Form>
  );
};
