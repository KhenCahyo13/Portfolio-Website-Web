import { FC, Fragment } from "react";
import Hero from "./hero";
import About from "./about";
import Experiences from "./experiences";
import Skills from "./skills";
import Projects from "./projects";
import Blogs from "./blogs";
import Collaboration from "./collaboration";

const HomeView: FC = () => (
    <Fragment>
        <Hero />
        <About />
        <Experiences />
        <Skills />
        <Projects />
        <Blogs />
        <Collaboration />
    </Fragment>
);

export default HomeView;