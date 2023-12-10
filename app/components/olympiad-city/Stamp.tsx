import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import EnterIcon from '~/icons/Enter';
import GotoArrow from '~/icons/GotoArrow';
import PassportBus from '~/icons/PassportBus';
import PassportFerry from '~/icons/PassportFerry';
import PassportPlane from '~/icons/PassportPlane';
import PassportTrain from '~/icons/PassportTrain';
import type { Visit } from '~/types/globe';

function getVisitIcon(type: 'plane' | 'train' | 'ferry' | 'bus') {
  switch (type) {
    case 'plane':
      return <PassportPlane className="h-4 fill-[#2B4955]" />;
    case 'train':
      return <PassportTrain className="w-10 fill-[#2B4955] stroke-[#2B4955] stroke-[2px]" />;
    case 'ferry':
      return <PassportFerry className="w-10 fill-[#2B4955]" />;
    case 'bus':
      return <PassportBus className="w-10 fill-[#2B4955]" />;
  }
}

const MotionArrow = motion(GotoArrow);

export function Stamp({ visit, citySlug, last }: { visit: Visit; citySlug?: string | null; last?: boolean }) {
  const [hovered, setHovered] = useState(false);

  if (!visit.date) return null;

  if (!visit.leg) {
    return (
      <div
        className={`block w-32 rotate-6 justify-self-start rounded-[8px] border-2 border-[#2B4955] p-[1px] text-[#2B4955] md:w-36 ${
          last ? 'mr-0' : 'mr-3'
        }`}
      >
        <div className="rounded-md border-2 border-[#2B4955]">
          <div className="flex justify-between">
            <span className="ml-1 mt-1 block h-6 w-6 rounded-full border-[2px] border-[#2B4955] text-center text-xs leading-[21px] text-[#2B4955]">
              {visit.countryCode}
            </span>
            <div className="flex h-7 items-center border border-r-0 border-t-0 border-black p-1">
              {getVisitIcon(visit.entranceType)}
            </div>
          </div>
          <span className="my-1 block w-full text-center text-red-600 md:my-1">{visit.date.replaceAll('-', '.')}</span>
          <EnterIcon className="mb-1 ml-1 h-6 fill-[#2B4955] stroke-[#2B4955] stroke-[4px]" />
        </div>
      </div>
    );
  }

  return (
    <Link
      to={`/trip/route/${visit.leg}?refer=${encodeURI(citySlug || '')}`}
      className={`block w-32 rotate-6 justify-self-start rounded-[8px] border-2 border-[#2B4955] p-[1px] text-[#2B4955] md:w-36 ${
        last ? 'mr-0' : 'mr-3'
      } transition-colors hover:bg-[#ececec]`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="rounded-md border-2 border-[#2B4955]">
        <div className="flex justify-between">
          <span className="ml-1 mt-1 block h-6 w-6 rounded-full border-[2px] border-[#2B4955] text-center text-xs leading-[21px] text-[#2B4955]">
            {visit.countryCode}
          </span>
          <div className="flex h-7 items-center border border-r-0 border-t-0 border-black p-1">
            {getVisitIcon(visit.entranceType)}
          </div>
        </div>
        <div className="my-1 flex w-full items-center justify-center md:my-1">
          <span className="ml-1 block text-center text-base text-red-600">{visit.date.replaceAll('-', '.')}</span>
          <MotionArrow className="ml-1 h-6 w-2 fill-red-600" initial={{ x: 0 }} animate={{ x: hovered ? '2px' : 0 }} />
        </div>
        <EnterIcon className="mb-1 ml-1 h-6 fill-[#2B4955] stroke-[#2B4955] stroke-[4px]" />
      </div>
    </Link>
  );
}
