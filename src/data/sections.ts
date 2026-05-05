export interface StatItem {
  value: string;
  label: string;
}

export interface StorySection {
  id: string;
  index: number;
  era: string;
  years: string;
  title: string;
  shortTitle: string;
  interviewQuestion: string;
  context: string;
  historicalFact: string;
  findings: string[];
  quote?: string;
  stats: StatItem[];
  accentColor: string;
  bgImage?: string;
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
    title: 'Iron Curtain & Empty Chairs',
    shortTitle: 'Cold War',
    interviewQuestion: 'What are your earliest memories of being the son of a Navy carrier pilot?',
    historicalFact:
      'The Cold War was a 46-year standoff between the United States and the Soviet Union -- fought through proxy wars, intelligence operations, and nuclear brinkmanship, never directly between the two powers.',
    context:
      'Stephen Vance was born in 1967 -- arriving at the height of the Cold War. Growing up in a Navy family, the global conflict wasn\'t something you read about in the papers; it was the heavy silence at the dinner table and the empty chair when Dad was out on another six-month deployment.',
    findings: [
      'Early childhood was measured in deployments — long, quiet stretches where Dad was just a photo on the mantel and a voice on a crackling cassette tape.',
      '"You don\'t have a perspective as a kid. You just know there\'s a weight in the house, and you know your father is somewhere out on the ocean."',
      'It wasn\'t the words that defined those years, but the stress that never quite left the room.',
      'His parents divorced when Stephen was six, a casualty of the constant strain and distance of military life.',
      'By age ten, Stephen began to notice the invisible wall between the base and the city. The military families spoke a language of duty that the civilian world didn\'t understand.',
      'The veterans came home to a country that felt like it had turned its back on them, creating a divide that defined Stephen\'s upbringing.',
    ],
    quote: '"It was more just the stress that was constantly brought into the house."',
    stats: [
      { value: '1967', label: 'Year of birth' },
      { value: '1945', label: 'The standoff begins' },
      { value: '46 yrs', label: 'Duration of the era' },
      { value: '~6', label: 'Age at parents\' divorce' },
    ],
    accentColor: '#5a7d99',
    bgImage: '/images/cold-war.png',
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
    title: 'Gulf of Tonkin: The First Strike',
    shortTitle: 'Vietnam',
    interviewQuestion: 'Was your father ever deployed? How was the atmosphere at home while he was gone -- and when he was there?',
    historicalFact:
      'The Vietnam War was one of the defining conflicts of the Cold War era. The U.S. Navy played a critical role, launching airstrikes from aircraft carriers in the Gulf of Tonkin. Over 58,000 Americans died. The war deeply fractured civilian and military relations at home.',
    context:
      'Vietnam was a quiet war at home, until it wasn\'t. While the civilian world was turning its back, the Navy was projecting power from carriers in the Gulf of Tonkin. For Stephen\'s family, it meant listening to the President on the radio and waiting for a letter that might never come.',
    findings: [
      'Stephen\'s father flew on the very first strike of the Vietnam War, launching from the deck of a carrier into the unknown.',
      '"I remember my mom hearing the President announce it." Stephen later found the news clippings that matched his mother\'s terrified expression.',
      'The mission was sudden: he came running back from leave, was sent on patrol, and was in the air before the family could say goodbye.',
      'The family lived near the base, catching glimpses of the life he lived, but he was a ghost for months at a time.',
      'In the 70s and 80s, there were no yellow ribbons. "Thank you for your service" was a phrase that hadn\'t been invented yet.',
      '"The military did their best, but they didn\'t feel supported. They fought a war, then came home to raise kids like me."',
      'Vietnam left a rift between soldiers and civilians that would take a generation to heal.',
    ],
    quote: '"On the very first day, he came running back, was sent on patrol -- and was in the air."',
    stats: [
      { value: '1st', label: 'Strike mission flown by his father' },
      { value: 'Carrier', label: 'The floating city he called home' },
      { value: '0', label: 'Gratitude received from the public' },
      { value: '58k', label: 'American lives lost' },
    ],
    accentColor: '#a04539',
    bgImage: '/images/vietnam.png',
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
    title: 'Cheyenne Mountain & Duck-and-Cover',
    shortTitle: 'Home Front',
    interviewQuestion: 'Did you move bases? Were there drills in your area? What were they like?',
    historicalFact:
      'NORAD (North American Aerospace Defense Command) is buried inside Cheyenne Mountain, Colorado. During the Cold War it tracked every aircraft and missile in North American airspace 24/7. Reagan\'s massive military buildup in the 1980s was the final pressure that collapsed the Soviet economy.',
    context:
      'The 80s brought a new kind of confidence, but the threat remained. For a kid near Coronado Naval Air Station, the Cold War wasn\'t just a headline — it was the "duck and cover" drills in the hallway and the strange secret Dad was keeping in Montana.',
    findings: [
      'Stephen grew up in the shadow of Coronado NAS in San Diego, where the sound of jets was the soundtrack of his life.',
      'In school, they practiced hiding under desks. The kids knew it was useless. "You were in too many circles. Duck and cover didn\'t really matter."',
      'After the divorce, custody visits meant long trips to Montana. Stephen thought his dad was just working a desk job.',
      '"I didn\'t know that while I was visiting, he was actually inside Cheyenne Mountain." His father was working at NORAD, the heart of the nuclear defense grid.',
      'Reagan\'s buildup changed the mood. The country felt like it was finally punching back after years of feeling weak.',
      'American power was being projected with a new kind of conviction, and military families felt the shift first.',
    ],
    quote: '"I did not know that while I\'m visiting Montana, he\'s actually working at NORAD."',
    stats: [
      { value: 'NORAD', label: 'His father\'s classified posting' },
      { value: 'Coronado', label: 'The jet-fueled hometown' },
      { value: 'Useless', label: 'The consensus on school drills' },
      { value: '1980s', label: 'The era of Reagan\'s buildup' },
    ],
    accentColor: '#6a5a89',
    bgImage: '/images/late-cold-war.png',
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
    id: 'presidents-and-power',
    index: 3,
    era: 'Section IV',
    years: '1970s - 2001',
    title: 'The Weight of the Oval Office',
    shortTitle: 'Presidents',
    interviewQuestion: 'How were the presidents at the time of the Cold War? Were there any who drastically changed your life?',
    historicalFact:
      'From 1974 to 2001, six presidents shaped American foreign policy and military confidence: Ford, Carter, Reagan, Bush Sr., Clinton, and Bush Jr. Each projected American power very differently -- and military families felt every shift.',
    context:
      'Growing up in a military household meant watching the President through a different lens. It wasn\'t about party politics; it was about whether the man in the Oval Office made the country feel strong enough to keep your father safe.',
    findings: [
      'FORD: "We didn\'t feel strength. I felt like we were weak." The post-Nixon years felt like a country drifting without a rudder.',
      'CARTER: The vulnerability continued. For a Navy family, the lack of force was palpable and concerning.',
      'REAGAN: "The projection of power, the confidence — he brought the country back." This was the turning point for the military spirit.',
      'BUSH SR.: A steady hand, but the commanding fire of the Reagan years began to soften into a new world order.',
      'CLINTON: Prosperity arrived, but the military felt sidelined. "He gave Saturday Night Live a lot of material," Stephen recalls with a grin.',
      'BUSH JR.: Faced the ultimate test on 9/11. The "War on Terror" would change the military landscape forever.',
      'Stephen almost followed his father\'s path. "It was ultra-competitive." He chose a degree instead, stepping out from the cockpit\'s shadow.',
    ],
    quote: '"I\'m not speaking politically -- I\'m speaking as a kid growing up. We didn\'t feel strength and power."',
    stats: [
      { value: '6', label: 'Presidents who defined his youth' },
      { value: 'Reagan', label: 'The catalyst for confidence' },
      { value: 'Decision', label: 'Choosing college over the cockpit' },
      { value: 'SNL', label: 'His yardstick for presidential grit' },
    ],
    accentColor: '#5a8674',
    bgImage: '/images/presidents.png',
    jetState: {
      rotationX: 0.08,
      rotationY: 0.6,
      rotationZ: 0.03,
      positionX: 1.2,
      positionY: 0.3,
      positionZ: 0,
      cameraFov: 62,
      cameraZ: 8.5,
    },
  },
  {
    id: 'post-cold-war',
    index: 4,
    era: 'Section V',
    years: '1990s',
    title: 'The Broken Bear: Moscow \'97',
    shortTitle: 'Unchallenged',
    interviewQuestion: 'The Cold War ended when you were in your early 20s. How did feelings and the atmosphere change?',
    historicalFact:
      'Operation Desert Storm (1991) was the first major American military action after the Cold War. The U.S.-led coalition liberated Kuwait in 100 hours of ground combat. It reunited American civilians and the military after decades of post-Vietnam division, and signaled a new era of unchallenged U.S. power.',
    context:
      'After the Soviet collapse, America stood alone. A dangerous sense of invincibility took hold — we had won, and the world was ours. But when Stephen flew to Moscow in 1997, he didn\'t see a defeated enemy; he saw a broken people.',
    findings: [
      'The Cold War ended not with a bang, but with the slow bankruptcy of the Soviet machine.',
      'Desert Storm briefly reunited the country. The military was finally "allowed" to win, and the public cheered for it.',
      'In the 90s, the U.S. felt untouchable. Russia was in freefall, and China was still a distant concern.',
      'Stephen flew into Moscow in \'97. When the door opened, the smell of economic decay was immediate.',
      '"They were down. Power-wise, they were broken." The terrifying "Red Menace" of his childhood had become a memory.',
      'This era of unchallenged power created a blind spot. We felt so safe that we forgot how to look for new threats.',
      'That sense of invincibility is what made the morning of September 11 so completely shattering.',
    ],
    quote: '"We were truly the world power. Russia was now weak. And then came 9/11."',
    stats: [
      { value: '1997', label: 'The year he saw Moscow' },
      { value: 'Sole', label: 'U.S. as the only superpower' },
      { value: '100 hrs', label: 'The brevity of the Gulf War' },
      { value: 'Broken', label: 'The state of the Soviet economy' },
    ],
    accentColor: '#6e7a45',
    bgImage: '/images/post-cold-war.png',
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
    index: 5,
    era: 'Section VI',
    years: 'September 11, 2001',
    title: 'Ground Stop: September 11',
    shortTitle: '9/11',
    interviewQuestion: 'Where were you on 9/11? What was the city like before the planes hit -- and how did it impact you and those around you?',
    historicalFact:
      'On September 11, 2001, 19 hijackers carried out coordinated attacks on the World Trade Center and Pentagon. The FAA grounded all civilian aircraft for the first time in American history -- roughly 4,500 flights were ordered to land immediately. Civilian airspace was closed from September 11 to September 13, approximately two days.',
    context:
      'September 11 didn\'t just change the world; it shattered the quiet life Stephen had built. Having lived in New York for years, he missed the attack by a single month — a twist of fate that would haunt him for years.',
    findings: [
      'Stephen had moved from NYC to San Diego in August 2001. His daily office had been two blocks from the World Trade Center.',
      '"By a month\'s difference, I would have been there." The towers weren\'t just landmarks; they were his neighborhood.',
      'He watched the second tower fall from a hotel room in LA, realizing the world he grew up in was gone.',
      'For two days, the sky was empty. No vapor trails, no engine roar. Just a heavy, unnatural silence.',
      'When the first plane finally reappeared on the 13th, people stopped their cars on the freeway to stare in terror.',
      'His reaction was immediate and visceral, rooted in his father\'s legacy: the country wanted to punch back.',
      'The "son of a pilot" instinct kicked in — a rush to action that he still reflects on with a mix of pride and complexity.',
    ],
    quote: '"I remember living for days with no air traffic and fear -- and then I remember the first plane back in the sky."',
    stats: [
      { value: '30 days', label: 'The margin of his survival' },
      { value: '2 blocks', label: 'Distance from his old office' },
      { value: '4,500', label: 'Planes forced to land' },
      { value: 'Silent', label: 'The state of American skies' },
    ],
    accentColor: '#b5703f',
    bgImage: '/images/hero.png',
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
    index: 6,
    era: 'Section VII',
    years: 'Present Day',
    title: 'The Final Debrief',
    shortTitle: 'Reflection',
    interviewQuestion: 'If you had to pick one specific memory about all of this -- the most important one -- what would it be and why?',
    historicalFact:
      'Combat veterans of the Vietnam era often returned home to silence. PTSD was not yet a recognized diagnosis. The military-civilian divide meant many pilots, soldiers, and sailors never spoke openly about what they saw -- not even to their own children.',
    context:
      'History isn\'t found in textbooks; it\'s etched into the people who lived it. For Stephen, the climax of this story wasn\'t a battle or a presidency. It was a quiet conversation with an old man in a kitchen, decades after the engines stopped.',
    findings: [
      'It took years for Stephen and his father to finally sit down and talk — really talk — about Vietnam.',
      'His father had carried the weight in silence for forty years. There were things you just didn\'t say to a child.',
      'They spoke about the missions, the fear, and the impossible weight of taking a life.',
      '"I finally saw the human beneath the uniform." The "Pilot" became a father, and the "Son" became a man.',
      'The rift that had existed since the 1970s didn\'t close with an apology; it closed with understanding.',
      'The lesson of a lifetime: every era has a human face, and sometimes you have to wait a lifetime to see it clearly.',
    ],
    quote: '"That conversation with my father a couple years ago -- that\'s the wrap-up to this."',
    stats: [
      { value: '40 yrs', label: 'The duration of the silence' },
      { value: '1 talk', label: 'The conversation that healed' },
      { value: 'Healed', label: 'The current state of the rift' },
      { value: 'Human', label: 'What he finally saw in his father' },
    ],
    accentColor: '#b5a04a',
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

export const SUBJECT_BIO = {
  name: "Stephen 'Steve' Vance",
  dob: '1967',
  location: 'United States',
  connection: 'Son of a Navy Carrier Pilot',
  context:
    'Born in 1967 at the height of the Cold War, Stephen Vance grew up in the shadow of the world\'s most powerful military machines. From the duck-and-cover drills of San Diego to the secret bunkers of NORAD and the dust of Ground Zero, his life has been a front-row seat to the making of the modern world.',
};
