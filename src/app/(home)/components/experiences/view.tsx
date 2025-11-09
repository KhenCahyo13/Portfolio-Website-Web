import { FC } from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { itemVariants, sectionVariants } from '../../data';
import { ExperiencesViewProps } from './types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PortableText } from '@portabletext/react';
import { portableComponents } from '@/components/portable';
import ExperiencesSkeleton from './skeleton';

const formatPeriod = (start?: string, end?: string | null, current?: boolean) => {
    if (!start) return '';
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' });
    const startLabel = formatter.format(new Date(start));
    const endLabel = current ? 'Present' : end ? formatter.format(new Date(end)) : 'Finished';
    return `${startLabel} — ${endLabel}`;
};

const ExperiencesView: FC<ExperiencesViewProps> = ({ experiences, isLoading }) => (
    <motion.section
        id="experiences"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="border-b border-white/10 py-16"
    >
        <div className="mx-auto w-full max-w-6xl space-y-8">
            <div className="space-y-3">
                <Badge
                    variant="outline"
                    className="border-white/20 bg-transparent text-xs uppercase tracking-[0.3em]"
                >
                    Experiences
                </Badge>
                <h2 className="font-heading text-3xl text-foreground">
                    Roles that shaped my process.
                </h2>
                <p className="text-sm text-muted-foreground md:text-base">
                    From individual contributor work to leading pods, I stay close to the details
                    while keeping delivery predictable.
                </p>
            </div>
            {isLoading ? (
                <ExperiencesSkeleton />
            ) : (
                <Accordion type="multiple" className="space-y-4">
                    {experiences.map((exp) => {
                        const metaPieces = [
                            exp.company,
                            exp.employmentType,
                            exp.location,
                            exp.isRemote ? 'Remote' : null,
                        ].filter(Boolean);

                        return (
                            <AccordionItem key={exp._id} value={exp._id} className="border-none">
                                <Card className="border-white/15 bg-white/5">
                                    <AccordionTrigger className="w-full px-4 py-0">
                                        <CardHeader className="flex w-full flex-col gap-2 px-0">
                                            <CardTitle className="flex flex-col gap-1 text-xl text-foreground sm:flex-row sm:items-center sm:justify-between">
                                                <span>{exp.role}</span>
                                                <span className="text-sm font-normal text-muted-foreground">
                                                    {formatPeriod(exp.startDate, exp.endDate, exp.isCurrent)}
                                                </span>
                                            </CardTitle>
                                            <CardDescription className="text-muted-foreground">
                                                {metaPieces.join(' · ')}
                                            </CardDescription>
                                        </CardHeader>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-0">
                                        <CardContent className="space-y-4 px-4 pb-6">
                                            {exp.summary ? (
                                                <div className="prose prose-invert max-w-none text-sm">
                                                    <PortableText value={exp.summary} components={portableComponents} />
                                                </div>
                                            ) : null}
                                            {exp.highlights?.length ? (
                                                <ul className="space-y-2 text-sm text-muted-foreground">
                                                    {exp.highlights.map((highlight) => (
                                                        <li key={highlight} className="flex items-start gap-2">
                                                            <span className="mt-1 size-1 rounded-full bg-primary" />
                                                            <span>{highlight}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : null}
                                            {exp.techStack?.length ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {exp.techStack.map((tech) => (
                                                        <Badge
                                                            key={`${exp._id}-${tech}`}
                                                            variant="outline"
                                                            className="border-white/10 bg-transparent text-xs text-muted-foreground"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            ) : null}
                                        </CardContent>
                                    </AccordionContent>
                                </Card>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            )}
        </div>
    </motion.section>
);

export default ExperiencesView;
