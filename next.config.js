/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['storage.googleapis.com']
  }
}

module.exports = nextConfig

//caso de merda de novo 😡
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'storage.googleapis.com',
//         port: '',
//         pathname: '/golden-wind/nextlevelweek/05-podcastr/**',
//       },
//     ],
//   },
// }

// module.exports = nextConfig
