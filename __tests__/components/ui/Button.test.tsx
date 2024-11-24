import Button from '@/components/ui/Button';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, jest, describe, it } from '@jest/globals';

describe('Button component', () => {
  it('renders children correctly', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  //   it('applies the correct visual class based on "visual" prop', () => {
  //     const { rerender } = render(<Button visual='secondary'>Button</Button>);
  //     expect(screen.getByRole('button')).toHaveClass('bg-secondary text-white');

  //     rerender(<Button visual='white_text_secondary'>Button</Button>);
  //     expect(screen.getByRole('button')).toHaveClass(
  //       'bg-white text-secondary border border-secondary',
  //     );

  //     rerender(<Button visual='white_text_gray'>Button</Button>);
  //     expect(screen.getByRole('button')).toHaveClass(
  //       'bg-white text-gray_black border border-gray_black',
  //     );
  //   });

  //   it('applies additional class names from the "className" prop', () => {
  //     render(<Button className='custom-class'>Button</Button>);
  //     expect(screen.getByRole('button')).toHaveClass('custom-class');
  //   });

  //   it('passes additional props to the button element', () => {
  //     const handleClick = jest.fn();
  //     render(
  //       <Button onClick={handleClick} data-testid='test-button'>
  //         Button
  //       </Button>,
  //     );

  //     const button = screen.getByTestId('test-button');
  //     expect(button).toBeInTheDocument();

  //     userEvent.click(button);
  //     expect(handleClick).toHaveBeenCalledTimes(1);
  //   });

  //   it('renders with default visual class when "visual" prop is not provided', () => {
  //     render(<Button>Default Visual</Button>);
  //     expect(screen.getByRole('button')).toHaveClass('bg-secondary text-white');
  //   });
});
