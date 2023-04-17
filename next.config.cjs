/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['antd']);

module.exports = withTM({
  reactStrictMode: true,
  /* the rest of your Next.js configuration */
});





