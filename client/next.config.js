/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  async rewrites() {
    return [
      {
        source: "/graphql/:slug*",
        destination: "http://localhost:4000/graphql/:slug*",
      },
    ];
  },
  env: {
    PUBLIC_URL: "",
  },
};
