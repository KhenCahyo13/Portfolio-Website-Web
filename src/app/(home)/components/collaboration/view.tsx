import { FC } from "react";
import { motion } from "motion/react";
import { sectionVariants } from "../../data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CollaborationView: FC = () => (
    <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pb-16 pt-12"
    >
        <div className="mx-auto w-full max-w-5xl rounded-4xl border border-white/10 bg-white/5 px-6 py-10 text-center shadow-2xl shadow-primary/20">
            <Badge variant="outline" className="border-white/20 bg-transparent text-xs uppercase tracking-[0.3em]">
                Let&apos;s talk
            </Badge>
            <h2 className="mt-4 font-heading text-3xl text-foreground md:text-4xl">Ready to collaborate?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
                Send over a short brief with goals, timeline, and team context. I&apos;ll reply within a day with a plan on how I can help.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg">
                    <Link href="mailto:khencahyo02@gmail.com">Email me</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/30 text-foreground">
                    <Link href="/contact">Download My Resume</Link>
                </Button>
            </div>
        </div>
    </motion.section>
);

export default CollaborationView;