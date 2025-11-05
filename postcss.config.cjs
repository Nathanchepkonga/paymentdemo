// Use the new postcss wrapper for Tailwind
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),
    require('autoprefixer')
  ]
}
