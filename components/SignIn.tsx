import React from 'react';
import Form from './styles/Form';
import { useForm } from '../lib/useForm';
import DisplayError from './ErrorMessage';
import {
  refetchCurrentUserQuery,
  useSignInMutation,
  useCurrentUserQuery,
} from '../types/generated-queries';

export const SignIn = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const [signIn, { data, loading }] = useSignInMutation({
    variables: { email: inputs.email, password: inputs.password },
    refetchQueries: [refetchCurrentUserQuery()],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn();
    resetForm();
  };
  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;
  return (
    <Form method='POST'>
      <h2>Sign Into For An Account</h2>
      <DisplayError error={error} />
      <fieldset>
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
          Sign In!
        </button>
      </fieldset>
    </Form>
  );
};
