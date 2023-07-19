import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import styled from 'styled-components';

interface SliderButtonProps {
  variant?: 'prev' | 'next';
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  position?: 'absolute' | 'relative';
  colorVariant?: 'light' | 'dark';
}

const SliderButton: React.FC<SliderButtonProps> = ({
  variant,
  onClick,
  disabled,
  className,
  position = 'relative',
  colorVariant = 'light',
}) => {
  return (
    <SliderButtonElement
      onClick={onClick}
      disabled={disabled}
      className={className}
      position={position}
      colorVariant={colorVariant}
    >
      {variant === 'prev' ? <BsChevronLeft /> : <BsChevronRight />}
    </SliderButtonElement>
  );
};

export default SliderButton;

const SliderButtonElement = styled.button<{
  position?: 'absolute' | 'relative';
  colorVariant?: 'light' | 'dark';
}>`
  position: ${(props) => props.position};
  background: ${(props) => props.theme.colors.red};
  border: none;
  cursor: pointer;
  z-index: 4;
  transform: translateY(-50%);
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.white};
  transition: transform 0.3s ease-in-out, background 0.2s ease-in-out;

  &:disabled {
    cursor: not-allowed;
  }
  svg {
    transition: transform 0.3s ease-in-out, color 0.2s ease-in-out;
  }

  &:hover {
    transform: translateY(-50%) scale(1.15);
    background-color: ${(props) =>
      props.colorVariant === 'light'
        ? props.theme.colors.white
        : props.theme.colors.black};

    svg {
      color: ${(props) =>
        props.colorVariant === 'light'
          ? props.theme.colors.black
          : props.theme.colors.red};
    }
  }
`;