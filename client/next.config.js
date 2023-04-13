const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    apiURL: process.env.NEXT_SERVER_API_URL,
  },
  publicRuntimeConfig: {
    apiURL: process.env.NEXT_PUBLIC_API_URL,
  },
  rewrites: () => {

    console.log()
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_SERVER_API_URL}:path*`
      }
    ];
  },
  sassOptions: {
    // define the absolute path...
    includePaths: [path.join(__dirname, 'assets')],
  }
}

module.exports = nextConfig