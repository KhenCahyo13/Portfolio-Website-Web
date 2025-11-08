import { FC } from "react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { skills, itemVariants, sectionVariants, staggerVariants } from "../../data";

const SkillsView: FC = () => (
    <motion.section
        id="skills"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="border-b border-white/10 py-16"
    >
        <div className="mx-auto w-full max-w-6xl space-y-6">
            <div className="space-y-3">
                <Badge variant="outline" className="border-white/20 bg-transparent text-xs uppercase tracking-[0.3em]">
                    Skills
                </Badge>
                <h2 className="font-heading text-3xl text-foreground">Tools I use every week.</h2>
                <p className="text-sm text-muted-foreground">A blend of frontend, backend, and infrastructure staples.</p>
            </div>
            <motion.div variants={staggerVariants} className="grid gap-4 sm:grid-cols-4">
                {skills.map((skill) => (
                    <motion.div key={skill.name} variants={itemVariants}>
                        <div className="flex items-center gap-4 rounded-xl border border-white/15 bg-white/5 px-4 py-3">
                            {skill.icon ? skill.icon : (
                                <div className="flex size-10 items-center justify-center rounded-lg border border-dashed border-white/30 bg-white/10 text-lg text-muted-foreground text-center">
                                    {skill.name.charAt(0)}
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-foreground">{skill.name}</span>
                                <span className="text-xs text-muted-foreground capitalize">{skill.level}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </motion.section>
);

export default SkillsView;