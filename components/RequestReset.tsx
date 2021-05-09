import React from 'react';
import Form from './styles/Form';
import { useForm } from '../lib/useForm';
import DisplayError from './ErrorMessage';
import {
  useRequestResetMutation,
  useSignUpMutation,
} from '../types/generated-queries';

export const RequestReset = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const [requestPassword, { data, error, loading }] = useRequestResetMutation({
    variables: {
      email: inputs.email,
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await requestPassword().catch(console.error);
    resetForm();
  };

  return (
    <Form method='POST'>
      <DisplayError error={error} />

      <h2>Requesting a Reset</h2>

      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link!</p>
        )}
        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            autoComplete='email'
            placeholder='Your Email Address'
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <button type='submit' onClick={handleSubmit}>
          Request Reset!
        </button>
      </fieldset>
    </Form>
  );
};
