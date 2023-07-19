import styled from 'styled-components';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return <ContainerItem className={className}>{children}</ContainerItem>;
};

export default Container;

const ContainerItem = styled.div`
  padding: 0 2rem;
`;
