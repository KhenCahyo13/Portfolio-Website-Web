const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://khen.dev').replace(/\/$/, '');

export const siteConfig = {
    name: 'Khen Muhammad Cahyo',
    title: 'Khen Muhammad Cahyo – Fullstack Developer',
    description:
        'Product-minded fullstack engineer helping teams ship reliable web and mobile products from Indonesia.',
    keywords: [
        'Khen Cahyo',
        'Khen Muhammad Cahyo',
        'Fullstack Developer',
        'Software Engineer',
        'Next.js',
        'React',
        'TypeScript',
        'Sanity CMS',
    ],
    locale: 'en_US',
    url: appUrl,
    ogImage: '/images/profiles/Khen-Gray.png',
    links: {
        linkedin: 'https://www.linkedin.com/in/khencahyo13/',
        github: 'https://github.com/KhenCahyo13',
        youtube: 'https://www.youtube.com/@ngodingbarengkhen13',
        tiktok: 'https://www.tiktok.com/@ngodingbarengkhen',
    },
    author: {
        name: 'Khen Muhammad Cahyo',
        url: 'https://www.linkedin.com/in/khencahyo13/',
    },
} as const;

export const absoluteUrl = (path: string = '/') => new URL(path, siteConfig.url).toString();
