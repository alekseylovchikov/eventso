import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Input, MantineSize } from '@mantine/core';

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
  /** Field name. */
  name: string;
  /** Field label. */
  label: string;
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: 'text' | 'password' | 'email' | 'number';
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>;
  labelProps?: ComponentPropsWithoutRef<'label'>;
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, labelProps, name, size, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext();
    const sizeProp: MantineSize | undefined = size as MantineSize | undefined;

    return (
      <div {...outerProps}>
        <label {...labelProps}>
          {label}
          <Input disabled={isSubmitting} size={sizeProp} {...register(name)} {...props} />
        </label>

        <ErrorMessage
          render={({ message }) => (
            <div role="alert" style={{ color: 'red' }}>
              {message}
            </div>
          )}
          errors={errors}
          name={name}
        />

        <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-size: 1rem;
          }
        `}</style>
      </div>
    );
  },
);

export default LabeledTextField;
