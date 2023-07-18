import React from 'react';
import styled from 'styled-components';
import {
  ColorProps,
  SpaceProps,
  TypographyProps,
  color,
  space,
  typography,
} from 'styled-system';

interface HeadingProps extends ColorProps, TypographyProps, SpaceProps {
  children?: React.ReactNode;
  className?: string;
  as?: number;
}

const Heading: React.FC<HeadingProps> = ({ as, children, className }) => {
  return (
    <StyledHeading as={`h${as}`} className={className}>
      {children}
    </StyledHeading>
  );
};

const StyledHeading = styled.h1<HeadingProps>`
  font-family: var(--Montserrat);
  font-style: normal;
  ${color}
  ${space}
    ${typography}
`;

Heading.defaultProps = {
  as: 1,
};

export default Heading;
