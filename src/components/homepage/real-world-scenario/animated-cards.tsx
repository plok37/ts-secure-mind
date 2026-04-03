import Link from 'next/link';
import { FC } from 'react';

interface CardProps {
  number: string;
  title: string;
  content: string;
  gradientColors: string[];
  scenario: string;
}

const Card: FC<CardProps> = ({ number, title, content, gradientColors, scenario }) => {
  return (
    <Link className='flex justify-center items-center' href={`/real-world-scenario/${scenario}`}>
      <div className="relative xl:w-80 h-50 bg-a shadow-xl rounded-3xl group overflow-hidden card-hover-root
    lg:w-13/10">
        {/* Face 1 - Content */}
        <div className="absolute bottom-0 left-0 w-full h-full rounded-lg z-20 box-border p-5 flex face face1 opacity-0 pointer-events-none transition-opacity duration-1000 group-hover:opacity-100 group-hover:pointer-events-auto">
          <div className="content">
            <h2 className="text-2xl font-medium mb-2 font-h1">{title}</h2>
            <p className="text-base font-h3">{content}</p>
          </div>
        </div>
        {/* Face 2 - Colored background with number */}
        <div
          className="absolute bottom-0 left-0 w-full h-full flex justify-center items-center rounded-lg face face2 card-face2 transition-all duration-500"
          style={{ background: `linear-gradient(45deg, ${gradientColors[0]}, ${gradientColors[1]})` }}
        >
          {/* Semi-transparent overlay on left half */}
          <div className="absolute top-0 left-0 w-1/2 h-full rounded-l-lg pointer-events-none"></div>
          {/* Number */}
          <h2 className="m-0 p-0 text-a transition-all duration-500 text-[10em] group-hover:text-2xl card-number-shadow">{number}</h2>
        </div>
      </div>
    </Link>

  );
};

interface AnimatedCardsProps {
  cards: CardProps[];
}

const AnimatedCards: FC<AnimatedCardsProps> = ({ cards }) => {
  return (
    <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-8">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default AnimatedCards;