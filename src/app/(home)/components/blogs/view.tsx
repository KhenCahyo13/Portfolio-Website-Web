import { FC } from 'react';
import { motion } from 'motion/react';
import { articles, itemVariants, sectionVariants, staggerVariants } from '../../data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const BlogsView: FC = () => (
    <motion.section
        id="blogs"
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
                    Blogs
                </Badge>
                <h2 className="font-heading text-3xl text-foreground">
                    Notes on process and craft.
                </h2>
                <p className="text-sm text-muted-foreground md:text-base">
                    Short reads on how I keep teams aligned and systems stable.
                </p>
            </div>
            <motion.div variants={staggerVariants} className="grid gap-6 md:grid-cols-3">
                {articles.map(({ title, summary, date, link }) => (
                    <motion.div key={title} variants={itemVariants}>
                        <Card className="h-full border-white/15 bg-white/5">
                            <CardHeader className="px-4">
                                <CardDescription className="uppercase tracking-[0.3em] text-[0.65rem]">
                                    {date}
                                </CardDescription>
                                <CardTitle className="text-lg text-foreground">{title}</CardTitle>
                                <CardDescription>{summary}</CardDescription>
                            </CardHeader>
                            <CardContent className="px-4">
                                <Button asChild variant="link" className="px-0 text-primary">
                                    <Link href={link}>Continue reading →</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </motion.section>
);

export default BlogsView;
