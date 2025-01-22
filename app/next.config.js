/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products', // Cambia esto a la ruta deseada
        permanent: true, // true para redirección 301, false para 302
      },
    ];
  },
};

module.exports = nextConfig;
