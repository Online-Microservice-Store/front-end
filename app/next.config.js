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

module.exports = {
  eslint: {
    // Ignora errores de lint en producción (solo si es necesario)
    ignoreDuringBuilds: true,
  },
};

//Cloud UNL...ock

module.exports = nextConfig;
