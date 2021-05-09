import React from 'react';
import Form from './styles/Form';
import { useForm } from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { useRedeemPasswordResetMutation } from '../types/generated-queries';

export const Reset = ({ token }: { token: string }) => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });
  const [reset, { data, loading, error }] = useRedeemPasswordResetMutation({
    variables: {
      email: inputs.email,
      password: inputs.password,
      token: inputs.token,
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await reset().catch(console.error);
    console.log(data);
    resetForm();
  };

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  return (
    <Form method='POST'>
      <DisplayError error={error || successfulError} />

      <h2>Reset Your Password</h2>

      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in!</p>
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
        <label htmlFor='password'>
          Password
          <input
            type='password'
            name='password'
            autoComplete='password'
            placeholder='Password'
            value={inputs.password}
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
