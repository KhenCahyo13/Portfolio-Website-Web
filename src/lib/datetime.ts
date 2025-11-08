export const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    try {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(dateString));
    } catch {
        return dateString;
    }
};
