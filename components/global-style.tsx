import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
  }
  
  *,
  *:before,

  *:after{
    box-sizing: border-box;
  }

  body {
    font-family: var(--OpenSans);
    font-size: 1em;
    height: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--Monserrat);
    font-weight: 700;
    line-height: 1.2;
  }

  html {
    overflow: hidden auto;
  }

  html,
  body,
  #__next {
    min-height: 100%;
    max-width: 100vw;
  }

  :root {
    -webkit-font-smoothing: antialiased;  
    --fluid-min-width: 360;
    --fluid-max-width: 1140;
  
    --fluid-screen: 100vw;
    --fluid-bp: calc(
      (var(--fluid-screen) - var(--fluid-min-width) / 16 * 1rem) /
        (var(--fluid-max-width) - var(--fluid-min-width))
    );
  }
  
  @media screen and (min-width: 1140px) {
    :root {
      --fluid-screen: calc(var(--fluid-max-width) * 1px);
    }
  }
  
  :root {
    --h1-min: 36.00;
    --h1-max: 72.00;
    --heading-h1: calc(
      ((var(--h1-min) / 16) * 1rem) + (var(--h1-max) - var(--h1-min)) *
        var(--fluid-bp)
    );
    --h1-line-height-min: 48;
    --h1-line-height-max: 88;
    --line-height-h1: calc(
      ((var(--h1-line-height-min) / 16) * 1rem) + (var(--h1-line-height-max) - var(--h1-line-height-min)) *
        var(--fluid-bp)
      );

    --h1-med-min: 36.00;
    --h1-med-max: 56.00;

    --heading-h1-med: calc(
      ((var(--h1-med-min) / 16) * 1rem) + (var(--h1-med-max) - var(--h1-med-min)) *
        var(--fluid-bp)
    );
    --h1-med-line-height-min: 48;
    --h1-med-line-height-max: 64;
    --line-height-h1-med: calc(
      ((var(--h1-med-line-height-min) / 16) * 1rem) + (var(--h1-med-line-height-max) - var(--h1-med-line-height-min)) *
        var(--fluid-bp)
      );
      
    --h2-min: 24.00;
    --h2-max: 34.00;
    --heading-h2: calc(
      ((var(--h2-min) / 16) * 1rem) + (var(--h2-max) - var(--h2-min)) *
        var(--fluid-bp)
    );
    --h2-line-height-min: 32;
    --h2-line-height-max: 52;
    --line-height-h2: calc(
      ((var(--h2-line-height-min) / 16) * 1rem) + (var(--h2-line-height-max) - var(--h2-line-height-min)) *
        var(--fluid-bp));

    --h3-min: 20.00;
    --h3-max: 28.00;
    --heading-h3: calc(
      ((var(--h3-min) / 16) * 1rem) + (var(--h3-max) - var(--h3-min)) *
        var(--fluid-bp)
    );
    --h3-line-height-min: 30;
    --h3-line-height-max: 52;
    --line-height-h3: calc(
      ((var(--h3-line-height-min) / 16) * 1rem) + (var(--h3-line-height-max) - var(--h3-line-height-min)) *
        var(--fluid-bp));

    --h5-min: 16.00;
    --h5-max: 18.00;
    --heading-h5: calc(
      ((var(--h5-min) / 16) * 1rem) + (var(--h5-max) - var(--h5-min)) *
        var(--fluid-bp)
    );
    --h5-line-height-min: 30;
    --h5-line-height-max: 52;
    --line-height-h5: calc(
      ((var(--h5-line-height-min) / 16) * 1rem) + (var(--h5-line-height-max) - var(--h5-line-height-min)) *
        var(--fluid-bp));

    --p-min: 16.00;
    --p-max: 20.00;
    --p: calc(
      ((var(--p-min) / 16) * 1rem) + (var(--p-max) - var(--p-min)) *
        var(--fluid-bp)
    );

    --p-line-height-min: 24;
    --p-line-height-max: 36;
    --line-height-p: calc(
      ((var(--p-line-height-min) / 16) * 1rem) + (var(--p-line-height-max) - var(--p-line-height-min)) *
        var(--fluid-bp));
        
    --p-small-min: 14.00;
    --p-small-max: 16.00;
    --p-small: calc(
      ((var(--p-small-min) / 16) * 1rem) + (var(--p-small-max) - var(--p-small-min)) *
        var(--fluid-bp)
    );

    --p-bold-min: 20.00;
    --p-bold-max: 24.00;
    --p-bold: calc(
      ((var(--p-bold-min) / 16) * 1rem) + (var(--p-bold-max) - var(--p-bold-min)) *
        var(--fluid-bp)
    );


    --p-caption-min: 12.00;
    --p-caption-max: 18.00;
    --p-caption: calc(
      ((var(--p-caption-min) / 16) * 1rem) + (var(--p-caption-max) - var(--p-caption-min)) *
        var(--fluid-bp)
    );

    --p-caption-line-height-min: 20;
    --p-caption-line-height-max: 30;
    --line-height-p-caption: calc(
      ((var(--p-caption-line-height-min) / 16) * 1rem) + (var(--p-caption-line-height-max) - var(--p-caption-line-height-min)) *
        var(--fluid-bp)
    );

    --p-bold-line-height-min: 36;
    --p-bold-line-height-max: 40;
    --line-height-p-bold: calc(
      ((var(--p-bold-line-height-min) / 16) * 1rem) + (var(--p-bold-line-height-max) - var(--p-bold-line-height-min)) *
        var(--fluid-bp));

    --p-bold-large-line-height-min: 24;
    --p-bold-large-line-height-max: 44;
    --line-height-p-bold-large: calc(
      ((var(--p-bold-large-line-height-min) / 16) * 1rem) + (var(--p-bold-large-line-height-max) - var(--p-bold-large-line-height-min)) *
        var(--fluid-bp));
    }
`;
