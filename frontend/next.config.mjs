/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],
    experimental: {
        esmExternals: 'loose'
    }
};

export default nextConfig;
