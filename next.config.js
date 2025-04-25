/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // Wyłącz sprawdzanie ESLint podczas budowania
      ignoreDuringBuilds: true,
    },
  };
  
  module.exports = nextConfig; 