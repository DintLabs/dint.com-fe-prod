function pxToRem(value: number) {
  return `${value / 16}rem`;
}

function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  return {
    '@media (min-width:200px)': {
      fontSize: pxToRem(sm)
    },
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm)
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md)
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg)
    }
  };
}

const FONT_PRIMARY = 'Noto Sans, sans-serif'; // Google Font

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  display: {
    fontWeight: 700,
    lineHeight: '130%',
    fontSize: pxToRem(64),
    ...responsiveFontSizes({ sm: 48, md: 64, lg: 64 })
  },
  h1: {
    fontWeight: 700,
    lineHeight: '130%',
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 30, md: 32, lg: 32 })
  },
  h2: {
    fontWeight: 700,
    lineHeight: '145%',
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 22.5, md: 24, lg: 24 })
  },
  h3: {
    fontWeight: 700,
    lineHeight: '130%',
    fontSize: pxToRem(18.75),
    ...responsiveFontSizes({ sm: 17.25, md: 18.5, lg: 18.5 })
  },
  h4: {
    fontWeight: 700,
    lineHeight: '130%',
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ sm: 16, md: 16, lg: 16 })
  },
  h5: {
    fontWeight: 700,
    lineHeight: '130%',
    fontSize: pxToRem(13.25),
    ...responsiveFontSizes({ sm: 13.25, md: 13.25, lg: 13.25 })
  },
  h6: {
    fontWeight: 700,
    lineHeight: '130%',
    fontSize: pxToRem(12),
    ...responsiveFontSizes({ sm: 12, md: 12, lg: 12 })
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ sm: 15, md: 16, lg: 16 })
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ sm: 13, md: 14, lg: 14 })
  },
  body1: {
    lineHeight: '140%',
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ sm: 15, md: 16, lg: 16 })
  },
  body2: {
    lineHeight: '155%',
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ sm: 13, md: 14, lg: 14 })
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12)
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(14),
    letterSpacing: 1.1,
    textTransform: 'uppercase'
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize'
  }
} as const;

export default typography;
