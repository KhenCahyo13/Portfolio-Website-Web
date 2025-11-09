export interface SanityImage {
    _type: string;
    alt: string;
    caption: string;
    asset: {
        _ref: string;
        _type: string;
    }
}

export interface SanitySlug {
    _type: string;
    current: string;
}

export interface SanitySeo {
    keywords: string[];
    metaDescription: string;
    metaTitle: string;
}

export interface SanityRichTextChild {
    _key: string;
    _type: 'span';
    marks: string[];
    text: string;
};

export interface SanityRichTextMarkDef {
    _key: string;
    _type: string;
    [key: string]: unknown;
};

export interface SanityRichBlock {
    _key: string;
    _type: 'block';
    style?: string;
    listItem?: string;
    level?: number;
    markDefs: SanityRichTextMarkDef[];
    children: SanityRichTextChild[];
};

export interface SanityRichImageBlock {
    _key: string;
    _type: 'image';
    alt?: string;
    caption?: string;
    asset: {
        _ref: string;
        _type: 'reference';
    };
};

export type SanityRichContentItem = SanityRichBlock | SanityRichImageBlock | SanityCodeBlock;

export interface SanityCodeBlock {
    _key: string;
    _type: 'codeBlock';
    code: string;
    filename?: string;
    language?: string;
}

export type SanityRichContent = SanityRichContentItem[];
