const plugin = require('tailwindcss/plugin')

const breakpointsHint = plugin(function ({ addBase, theme }) {
  if (process.env.NODE_ENV === 'production') return

  const screens = theme('screens', {})
  const breakpoints = Object.keys(screens)

  addBase({
    'body::after': {
      content: `"xs"`,
      position: 'fixed',
      right: '.5rem',
      bottom: '.5rem',
      padding: '.5rem',
      background: '#eee',
      border: '1px solid',
      borderColor: '#ddd',
      color: '#e50478',
      fontSize: '1rem',
      fontWeight: '600',
      zIndex: '99999',
    },
    ...breakpoints.reduce((acc, current) => {
      acc[`@media (min-width: ${screens[current]})`] = {
        'body::after': {
          content: `"${current}"`,
        },
      }
      return acc
    }, {}),
  })
})

module.exports = breakpointsHint
