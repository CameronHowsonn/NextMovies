import styled from 'styled-components';

interface DotLoaderProps {
  absolute?: boolean;
  center?: boolean;
}

export default styled.div<DotLoaderProps>`
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.colors.red};
  animation: dot-elastic 0.5s infinite linear;

  ${({ absolute }) =>
    absolute &&
    `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    `}

  ${({ center }) =>
    center &&
    `
        margin: 0 auto;
    `}

  &::before,
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    opacity: 0.7;
  }
  &::before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.red};
    animation: dot-elastic-before 0.5s infinite linear;
  }
  &::after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.red};
    animation: dot-elastic-after 0.5s infinite linear;
  }

  @keyframes dot-elastic-before {
    0% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(1, 1.5);
    }
    50% {
      transform: scale(1, 0.67);
    }
    75% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }
  @keyframes dot-elastic {
    0% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1, 1.5);
    }
    75% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }
  @keyframes dot-elastic-after {
    0% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1, 0.67);
    }
    75% {
      transform: scale(1, 1.5);
    }
    100% {
      transform: scale(1, 1);
    }
  }
`;
