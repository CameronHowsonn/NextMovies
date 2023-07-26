import styled from 'styled-components';
import {
  color,
  ColorProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system';

interface TextProps extends ColorProps, SpaceProps, TypographyProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default styled.p<TextProps>`
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.5rem;
  ${color}
  ${space}
  ${typography}


  .bold {
    font-weight: 700;
  }
`;
