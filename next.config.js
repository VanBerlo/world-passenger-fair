/** @type {import('next').NextConfig} */
const {
  SITE_AUTHOR,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_URL,
  SITE_LOCALE,
  SITE_LOGO,
  SITE_TITLE,
  SITE_TYPE,
  MONGODB_URI,
  SITEMAP_URL,
  API_BASEURL,
} = process.env;
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'static/fonts/',
        },
      },
    });

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SITE_AUTHOR,
    SITE_NAME,
    SITE_DESCRIPTION,
    SITE_EMAIL,
    SITE_URL,
    SITE_LOCALE,
    SITE_LOGO,
    SITE_TITLE,
    SITE_TYPE,
    MONGODB_URI,
    SITEMAP_URL,
    API_BASEURL,
  },
};

module.exports = nextConfig;
