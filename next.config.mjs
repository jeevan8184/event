/** @type {import('next').NextConfig} */

const nextConfig = {
    typescript:{
        ignoreBuildErrors:true
    },
    experimental:{
        esmExternals:'loose',
        serverActions:true,
        serverComponentsExternalPackages:["mongoose"]
    },
    eslint:{
        ignoreDuringBuilds:true
    },
    images: {
        domains: ['utfs.io'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'utfs.io',
            port: ''
          }
        ]
    }
};

export default nextConfig;
