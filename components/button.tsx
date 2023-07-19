import styled from 'styled-components';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  onClick,
  className,
  fullWidth,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      className={className}
      fullWidth={fullWidth}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  background-color: ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.white};
  border-radius: 5px;
  padding: 0.4rem 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid transparent;

  &:hover {
    background-color: ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.red};
  }

  ${(props) =>
    props.variant === 'secondary' &&
    `
        background-color: ${props.theme.colors.black};
        color: ${props.theme.colors.white};
        border: 1px solid ${props.theme.colors.grey};
        
        &:hover {
            border: 1px solid ${props.theme.colors.grey};
            background-color: ${props.theme.colors.white};
            color: ${props.theme.colors.black};
        }
    `}
`;
