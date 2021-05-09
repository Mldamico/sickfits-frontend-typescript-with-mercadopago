import React from 'react';
import Form from './styles/Form';
import { useForm } from '../lib/useForm';
import DisplayError from './ErrorMessage';
import {
  refetchCurrentUserQuery,
  useSignInMutation,
  useCurrentUserQuery,
  useSignUpMutation,
} from '../types/generated-queries';

export const SignUp = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
  });
  const [signIn, { data, error, loading }] = useSignUpMutation({
    variables: {
      email: inputs.email,
      name: inputs.name,
      password: inputs.password,
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn().catch(console.error);
    resetForm();
  };

  return (
    <Form method='POST'>
      <h2>Sign Up For An Account</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email}. Please Go Ahead and Sign In!
          </p>
        )}
        <label htmlFor='name'>
          Name
          <input
            type='text'
            name='name'
            autoComplete='name'
            placeholder='Your Name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
