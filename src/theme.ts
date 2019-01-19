const unit = 8;

const fonts = {
  montserrat: 'Montserrat, sans-serif',
  sourceSans: 'Source Sans Pro, sans-serif',
  timesNew: 'Times New Roman, sans-serif',
};

export const colors = {
  white: '#ffffff',
  whiteSmoke: "#f5f5f5",
  cream: '#c4bda1',
  tuatara: '#32312C',
  gray: "#777",
  black: '#000000',
  brandPrimary: '#2CA4AB',
  linkColor: '#5fc49e',
  brandInfo: '#c4beb0',
  textMuted: '#d1d0d0',
  textColor: '#939598',
};

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '1rem',
  4: '1.5rem',
  5: '3rem',
};

const theme = {
  fonts,
  colors,
  breakpoints,
  spacing,
  unit,
};

export default theme;
