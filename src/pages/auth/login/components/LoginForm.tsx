import { PromiseReturnType } from 'blitz';
import Link from 'next/link';
import login from '@/features/auth/mutations/login';
import { useMutation } from '@blitzjs/rpc';
import { Routes } from '@blitzjs/next';
import { useForm } from '@mantine/form';
import { Button, PasswordInput, TextInput, Title } from '@mantine/core';
import { Vertical } from 'mantine-layout-components';

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login);

  const onSubmit = async (values) => {
    const user = await loginMutation(values);
    props.onSuccess?.(user);
  };

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Vertical>
      <Title>Login</Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Email"
          {...form.getInputProps('email')}
        />

        <PasswordInput withAsterisk label="Password" {...form.getInputProps('password')} />

        <Button type="submit">Submit</Button>
      </form>
      <Link href={Routes.ForgotPasswordPage()}>Forgot your password?</Link>
      Or <Link href={Routes.SignupPage()}>Sign Up</Link>
    </Vertical>
  );
};

export default LoginForm;
