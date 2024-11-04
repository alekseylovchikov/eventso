import signup from '@/features/auth/mutations/signup';
import { useMutation } from '@blitzjs/rpc';
import { Vertical } from 'mantine-layout-components';
import { Button, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

type SignupFormProps = {
  onSuccess?: () => void;
};

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup);

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const onSubmit = async (values) => {
    await signupMutation(values);
    props.onSuccess?.();
  };

  return (
    <Vertical>
      <Title>Create an Account</Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Email"
          {...form.getInputProps('email')}
        />

        <TextInput withAsterisk label="Name" placeholder="Name" {...form.getInputProps('name')} />

        <PasswordInput withAsterisk label="Password" {...form.getInputProps('password')} />

        <Button type="submit">Submit</Button>
      </form>
    </Vertical>
  );
};

export default SignupForm;
