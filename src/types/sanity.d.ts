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