const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: () => {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:8080/api/:path*`
      }
    ];
  },
  sassOptions: {
    // define the absolute path...
    includePaths: [path.join(__dirname, 'assets')],
  }
}

module.exports = nextConfig