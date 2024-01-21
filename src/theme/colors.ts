const palette = {
  neutral100: '#FFFFFF',
  neutral200: '#F8F9FB',
  neutral300: '#E7ECF0',
  neutral400: '#C5CDD2',
  neutral500: '#A9B4BC',
  neutral600: '#606D76',
  neutral700: '#354349',
  neutral800: '#1B262E',

  primary100: '#2A4BA0',
  primary200: '#153075',
  secondary100: '#45D261',

  grey100: '#8891A5',

  red100: '#FF8181',
} as const;

export const colors = {
  palette,
  primary: palette.primary100,
  secondary: palette.secondary100,
  transparent: 'rgba(0, 0, 0, 0)',

  //text colors
  text: palette.neutral800,
  textLabel: palette.neutral600,
  textDim: palette.grey100,
  textTitle: palette.neutral700,
  textHeader: palette.primary100,

  //background colors
  background: palette.neutral100,
  lightBackground: palette.neutral200,
};
