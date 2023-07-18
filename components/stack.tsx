import styled from 'styled-components';
import {
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from 'styled-system';

type Axis = 'x' | 'y' | 'xalt' | 'yalt';

export interface StackProps {
  gap?: number | string | (string | number)[];
  axis?: Axis | Axis[] | undefined;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}

export interface Props
  extends StackProps,
    FlexboxProps,
    LayoutProps,
    PositionProps,
    SpaceProps {}

const Stack = styled.div<Props>`
  & > * + * {
    ${({ axis, theme, gap }) => {
      const { breakpoints } = theme;
      const applyGap = createApplyGap(theme.space);

      let axes = [].concat(axis);
      let gaps = [].concat(gap);

      let length = Math.max(axes.length, gaps.length);

      axes = Array.from({ length }, (v, k) =>
        'undefined' !== typeof axes[k] ? axes[k] : axes[axes.length - 1]
      );

      gaps = Array.from({ length }, (v, k) =>
        'undefined' !== typeof gaps[k] ? gaps[k] : gaps[gaps.length - 1]
      );

      return gaps.reduce((reduced, gap, index) => {
        const axis = axes[index];

        if (index === 0) {
          reduced += applyGap(gap, axis);
          return reduced;
        }

        if (typeof breakpoints[index - 1] === 'undefined') {
          return reduced;
        }

        reduced += `
          @media (min-width: ${breakpoints[index - 1]}) {
            ${applyGap(0, axes[index - 1])}
            ${applyGap(gap, axis)}
          }
        `;

        return reduced;
      }, '');
    }}
  }
  ${flexbox}
  ${layout}
  ${position}
  ${space}
`;

Stack.defaultProps = {
  gap: 1,
  axis: 'y',
};

export default Stack;

function createRule(axis: Axis, value: string | number): string {
  const directions = {
    x: 'left',
    y: 'top',
    xalt: 'right',
    yalt: 'bottom',
  };

  const direction = directions[axis];
  return `margin-${direction}: ${value};`;
}

function createApplyGap(
  space: (string | number)[]
): (gap: number | string, axis: Axis) => string {
  return function (gap, axis) {
    if (typeof space[gap] !== 'undefined') {
      return createRule(axis, space[gap]);
    }

    return createRule(axis, gap);
  };
}
