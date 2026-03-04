import StackIcon from 'tech-stack-icons';

export const heroHighlights = [
    {
        label: 'Years shipping',
        value: `${new Date().getFullYear() - 2023}+`,
    },
    {
        label: 'Products launched',
        value: '5+',
    },
    {
        label: 'Teams supported',
        value: '10+',
    },
    {
        label: 'Mentorship hours',
        value: '100+',
    },
];

export const focusTiles = [
    {
        title: 'Fullstack Delivery',
        description:
            'Drive products from discovery to deployment across the entire stack — frontend, backend, and infrastructure.',
    },
    {
        title: 'Team Enablement',
        description:
            'Mentor engineers, define technical standards, and maintain actionable documentation for continuous improvement.',
    },
    {
        title: 'Reliable Systems',
        description:
            'Build resilient services with Docker, Redis, and message queues like RabbitMQ to ensure uptime and performance.',
    },
    {
        title: 'Product Thinking',
        description:
            'Balance technical decisions with business context — ensuring every release aligns with real product goals.',
    },
];

export const skills = [
    {
        name: 'TailwindCSS',
        icon: <StackIcon name="tailwindcss" className="size-8" />,
        level: 'advanced',
    },
    {
        name: 'Bootstrap',
        icon: <StackIcon name="bootstrap4" className="size-8" />,
        level: 'advanced',
    },
    {
        name: 'NextJS',
        icon: <StackIcon name="nextjs2" className="size-8" />,
        level: 'advanced',
    },
    {
        name: 'ReactJS',
        icon: <StackIcon name="react" className="size-8" />,
        level: 'advanced',
    },
    {
        name: 'React Native',
        icon: <StackIcon name="react" className="size-8" />,
        level: 'intermediate',
    },
    {
        name: 'NestJS',
        icon: <StackIcon name="nestjs" className="size-8" />,
        level: 'intermediate',
    },
    {
        name: 'Laravel',
        icon: <StackIcon name="laravel" className="size-8" />,
        level: 'advanced',
    },
    {
        name: 'Docker',
        icon: <StackIcon name="docker" className="size-8" />,
        level: 'intermediate',
    },
    {
        name: 'Redis',
        icon: <StackIcon name="redis" className="size-8" />,
        level: 'intermediate',
    },
    {
        name: 'RabbitMQ',
        icon: null,
        level: 'intermediate',
    },
    {
        name: 'MySQL',
        icon: <StackIcon name="mysql" className="size-8" />,
        level: 'advanced',
    },
    {
        name: 'PostgreSQL',
        icon: <StackIcon name="postgresql" className="size-8" />,
        level: 'intermediate',
    },
];

export const projectShowcase = [
    {
        name: 'SprintBoard',
        description:
            'End-to-end product planning tool with collaborative roadmaps, role-based access, and analytics.',
        link: '/projects/sprintboard',
        stack: ['Next.js', 'NestJS', 'Postgres'],
    },
    {
        name: 'CargoHub',
        description:
            'Logistics dashboard connecting partner APIs, background workers, and real-time notifications.',
        link: '/projects/cargohub',
        stack: ['Laravel', 'Redis', 'RabbitMQ'],
    },
    {
        name: 'Kin Mobile',
        description:
            'Cross-platform finance app with React Native, offline-first data, and secure auth flows.',
        link: '/projects/kin-mobile',
        stack: ['React Native', 'NestJS', 'Docker'],
    },
];

export const sectionVariants = {
    hidden: {
        opacity: 0,
        y: 32,
    },
    show: {
        opacity: 1,
        y: 0,
    },
};

export const staggerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

export const itemVariants = {
    hidden: {
        opacity: 0,
        y: 18,
    },
    show: {
        opacity: 1,
        y: 0,
    },
};
