import { FC, useEffect, useState } from 'react';
import { client } from '@/lib/sanity';
import { experiencesListQuery } from '@/sanity/experiences/api';
import { ExperienceList } from '@/sanity/experiences/types';
import ExperiencesView from './view';

const Experiences: FC = () => {
    const [experiences, setExperiences] = useState<ExperienceList[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const fetchExperiences = async () => {
            try {
                setIsLoading(true);
                const data = await client.fetch<ExperienceList[]>(experiencesListQuery);
                if (mounted) {
                    setExperiences(data ?? []);
                }
            } catch (error) {
                console.error('[Experiences] failed to fetch data', error);
                if (mounted) {
                    setExperiences([]);
                }
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchExperiences();

        return () => {
            mounted = false;
        };
    }, []);

    return <ExperiencesView experiences={experiences} isLoading={isLoading} />;
};

export default Experiences;
