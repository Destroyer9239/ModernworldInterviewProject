export interface StorySection {
  id: string;
  index: number;
  era: string;
  years: string;
  title: string;
  context: string;
  findings: string[];
  quote?: string;
  accentColor: string;
  jetState: {
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    positionX: number;
    positionY: number;
    positionZ: number;
    cameraFov: number;
    cameraZ: number;
  };
}

export const STORY_SECTIONS: StorySection[] = [
  {
    id: 'cold-war-origins',
    index: 0,
    era: 'Section I',
    years: '1945 - 1991',
    title: 'The Cold War Origins',
    context:
      'An intense non-violent battle between the U.S. and the Soviet Union defined the second half of the twentieth century -- an era of proxy wars, nuclear brinkmanship, and a generation of children raised under its invisible weight.',
    findings: [
      'Steve Simpson, born 1967, grew up as the son of a Navy fighter pilot.',
      'His childhood was defined by the "stress that was constantly brought into the house."',
      'His father was frequently gone for long periods at sea, leaving a quiet but heavy absence behind.',
    ],
    quote: '"The stress was always there -- you could feel it without anyone saying a word."',
    accentColor: '#4a90d9',
    jetState: {
      rotationX: 0,
      rotationY: 0.3,
      rotationZ: 0,
      positionX: 2,
      positionY: 0,
      positionZ: 0,
      cameraFov: 60,
      cameraZ: 8,
    },
  },
  {
    id: 'vietnam-flashpoint',
    index: 1,
    era: 'Section II',
    years: '1960s - 1970s',
    title: 'The Vietnam Flashpoint',
    context:
      'Vietnam became the defining proxy war of the Cold War era -- where the United States Navy projected global power while families at home waited for news that sometimes never came.',
    findings: [
      "Steve's father flew on the very first strike of the Vietnam War.",
      "Steve's mother heard President Johnson announce the conflict live on the news.",
      'The era created a "quiet war" between military families and the civilian world -- public opinion had torn the two apart.',
    ],
    quote: '"My mother heard the President on the news. My father was already in the air."',
    accentColor: '#c0392b',
    jetState: {
      rotationX: 0.1,
      rotationY: -0.5,
      rotationZ: 0.05,
      positionX: -2,
      positionY: 0.5,
      positionZ: 0,
      cameraFov: 65,
      cameraZ: 7,
    },
  },
  {
    id: 'late-cold-war',
    index: 2,
    era: 'Section III',
    years: '1980s',
    title: 'The Late Cold War & Domestic Life',
    context:
      'The Reagan era rebuilt American confidence with a muscular face-down of the Soviet Union -- but beneath the patriotism, the threat of nuclear annihilation shaped daily life in ways most Americans have since forgotten.',
    findings: [
      'Schools conducted "duck, cover, and run" drills; families were taught to wear layers and cover food against radiation blasts.',
      'Steve lived near Coronado Naval Air Station, growing up in the shadow of the runway.',
      'He visited his father while he worked deep inside Cheyenne Mountain at NORAD headquarters in Montana.',
    ],
    quote: '"We practiced hiding under desks as if wood could stop a warhead."',
    accentColor: '#8e44ad',
    jetState: {
      rotationX: -0.1,
      rotationY: 0.8,
      rotationZ: -0.05,
      positionX: 1.5,
      positionY: -0.3,
      positionZ: 0,
      cameraFov: 55,
      cameraZ: 9,
    },
  },
  {
    id: 'post-cold-war',
    index: 3,
    era: 'Section IV',
    years: '1990s',
    title: 'Post-Cold War & Globalization',
    context:
      "With the Soviet Union dissolved, the United States stood alone as the world's singular superpower. A decade of globalization followed -- and with it, a dangerous sense of invincibility.",
    findings: [
      'The U.S. felt "untouchable" -- the sole world power in an era of unchallenged dominance.',
      'In 1997, Steve traveled to Russia and witnessed their economic collapse firsthand.',
      'The crumbling infrastructure and empty shelves of Moscow told him the Cold War threat had truly passed.',
    ],
    quote: '"Standing in Moscow in 1997, I understood that the enemy we had feared our whole lives was already gone."',
    accentColor: '#27ae60',
    jetState: {
      rotationX: 0.05,
      rotationY: 1.2,
      rotationZ: 0.08,
      positionX: -1,
      positionY: 0.2,
      positionZ: 0,
      cameraFov: 58,
      cameraZ: 10,
    },
  },
  {
    id: '9-11-turning-point',
    index: 4,
    era: 'Section V',
    years: '2001',
    title: 'The 9/11 Turning Point',
    context:
      'September 11, 2001 permanently transformed the architecture of national security, the nature of global warfare, and the soul of American identity -- in a single morning.',
    findings: [
      'Steve moved from New York City to San Diego in August 2001 -- exactly one month before the attacks.',
      'His office had been two blocks from the World Trade Center.',
      'He witnessed "unprecedented silence" -- five full days with no aircraft in the sky over America.',
    ],
    quote: '"I had left my office two blocks from the Towers just thirty days before. The silence in the sky lasted five days."',
    accentColor: '#e67e22',
    jetState: {
      rotationX: -0.2,
      rotationY: -1.0,
      rotationZ: -0.1,
      positionX: 0,
      positionY: -0.5,
      positionZ: 0,
      cameraFov: 70,
      cameraZ: 6,
    },
  },
  {
    id: 'man-to-man-reflection',
    index: 5,
    era: 'Section VI',
    years: 'Present Day',
    title: 'The Man-to-Man Reflection',
    context:
      'History is not lived in textbooks. It lives in the spaces between fathers and sons, in conversations deferred for decades, in the weight of things left unsaid -- until finally they are not.',
    findings: [
      'History is lived through people, not books -- every era has a human face.',
      'A recent man-to-man conversation finally bridged the gap between the pilot and his son.',
      "For the first time, Steve's father spoke directly about the reality of war -- and what it means to kill.",
    ],
    quote: '"We finally talked, man to man. About war. About killing. About everything he never said."',
    accentColor: '#f1c40f',
    jetState: {
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      cameraFov: 50,
      cameraZ: 7,
    },
  },
];
