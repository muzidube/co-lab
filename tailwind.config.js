module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
},
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fill: (theme) => ({
      red: theme('colors.red.primary'),
      green: theme('colors.green.medium'),
      orange: theme('colors.orange.medium'),
      pink: theme('colors.pink.medium')
    }),
    extend: {},
    colors: {
      white: '#ffffff',
      orange: {
          medium: '#ffa02a',
      },
      blue: {
          medium: '#005c98'
      },
      green: {
          medium: '#46dfcd'
      },
      pink: {
          medium: '#ff7ece'
      },
      black: {
        light: '#005c98',
        faded: '#00000059'
      },
      gray: {
        base: '#616161',
        background: '#fafafa',
        primary: '#dbdbdb'
      },
      red: {
        primary: '#ed4956'
      }
  },
  },
  variants: {
    extend: {}, 
  },
  plugins: [],
}