'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { trpc } from '@documenso/trpc/react';
import { cn } from '@documenso/ui/lib/utils';
import { Button } from '@documenso/ui/primitives/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@documenso/ui/primitives/form/form';
import { Input } from '@documenso/ui/primitives/input';
import { useToast } from '@documenso/ui/primitives/use-toast';

import { messages } from '~/config/messages';
import { useCurrentLocale, useScopedI18n } from '~/locales/client';

export const ZForgotPasswordFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'required' })
    .email({ message: messages.invalidEmail }),
});

export type TForgotPasswordFormSchema = z.infer<typeof ZForgotPasswordFormSchema>;

export type ForgotPasswordFormProps = {
  className?: string;
};

export const ForgotPasswordForm = ({ className }: ForgotPasswordFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const scopedT = useScopedI18n('auth');
  const currentLocale = useCurrentLocale();
  const form = useForm<TForgotPasswordFormSchema>({
    values: {
      email: '',
    },
    resolver: zodResolver(ZForgotPasswordFormSchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  const { mutateAsync: forgotPassword } = trpc.profile.forgotPassword.useMutation();

  const onFormSubmit = async ({ email }: TForgotPasswordFormSchema) => {
    await forgotPassword({ email }).catch(() => null);

    toast({
      title: scopedT('resetEmailSent'),
      description: scopedT('resetEmailDesc'),
      duration: 5000,
    });

    form.reset();

    router.push(`/${currentLocale}/check-email`);
  };

  return (
    <Form {...form}>
      <form
        className={cn('flex w-full flex-col gap-y-4', className)}
        onSubmit={form.handleSubmit(onFormSubmit)}
      >
        <fieldset className="flex w-full flex-col gap-y-4" disabled={isSubmitting}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{scopedT('email')}</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <Button size="lg" loading={isSubmitting}>
          {isSubmitting ? scopedT('loading') : scopedT('resetPassword')}
        </Button>
      </form>
    </Form>
  );
};
