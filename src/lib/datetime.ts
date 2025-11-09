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

export const formatPeriod = (startDate?: string, endDate?: string | null, isCurrent?: boolean) => {
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' });
    const start = startDate ? formatter.format(new Date(startDate)) : '';
    const end = isCurrent ? 'Present' : endDate ? formatter.format(new Date(endDate)) : 'Finished';
    return `${start} — ${end}`;
};
