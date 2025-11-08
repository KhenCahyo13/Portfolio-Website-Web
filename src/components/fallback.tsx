import { itemVariants } from "@/app/(home)/data";
import { motion } from "motion/react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { FC } from "react";

interface FallbackProps {
    title: string;
    description: string;
}

export const EmptyDataFallback: FC<FallbackProps> = ({
    title,
    description,
}) => (
    <motion.div variants={itemVariants} className="md:col-span-3">
        <Card className="border-white/15 bg-white/5">
            <CardHeader className="px-6">
                <CardTitle className="text-lg text-foreground">
                    {title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                    {description}
                </CardDescription>
            </CardHeader>
        </Card>
    </motion.div>
)