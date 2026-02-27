/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],
    experimental: {
        esmExternals: 'loose'
    }
};

export default nextConfig;
