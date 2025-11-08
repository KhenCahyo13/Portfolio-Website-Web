import { FC } from "react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { focusTiles, itemVariants, sectionVariants, staggerVariants } from "../../data";

const AboutView: FC = () => (
    <motion.section
        id="about"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="border-b border-white/10 py-16"
    >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-0 lg:flex-row">
            <div className="flex-1 space-y-4">
                <Badge variant="outline" className="border-white/20 bg-transparent text-xs uppercase tracking-[0.3em]">
                    About
                </Badge>
                <h2 className="font-heading text-3xl text-foreground">Building calm, maintainable software for fast-moving teams.</h2>
                <p className="text-sm text-muted-foreground md:text-base">
                    I focus on crafting software that balances speed, stability, and maintainability. My goal is to deliver solutions that scale smoothly while keeping development processes simple and sustainable. With a deep understanding of both frontend and backend systems, I help teams move faster without sacrificing quality.
                </p>
            </div>
            <motion.div variants={staggerVariants} className="flex-1 grid items-stretch gap-4 sm:grid-cols-2">
                {focusTiles.map(({ title, description }) => (
                    <motion.div key={title} variants={itemVariants}>
                        <Card className="h-full border-white/15 bg-white/5">
                            <CardHeader className="px-4">
                                <CardTitle className="text-lg text-foreground">{title}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </motion.section>
);

export default AboutView;