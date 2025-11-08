import { FC } from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { experienceTimeline, itemVariants, sectionVariants } from '../../data';

const ExperiencesView: FC = () => (
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
            <div className="space-y-4">
                {experienceTimeline.map(({ company, role, period, summary }) => (
                    <motion.div
                        key={`${company}-${role}`}
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <Card className="h-full border-white/15 bg-white/5">
                            <CardHeader className="px-4">
                                <CardTitle className="flex flex-col gap-1 text-xl text-foreground sm:flex-row sm:items-center sm:justify-between">
                                    <span>{role}</span>
                                    <span className="text-sm font-normal text-muted-foreground">
                                        {period}
                                    </span>
                                </CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    {company} — {summary}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    </motion.section>
);

export default ExperiencesView;
