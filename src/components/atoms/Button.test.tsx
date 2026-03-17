import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('should render button with text content', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('should render with proper button element', () => {
      const { container } = render(<Button>Test</Button>);
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should apply primary variant styles', () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByText('Primary');
      expect(button).toHaveClass('bg-primary-500');
    });

    it('should apply secondary variant styles', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByText('Secondary');
      expect(button).toHaveClass('border');
    });

    it('should apply destructive variant styles', () => {
      render(<Button variant="destructive">Delete</Button>);
      const button = screen.getByText('Delete');
      expect(button).toHaveClass('bg-error');
    });

    it('should apply ghost variant styles', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByText('Ghost');
      expect(button).toHaveClass('bg-transparent');
    });
  });

  describe('Sizes', () => {
    it('should apply small size styles', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByText('Small');
      expect(button).toHaveClass('h-9');
    });

    it('should apply medium size styles (default)', () => {
      render(<Button size="md">Medium</Button>);
      const button = screen.getByText('Medium');
      expect(button).toHaveClass('h-10');
    });

    it('should apply large size styles', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByText('Large');
      expect(button).toHaveClass('h-11');
    });
  });

  describe('States', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByText('Disabled') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });

    it('should show loading state with spinner', () => {
      render(<Button isLoading>Loading</Button>);
      expect(screen.getByText('⏳')).toBeInTheDocument();
    });

    it('should disable button when loading', () => {
      render(<Button isLoading>Click me</Button>);
      const button = screen.getByRole('button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });

    it('should apply full width when fullWidth is true', () => {
      render(<Button fullWidth>Full Width</Button>);
      const button = screen.getByText('Full Width');
      expect(button).toHaveClass('w-full');
    });
  });

  describe('Interactions', () => {
    it('should call onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click</Button>);

      fireEvent.click(screen.getByText('Click'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );

      fireEvent.click(screen.getByText('Disabled'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when loading', () => {
      const handleClick = jest.fn();
      render(
        <Button isLoading onClick={handleClick}>
          Loading
        </Button>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible button role', () => {
      render(<Button>Accessible Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should show loading indicator with aria-label', () => {
      render(<Button isLoading>Loading</Button>);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should support standard HTML attributes', () => {
      render(
        <Button
          id="test-button"
          data-testid="custom-button"
          title="Test Title"
        >
          Button
        </Button>
      );

      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('id', 'test-button');
      expect(button).toHaveAttribute('title', 'Test Title');
    });
  });
});
