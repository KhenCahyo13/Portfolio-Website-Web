import { urlFor } from "@/lib/sanity";
import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

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
                        <p className="px-4 py-2 text-center text-xs text-muted-foreground">{value.caption}</p>
                    ) : null}
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
    },
    list: {
        bullet: ({ children }) => <ul className="my-4 list-disc pl-6 text-muted-foreground">{children}</ul>,
        number: ({ children }) => <ol className="my-4 list-decimal pl-6 text-muted-foreground">{children}</ol>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
        em: ({ children }) => <em className="text-muted-foreground">{children}</em>,
    },
};