import React, { useState } from 'react';
import clsx from 'clsx';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';

/**
 * SignupForm Organism
 * Complete signup form with company and personal information
 */

export interface SignupFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Callback when form is submitted */
  onSubmit?: (data: SignupData) => Promise<void>;

  /** Whether form is in loading state */
  isLoading?: boolean;

  /** Error message to display */
  error?: string;

  /** Callback to switch to login */
  onBackToLogin?: () => void;

  /** Submit button label */
  submitLabel?: string;
}

export interface SignupData {
  email: string;
  companyName: string;
  fullName: string;
  cpfCnpj: string;
  address: string;
  city: string;
  state: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
}

const validateCPFCNPJ = (value: string): boolean => {
  const clean = value.replace(/\D/g, '');

  // CPF validation (11 digits)
  if (clean.length === 11) {
    if (/^(\d)\1{10}$/.test(clean)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(clean.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(clean.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(clean.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(clean.substring(10, 11))) return false;

    return true;
  }

  // CNPJ validation (14 digits)
  if (clean.length === 14) {
    if (/^(\d)\1{13}$/.test(clean)) return false;

    let size = clean.length - 2;
    let numbers = clean.substring(0, size);
    const digits = clean.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i), 10) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    size = size + 1;
    numbers = clean.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i), 10) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
  }

  return false;
};

const formatCPFCNPJ = (value: string): string => {
  const clean = value.replace(/\D/g, '');

  // CPF format: XXX.XXX.XXX-XX
  if (clean.length <= 11) {
    return clean
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  // CNPJ format: XX.XXX.XXX/XXXX-XX
  if (clean.length <= 14) {
    return clean
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }

  return value;
};

export const SignupForm = React.forwardRef<HTMLFormElement, SignupFormProps>(
  (
    {
      onSubmit,
      isLoading = false,
      error,
      onBackToLogin,
      submitLabel = 'Criar Conta',
      className,
      ...props
    },
    ref
  ) => {
    const [formData, setFormData] = useState<SignupData>({
      email: '',
      companyName: '',
      fullName: '',
      cpfCnpj: '',
      address: '',
      city: '',
      state: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: false,
      acceptedPrivacy: false,
    });

    const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof SignupData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = (): boolean => {
      const errors: Partial<Record<keyof SignupData, string>> = {};

      if (!formData.email) {
        errors.email = 'Email é obrigatório';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          errors.email = 'Email inválido';
        }
      }

      if (!formData.companyName) {
        errors.companyName = 'Nome da empresa é obrigatório';
      }

      if (!formData.fullName) {
        errors.fullName = 'Nome completo é obrigatório';
      }

      if (!formData.cpfCnpj) {
        errors.cpfCnpj = 'CPF ou CNPJ é obrigatório';
      } else if (!validateCPFCNPJ(formData.cpfCnpj)) {
        errors.cpfCnpj = 'CPF ou CNPJ inválido';
      }

      if (!formData.address) {
        errors.address = 'Endereço é obrigatório';
      }

      if (!formData.city) {
        errors.city = 'Cidade é obrigatória';
      }

      if (!formData.state) {
        errors.state = 'Estado é obrigatório';
      }

      if (!formData.password) {
        errors.password = 'Senha é obrigatória';
      } else if (formData.password.length < 8) {
        errors.password = 'Senha deve ter no mínimo 8 caracteres';
      }

      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Confirmação de senha é obrigatória';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'As senhas não coincidem';
      }

      if (!formData.acceptedTerms) {
        errors.acceptedTerms = 'Você deve aceitar os Termos de Serviço';
      }

      if (!formData.acceptedPrivacy) {
        errors.acceptedPrivacy = 'Você deve aceitar a Política de Privacidade e LGPD';
      }

      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      let finalValue: string | boolean = value;

      if (type === 'checkbox') {
        finalValue = checked;
      } else if (name === 'cpfCnpj') {
        finalValue = formatCPFCNPJ(value);
      }

      setFormData((prev) => ({
        ...prev,
        [name]: finalValue,
      }));

      if (validationErrors[name as keyof SignupData]) {
        setValidationErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validate()) return;

      setIsSubmitting(true);

      try {
        await onSubmit?.(formData);
      } catch (err) {
        console.error('Signup error:', err);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={clsx('w-full space-y-3', className)}
        {...props}
      >
        {/* Header */}
        <div className="text-center mb-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Criar Conta</h2>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            7 dias de teste grátis - sem cartão de crédito
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className={clsx(
              'p-3 rounded-lg border',
              'bg-red-50 dark:bg-red-900/20',
              'border-red-200 dark:border-red-800',
              'text-red-800 dark:text-red-200 text-xs'
            )}
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Company Name Field */}
        <FormField
          label="Nome da Empresa"
          name="companyName"
          type="text"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Sua Empresa Ltda"
          error={validationErrors.companyName}
          required
          disabled={isSubmitting || isLoading}
        />

        {/* Email Field */}
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          error={validationErrors.email}
          required
          disabled={isSubmitting || isLoading}
        />

        {/* Full Name Field */}
        <FormField
          label="Nome Completo"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="João Silva Santos"
          error={validationErrors.fullName}
          required
          disabled={isSubmitting || isLoading}
        />

        {/* CPF/CNPJ Field */}
        <FormField
          label="CPF/CNPJ"
          name="cpfCnpj"
          type="text"
          value={formData.cpfCnpj}
          onChange={handleChange}
          placeholder="000.000.000-00 ou 00.000.000/0000-00"
          error={validationErrors.cpfCnpj}
          required
          disabled={isSubmitting || isLoading}
        />

        {/* Address Field */}
        <FormField
          label="Endereço"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          placeholder="Rua das Flores, 123"
          error={validationErrors.address}
          required
          disabled={isSubmitting || isLoading}
        />

        {/* City and State Row */}
        <div className="grid grid-cols-2 gap-3">
          <FormField
            label="Cidade"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder="São Paulo"
            error={validationErrors.city}
            required
            disabled={isSubmitting || isLoading}
          />

          <FormField
            label="Estado"
            name="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
            placeholder="SP"
            error={validationErrors.state}
            required
            disabled={isSubmitting || isLoading}
            maxLength={2}
          />
        </div>

        {/* Password Field */}
        <FormField
          label="Senha"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          error={validationErrors.password}
          required
          disabled={isSubmitting || isLoading}
          showPasswordToggle={true}
          helperText="Mínimo 8 caracteres"
        />

        {/* Confirm Password Field */}
        <FormField
          label="Confirmar Senha"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          error={validationErrors.confirmPassword}
          required
          disabled={isSubmitting || isLoading}
          showPasswordToggle={true}
        />

        {/* Consent Checkboxes */}
        <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          {/* Terms Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
              disabled={isSubmitting || isLoading}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Concordo com os{' '}
              <button
                type="button"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Termos de Serviço
              </button>
            </span>
          </label>

          {validationErrors.acceptedTerms && (
            <p className="text-xs text-red-500 dark:text-red-400 -mt-1">
              {validationErrors.acceptedTerms}
            </p>
          )}

          {/* Privacy Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="acceptedPrivacy"
              checked={formData.acceptedPrivacy}
              onChange={handleChange}
              disabled={isSubmitting || isLoading}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Concordo com a{' '}
              <button
                type="button"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Política de Privacidade
              </button>
              {' '}e LGPD
            </span>
          </label>

          {validationErrors.acceptedPrivacy && (
            <p className="text-xs text-red-500 dark:text-red-400 -mt-1">
              {validationErrors.acceptedPrivacy}
            </p>
          )}
        </div>

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

        {/* Back to Login */}
        <div className="text-center pt-1">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Já tem uma conta?{' '}
            <button
              type="button"
              onClick={onBackToLogin}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Faça login
            </button>
          </p>
        </div>
      </form>
    );
  }
);

SignupForm.displayName = 'SignupForm';

export default SignupForm;
