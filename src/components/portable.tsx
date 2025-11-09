import { urlFor } from '@/lib/sanity';
import { PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';

export const portableComponents: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) return null;
            const imageUrl = urlFor(value).width(1080).quality(80).url();
            return (
                <div className="my-6 overflow-hidden rounded-2xl border border-white/10">
                    <Image
                        src={imageUrl}
                        alt={value.alt ?? 'Article image'}
                        width={1080}
                        height={720}
                        className="h-auto w-full object-cover"
                    />
                    {value.caption ? (
                        <p className="px-4 py-2 text-center text-xs text-muted-foreground">
                            {value.caption}
                        </p>
                    ) : null}
                </div>
            );
        },
        codeBlock: ({ value }) => {
            if (!value?.code) return null;
            return (
                <div className="my-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f18]">
                    <div className="flex items-center justify-between border-b border-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        <span>{value.filename ?? 'code snippet'}</span>
                        {value.language ? <span>{value.language}</span> : null}
                    </div>
                    <pre className="overflow-auto px-4 py-4 text-sm text-primary-foreground/80">
                        <code>{value.code}</code>
                    </pre>
                </div>
            );
        },
    },
    block: {
        normal: ({ children }) => <p className="leading-7 text-muted-foreground">{children}</p>,
        h2: ({ children }) => (
            <h2 className="mt-10 text-2xl font-semibold text-foreground">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="mt-8 text-xl font-semibold text-foreground">{children}</h3>
        ),
        h4: ({ children }) => (
            <h4 className="mt-8 text-lg font-semibold text-foreground">{children}</h4>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="my-4 list-disc pl-6 text-muted-foreground">{children}</ul>
        ),
        number: ({ children }) => (
            <ol className="my-4 list-decimal pl-6 text-muted-foreground">{children}</ol>
        ),
    },
    marks: {
        strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
        ),
        em: ({ children }) => <em className="text-muted-foreground">{children}</em>,
        code: ({ children }) => (
            <code className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-primary-foreground/80">
                {children}
            </code>
        ),
    },
};
