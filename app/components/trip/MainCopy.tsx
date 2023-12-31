import { motion } from 'framer-motion';
import type { OlympiadFieldsFragment } from '~/gql/graphql';
import type { AnimationVariants } from '~/types/globe';
import TripStatus from './TripStatus';

type MainCopyProps = {
  olympiads: OlympiadFieldsFragment[];
  variants: AnimationVariants;
};

function MainCopy({ olympiads, variants }: MainCopyProps) {
  return (
    <motion.div
      className="bg-gradient-to-b from-[var(--globe-background)] to-transparent px-[30px] pt-[5vh] md:max-w-md md:bg-none lg:max-w-lg"
      variants={variants}
      animate="visible"
      exit="hidden"
    >
      <h1 className="text-[2.5rem] leading-[1.2] text-slate-100 lg:text-5xl">
        Olympic trip
        <br />
        around the world
      </h1>

      <p className="mt-[30px] text-[1.1rem] text-slate-200 lg:text-[1.3rem]">
        As a person who thoroughly enjoys the Olympics and travelling, I decided to set a goal to travel to all of the
        Olympic cities, see their stadiums (or where they once were), go on a run or a ski trip, and overall just enjoy
        a part of the world I&rsquo;ve never been before.
      </p>
      <TripStatus olympiads={olympiads} />
    </motion.div>
  );
}

export default MainCopy;
