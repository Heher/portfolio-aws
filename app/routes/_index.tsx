import type { MetaFunction } from '@remix-run/node';
import { Link, useLocation } from '@remix-run/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { RectReadOnly } from 'react-use-measure';
import useMeasure from 'react-use-measure';
import { Itenerary } from '~/components/Itenerary';
import EmailIcon from '~/icons/Email';
import GitHubIcon from '~/icons/Github';
import IndexArrow from '~/icons/IndexArrow';
import LinkedInIcon from '~/icons/LinkedIn';
import ResumeIcon from '~/icons/Resume';

import * as gtag from '~/utils/gtags.client';

const MotionArrow = motion(IndexArrow);

export const meta: MetaFunction = () => {
  return [
    { title: 'John Heher | Web Developer' },
    {
      name: 'description',
      content: 'John Heher is a web developer from the United States, currently looking for fully remote work.'
    }
  ];
};

function SocialLink({ children, ...rest }: { children: React.ReactNode; [key: string]: any }) {
  return (
    <a
      className="grid grid-cols-[40px_1fr] items-center text-sm font-semibold uppercase leading-none text-[var(--index-link)] transition-colors hover:text-[var(--index-link-hover)]"
      {...rest}
    >
      {children}
    </a>
  );
}

function IndexContent({ size }: { size: RectReadOnly }) {
  const [expand, setExpand] = useState(false);
  const [travelLinkHovered, setTravelLinkHovered] = useState(false);

  const location = useLocation();

  const containerRef = useRef<HTMLDivElement>(null);

  const [contentRef, contentSize] = useMeasure({ debounce: 300 });

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--body-background', 'var(--index-background)');
  }, []);

  useEffect(() => {
    if (expand) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [expand]);

  if (!size?.width) return null;

  return (
    <motion.div
      className={`m-0 mx-auto max-w-lg ${!expand && 'min-h-[880px]'}`}
      ref={containerRef}
      key={location.key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="main-content pb-5"
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: expand ? -150 : 0, opacity: expand ? 0 : 1 }}
        transition={{
          duration: 0.3,
          ease: 'easeOut'
        }}
        ref={contentRef}
        style={{ visibility: expand ? 'hidden' : 'visible' }}
      >
        <img
          src="/images/me.jpg"
          alt="Me looking absolutely stunning while freezing in Cortina d'Ampezzo"
          className="w-32 rounded-xl"
        />
        <h1 className="mt-10 text-4xl font-semibold leading-none text-[#282B27]">John Heher</h1>
        <h2 className="mt-2 text-base uppercase text-[#50564E]">Web Developer</h2>
        <div className="mt-10 grid grid-cols-1 grid-rows-4 justify-items-start gap-5">
          <SocialLink
            href="https://github.com/Heher"
            aria-label="My GitHub"
            onClick={() => {
              gtag.event({
                action: 'click_contact',
                category: 'Contact Link',
                label: 'GitHub'
              });
            }}
          >
            <GitHubIcon className={`h-6 fill-current`} />
            <span className="text-xs">GitHub</span>
          </SocialLink>
          <SocialLink
            href="https://www.linkedin.com/in/johnheher/"
            aria-label="My LinkedIn"
            onClick={() => {
              gtag.event({
                action: 'click_contact',
                category: 'Contact Link',
                label: 'LinkedIn'
              });
            }}
          >
            <LinkedInIcon className={`h-6 fill-current`} />
            <span className="text-xs">LinkedIn</span>
          </SocialLink>
          <SocialLink
            href="/cv.pdf"
            aria-label="My Résumé"
            onClick={() => {
              gtag.event({
                action: 'click_contact',
                category: 'Contact Link',
                label: 'Resume'
              });
            }}
          >
            <ResumeIcon className={`h-6 fill-current`} />
            <span className="text-xs">Resume</span>
          </SocialLink>
          <SocialLink
            href="mailto:johnheher@gmail.com"
            aria-label="Email me"
            onClick={() => {
              gtag.event({
                action: 'click_contact',
                category: 'Contact Link',
                label: 'Email'
              });
            }}
          >
            <EmailIcon className={`w-5 fill-current`} />
            <span className="text-xs">Email</span>
          </SocialLink>
        </div>
        <div className="mt-20 grid justify-items-start">
          <Link
            to="/trip"
            className="grid grid-cols-[1fr_40px] items-center"
            onMouseEnter={() => setTravelLinkHovered(true)}
            onMouseLeave={() => setTravelLinkHovered(false)}
            aria-label="My travels to the Olympic cities"
          >
            <h2
              className={`text-lg font-semibold uppercase ${
                travelLinkHovered ? 'text-[#686A67]' : 'text-[#282B27]'
              } transition-colors`}
            >
              Travels
            </h2>
            <MotionArrow
              className="ml-3 h-3"
              animate={{
                x: travelLinkHovered ? 4 : 0,
                fill: travelLinkHovered ? 'var(--index-link-hover)' : 'var(--index-link)'
              }}
            />
          </Link>
        </div>
      </motion.div>
      {contentSize?.height > 0 && (
        <Itenerary expand={expand} setExpand={setExpand} contentSize={contentSize} size={size} />
      )}
    </motion.div>
  );
}

export default function Index() {
  const [pageContainerRef, size] = useMeasure({ debounce: 300 });

  return (
    <main
      className="min-h-screen w-[100vw] bg-[var(--index-background)] px-5 py-10 font-['Figtree'] text-[18px]"
      ref={pageContainerRef}
    >
      <IndexContent size={size} />
    </main>
  );
}
