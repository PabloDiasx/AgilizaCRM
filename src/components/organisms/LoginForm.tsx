import React, { useState } from 'react';
import clsx from 'clsx';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';

/**
 * LoginForm Organism
 * Complete login form with email and password fields
 *
 * @component
 * @example
 * <LoginForm
 *   onSubmit={async (credentials) => {}}
 *   isLoading={false}
 * />
 */

export interface LoginFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Callback when form is submitted */
  onSubmit?: (credentials: { email: string; password: string }) => Promise<void>;

  /** Whether form is in loading state */
  isLoading?: boolean;

  /** Error message to display */
  error?: string;

  /** Show forgot password link */
  showForgotPassword?: boolean;

  /** Callback when forgot password is clicked */
  onForgotPassword?: () => void;

  /** Show sign up link */
  showSignUp?: boolean;

  /** Callback when sign up is clicked */
  onSignUp?: () => void;

  /** Submit button label */
  submitLabel?: string;
}

export const LoginForm = React.forwardRef<HTMLFormElement, LoginFormProps>(
  (
    {
      onSubmit,
      isLoading = false,
      error,
      showForgotPassword = true,
      onForgotPassword,
      showSignUp = true,
      onSignUp,
      submitLabel = 'Entrar',
      className,
      ...props
    },
    ref
  ) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form validation
    const validate = () => {
      if (!email) {
        setValidationError('Email é obrigatório');
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setValidationError('Email inválido');
        return false;
      }

      if (!password) {
        setValidationError('Senha é obrigatória');
        return false;
      }

      if (password.length < 6) {
        setValidationError('Senha deve ter no mínimo 6 caracteres');
        return false;
      }

      setValidationError(undefined);
      return true;
    };

    // Handle submit
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validate()) return;

      setIsSubmitting(true);

      try {
        await onSubmit?.({ email, password });
      } catch (err) {
        setValidationError(err instanceof Error ? err.message : 'Erro ao fazer login');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={clsx('w-full max-w-sm mx-auto space-y-4', className)}
        {...props}
      >
        {/* Header */}
        <div className="text-center mb-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bem-vindo</h2>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            Entre com sua conta para continuar
          </p>
        </div>

        {/* Error Message */}
        {(error || validationError) && (
          <div
            className={clsx(
              'p-4 rounded-lg border',
              'bg-red-50 dark:bg-red-900/20',
              'border-red-200 dark:border-red-800',
              'text-red-800 dark:text-red-200 text-sm'
            )}
            role="alert"
          >
            {error || validationError}
          </div>
        )}

        {/* Email Field */}
        <FormField
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          disabled={isSubmitting || isLoading}
        />

        {/* Password Field */}
        <FormField
          label="Senha"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          disabled={isSubmitting || isLoading}
          showPasswordToggle={true}
        />

        {/* Forgot Password Link */}
        {showForgotPassword && (
          <div className="text-right -mt-2">
            <button
              type="button"
              onClick={onForgotPassword}
              className={clsx(
                'text-xs text-blue-600 dark:text-blue-400',
                'hover:text-blue-700 dark:hover:text-blue-300',
                'transition-colors'
              )}
              disabled={isSubmitting || isLoading}
            >
              Esqueceu sua senha?
            </button>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          fullWidth
          isLoading={isSubmitting || isLoading}
          disabled={isSubmitting || isLoading}
        >
          {submitLabel}
        </Button>

        {/* Sign Up Link */}
        {showSignUp && (
          <div className="text-center pt-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Não tem uma conta?{' '}
              <button
                type="button"
                onClick={onSignUp}
                className={clsx(
                  'text-blue-600 dark:text-blue-400',
                  'hover:text-blue-700 dark:hover:text-blue-300',
                  'font-medium transition-colors'
                )}
              >
                Criar conta
              </button>
            </p>
          </div>
        )}
      </form>
    );
  }
);

LoginForm.displayName = 'LoginForm';

export default LoginForm;
