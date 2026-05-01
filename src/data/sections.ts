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
      'An era marked by intense non-violent battle between the U.S. and the Soviet Union, leading to proxy wars across the globe. Steve Simpson was born in 1967 -- right in the middle of it -- as the son of a Navy fighter pilot.',
    findings: [
      'Steve\'s earliest memories were of his father being gone for long periods of time as a Navy fighter pilot.',
      '"You don\'t really get a perspective as a kid. You just know that there\'s tension in the world, and you know your father\'s been gone."',
      'His parents divorced when he was around six. It was the stress constantly brought into the house that defined those early years.',
      'Growing up, Steve witnessed a sharp divide: the military and civilians became very separate -- the Vietnam War had been looked down upon by public opinion.',
    ],
    quote: '"It was more just the stress that was constantly brought into the house."',
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
      'Vietnam was almost a quiet war -- you were in the military, you knew about it, but the civilian world kept its distance. The U.S. Navy projected global power from aircraft carriers while families at home listened to the President on the radio.',
    findings: [
      'Steve\'s father flew on the very first strike of the Vietnam War, deployed on an aircraft carrier.',
      '"I remember my mom hearing the President announce [it]" -- Steve has since found and read the actual news article from that day.',
      'The military felt they had done what they were asked to do. They weren\'t allowed to fight the war on their terms -- and then they came home.',
      'From the 1970s through the 1980s, the phrase "Thank you for your service" simply did not exist. The split between military families and civilian America was real.',
    ],
    quote: '"The military did their best. They fought a war, but they didn\'t feel supported -- and then they went home and had kids like me."',
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
      'Reagan brought the country\'s confidence back up. The face-down with Russia defined the decade -- and for kids growing up in San Diego near Coronado Naval Air Station, the Cold War was never just an abstraction.',
    findings: [
      'Schools ran "duck, cover, and run" drills. Families were told to wear layers of clothing and keep covered food ready for a radiation blast.',
      '"You were in too many circles. Duck, cover, run -- didn\'t really matter." Steve and his classmates understood the futility, even as children.',
      'Steve grew up near Coronado Naval Air Station in San Diego. Under a custody agreement, he and his brother would visit their father -- who, unknown to them, was working inside NORAD at Cheyenne Mountain, Montana.',
      '"I did not know that while I\'m visiting Montana, he\'s actually working at NORAD." Steve only learned this later.',
    ],
    quote: '"Reagan really brought the country\'s confidence up." -- Steve on the shift from the Carter years to the 1980s.',
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
      'After Desert Storm and the Soviet collapse, the United States stood as the sole world power. A dangerous sense of invincibility settled over the nation -- we had bankrupted Russia and seemed untouchable.',
    findings: [
      'Russia went into Afghanistan; the U.S. responded by sending Stinger missiles to the Mujahideen -- a proxy war in reverse.',
      'In 1997, Steve flew to Moscow on United Airlines. When the plane door opened, he saw firsthand how economically broken Russia had become.',
      '"They were down. Economically, power-wise, they were weak." China was not yet the force it is today.',
      'The U.S. had gone through Desert Storm and Desert Shield. We were, as Steve put it, "truly the world power" -- which made what came next all the more shattering.',
    ],
    quote: '"I remember landing in Moscow in 1997 and seeing what Russia had become. They were just... down."',
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
    years: 'September 11, 2001',
    title: 'The 9/11 Turning Point',
    context:
      'September 11, 2001 permanently transformed national security and global warfare. For Steve Simpson, it was also deeply personal -- he had missed the attack by exactly one month.',
    findings: [
      'Steve moved from New York City to San Diego in August 2001 -- one month before the attacks.',
      'His daily office was two blocks from the World Trade Center. A month\'s difference, and he would have been there.',
      '"I remember being in LA and going, Oh my God, watching that second tower come down live on TV." He was at a client\'s hotel room when it happened.',
      'One of the hijacked planes was targeting Los Angeles. For five days, not a single aircraft flew over America. When the first plane finally reappeared in the sky, it stopped freeway traffic.',
      '"It was unprecedented. Three, four, five days with not a single plane in the sky -- you were frozen."',
    ],
    quote: '"By a month\'s difference, I would have been living in New York, and my office was two blocks away from the tower."',
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
      'History is not just read in books -- it is lived through the people who carried it. The biggest memory Steve took away from a lifetime shaped by war was not a battle, a president, or an attack. It was a conversation.',
    findings: [
      'Only in recent years did Steve sit down with his father for a true man-to-man talk about the Vietnam War.',
      'His father had kept his experiences to himself for decades -- Steve was still a child during the war, and some things simply could not be said then.',
      '"Seeing the human -- truly seeing the human." Steve describes finally understanding what his father went through and what he had to do.',
      '"It was a complete understanding on both sides." The rift between the pilot and his son was finally bridged -- not by history, but by honesty.',
    ],
    quote: '"That conversation with my father a couple years ago -- that\'s the wrap-up to this."',
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
