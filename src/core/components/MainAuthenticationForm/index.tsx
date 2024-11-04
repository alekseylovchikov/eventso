import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm, zodResolver } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import { z } from 'zod';
import { GoogleButton, TwitterButton } from './SocialButtons';
import { useMutation } from '@blitzjs/rpc';
import login from '@/features/auth/mutations/login';
import signup from '@/features/auth/mutations/signup';
import { Vertical } from 'mantine-layout-components';
import { SignupInput } from '@/features/auth/schemas';

type SignupFormType = z.infer<typeof SignupInput>;

export const bindCheckboxToForm = (form: any, key: string) => {
  const inputProps = form.getInputProps(key);
  return {
    ...inputProps,
    checked: inputProps.value,
  };
};

export function MainAuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const [$login, { isLoading: loginIsLoading }] = useMutation(login);
  const [$signup, { isLoading: signupIsLoading }] = useMutation(signup);

  const form = useForm<SignupFormType>({
    validate: zodResolver(SignupInput),
    validateInputOnBlur: true,
    validateInputOnChange: ['terms'],
  });

  return (
    <Vertical mih="100vh" center fullH fullW>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to Eventso, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit(async (values) => {
            if (type === 'login') {
              await $login(values);
            } else {
              await $signup(values);
            }
          })}
        >
          <Stack>
            {type === 'register' && (
              <TextInput
                required
                label="Name"
                placeholder="Your name"
                {...form.getInputProps('name')}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              {...form.getInputProps('email')}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              {...form.getInputProps('password')}
              radius="md"
            />

            {type === 'register' && (
              <Checkbox
                {...bindCheckboxToForm(form, 'terms')}
                label="I accept terms and conditions"
                // checked={form.values.terms}
                // onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button
              disabled={!form.isValid()}
              loading={loginIsLoading || signupIsLoading}
              type="submit"
              radius="xl"
            >
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Vertical>
  );
}
