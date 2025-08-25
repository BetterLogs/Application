/** biome-ignore-all lint/style/noMagicNumbers: <later> */
/** biome-ignore-all lint/correctness/noChildrenProp: <later> */
/** biome-ignore-all lint/performance/useTopLevelRegex: <later> */
'use client';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';

export default function Signup() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.name,
        },
        {
          onSuccess: () => {
            router.push('/dashboard');
            toast.success('Sign up successful');
          },
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText);
          },
        }
      );
    },
    validators: {
      onSubmit: z.object({
        name: z
          .string()
          .min(2)
          .max(50)
          .regex(/^[A-Za-z0-9]+$/),
        email: z.email(),
        password: z.string().min(12).max(128),
      }),
    },
  });

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-6 lg:justify-start">
        <form
          className="flex w-full min-w-sm max-w-sm flex-col items-center gap-y-4 rounded-md border border-muted bg-background px-6 py-8 shadow-md"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <h1 className="font-semibold text-xl">Signup</h1>
          <form.Field
            children={(field) => (
              <Input
                className="text-sm"
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Email"
                required
                type="email"
                value={field.state.value}
              />
            )}
            name="email"
          />
          <form.Field
            children={(field) => (
              <Input
                className="text-sm"
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Name"
                required
                type="text"
                value={field.state.value}
              />
            )}
            name="name"
          />
          <form.Field
            children={(field) => (
              <Input
                className="text-sm"
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Password"
                required
                type="password"
                value={field.state.value}
              />
            )}
            name="password"
          />
          <Button className="w-full" type="submit">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}
