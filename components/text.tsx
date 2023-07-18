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
}

const Text: React.FC<TextProps> = ({ children, className }) => {
  return <TextItem className={className}>{children}</TextItem>;
};

export default Text;

const TextItem = styled.p<TextProps>`
  ${color}
  ${space}
    ${typography}
`;
