/** @type {import('next').NextConfig} */

module.exports = {
  async redirects() {
    return [
      {
        source: "/verify",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
