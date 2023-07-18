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

const Text: React.FC<TextProps> = ({ children, className, onClick }) => {
  return (
    <TextItem className={className} onClick={onClick}>
      {children}
    </TextItem>
  );
};

export default Text;

const TextItem = styled.p<TextProps>`
  ${color}
  ${space}
  ${typography}
`;
