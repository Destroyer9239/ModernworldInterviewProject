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
    shortTitle: 'Cold War',
    interviewQuestion: 'What are your earliest memories of being the son of a Navy fighter pilot?',
    historicalFact:
      'The Cold War was a 46-year standoff between the United States and the Soviet Union -- fought through proxy wars, intelligence operations, and nuclear brinkmanship, never directly between the two powers.',
    context:
      'Steve Simpson was born in 1967 -- right in the middle of the Cold War. As the son of a Navy fighter pilot, the conflict was not an abstraction. It was the tension at the dinner table, the empty chair at bedtime, and the stress that never fully left the house.',
    findings: [
      'Steve\'s earliest memories were of his father being gone for long periods of time on deployment.',
      '"You don\'t really get a perspective as a kid. You just know that there\'s tension in the world, and you know your father\'s been gone."',
      'It was the stress constantly brought into the house that defined those early years -- not words, just weight.',
      'His parents divorced when Steve was around six years old.',
      'As Steve grew older -- 8, 9, 10 -- he became more aware of the widening divide between military families and the civilian world.',
      'The military felt they had done what they were asked to do. They weren\'t allowed to fight the war on their terms -- and they came home to a country that didn\'t welcome them.',
    ],
    quote: '"It was more just the stress that was constantly brought into the house."',
    stats: [
      { value: '1967', label: 'Steve\'s birth year' },
      { value: '1945', label: 'Cold War began' },
      { value: '46 yrs', label: 'Duration of the Cold War' },
      { value: '~6', label: 'Age at parents\' divorce' },
    ],
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
    shortTitle: 'Vietnam',
    interviewQuestion: 'Was your father ever deployed? How was the atmosphere at home while he was gone -- and when he was there?',
    historicalFact:
      'The Vietnam War was one of the defining conflicts of the Cold War era. The U.S. Navy played a critical role, launching airstrikes from aircraft carriers in the Gulf of Tonkin. Over 58,000 Americans died. The war deeply fractured civilian and military relations at home.',
    context:
      'Vietnam was almost a quiet war. You were in the military, you knew about it, but the civilian world turned its back. The U.S. Navy projected power from aircraft carriers while families listened to the President on the radio -- and waited.',
    findings: [
      'Steve\'s father flew on the very first strike of the Vietnam War, deployed on an aircraft carrier.',
      '"I remember my mom hearing the President announce it." Steve has since found and read the actual news article from that day.',
      'On the very first day, his father came running back, was sent on patrol, and flew the mission.',
      'The family lived near the base and would visit when they could. But he was often gone for months.',
      'From the 1970s through the 1980s, the phrase "Thank you for your service" simply did not exist.',
      '"The military did their best. They fought a war, but they didn\'t feel supported -- and then they went home and had kids like me."',
      'Vietnam created a rift between the military and civilians that would take decades to heal.',
    ],
    quote: '"On the very first day, he came running back, was sent on patrol -- and was in the air."',
    stats: [
      { value: '1st', label: 'Strike of Vietnam War his father flew' },
      { value: 'Aircraft', label: 'Carrier his father deployed from' },
      { value: '0', label: '"Thank you for service" -- never said' },
      { value: '58,000', label: 'American lives lost in Vietnam' },
    ],
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
    shortTitle: 'Home Front',
    interviewQuestion: 'Did you move bases? Were there drills in your area? What were they like?',
    historicalFact:
      'NORAD (North American Aerospace Defense Command) is buried inside Cheyenne Mountain, Colorado. During the Cold War it tracked every aircraft and missile in North American airspace 24/7. Reagan\'s massive military buildup in the 1980s was the final pressure that collapsed the Soviet economy.',
    context:
      'Reagan brought the country\'s confidence back up. The face-down with Russia defined the decade. For kids growing up near Coronado Naval Air Station in San Diego, the Cold War was never just something on the news -- it was in the drills, the layers of clothing, the covered food, and the trips to Montana.',
    findings: [
      'Steve grew up in San Diego near Coronado Naval Air Station.',
      'Schools ran "duck, cover, and run" drills. Families were taught to wear layers and keep covered food ready for a radiation blast.',
      '"You were in too many circles. Duck, cover, run -- didn\'t really matter." The children understood the futility.',
      'After his parents divorced, Steve and his brother traveled to Montana for custody visits with their father.',
      '"I did not know that while I\'m visiting Montana, he\'s actually working at NORAD." His father was stationed inside Cheyenne Mountain -- one of the most classified command centers in the world.',
      'Reagan\'s presidency marked a decisive shift in national confidence. After the weakness of the Ford and Carter years, American power was projected with conviction again.',
    ],
    quote: '"I did not know that while I\'m visiting Montana, he\'s actually working at NORAD."',
    stats: [
      { value: 'NORAD', label: 'His father\'s secret Montana posting' },
      { value: 'San Diego', label: 'Steve\'s hometown near Coronado NAS' },
      { value: 'Duck/Cover', label: 'School drill -- and they knew it was useless' },
      { value: '1980s', label: 'Reagan rebuilds American confidence' },
    ],
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
    id: 'presidents-and-power',
    index: 3,
    era: 'Section IV',
    years: '1970s - 2001',
    title: 'Presidents & The Projection of Power',
    shortTitle: 'Presidents',
    interviewQuestion: 'How were the presidents at the time of the Cold War? Were there any who drastically changed your life?',
    historicalFact:
      'From 1974 to 2001, six presidents shaped American foreign policy and military confidence: Ford, Carter, Reagan, Bush Sr., Clinton, and Bush Jr. Each projected American power very differently -- and military families felt every shift.',
    context:
      'Growing up as the son of a military pilot gave Steve a front-row seat to each presidency -- not through party politics, but through the one lens that mattered to a Navy family: strength, confidence, and the projection of American power on the world stage.',
    findings: [
      'FORD: Took over after Nixon resigned. "We didn\'t feel strength and power. I felt like we were weak." Ford spoke but had no force.',
      'CARTER: The nation continued to feel vulnerable. Military families expected strength -- and didn\'t see it.',
      'REAGAN: "The projection of force and power, the confidence -- Reagan really brought the country\'s confidence up." A decisive turning point.',
      'BUSH SR.: A good president, but without Reagan\'s commanding force. The momentum softened.',
      'CLINTON: "He gave Saturday Night Live a lot of skits, let\'s put it that way." Prosperity without projection.',
      'BUSH JR.: "Even more Saturday Night Live skits." Faced 9/11 and launched the War on Terror -- changed everything.',
      'Steve himself considered enlisting: "It was actually ultra-competitive." He chose a college degree instead. Life went a different direction.',
    ],
    quote: '"I\'m not speaking politically as Democrat or Republican -- I\'m speaking as a kid growing up. We didn\'t feel strength and power."',
    stats: [
      { value: '6', label: 'Presidents Steve lived under through 9/11' },
      { value: 'Reagan', label: 'Who restored national confidence' },
      { value: 'Considered', label: 'Steve thought about enlisting' },
      { value: 'SNL', label: 'How he measured presidential weakness' },
    ],
    accentColor: '#16a085',
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
    title: 'Post-Cold War & Invincibility',
    shortTitle: 'Post-Cold War',
    interviewQuestion: 'The Cold War ended when you were in your early 20s. How did feelings and the atmosphere change?',
    historicalFact:
      'Operation Desert Storm (1991) was the first major American military action after the Cold War. The U.S.-led coalition liberated Kuwait in 100 hours of ground combat. It reunited American civilians and the military after decades of post-Vietnam division, and signaled a new era of unchallenged U.S. power.',
    context:
      'After Desert Storm and the Soviet collapse, the United States stood as the sole world power. A dangerous sense of invincibility settled in -- we had bankrupted Russia, won the Gulf War in days, and seemed untouchable. Then Steve flew to Moscow in 1997 and saw the reality.',
    findings: [
      'Russia invaded Afghanistan; the U.S. countered by sending Stinger missiles to the Mujahideen -- a Cold War proxy conflict in reverse.',
      'Desert Storm and Desert Shield were pivotal: they reunited American civilians and the military after decades of post-Vietnam division.',
      'Post-Gulf War, the U.S. felt "truly the world power." Russia was collapsing. China was not yet a peer threat.',
      'In 1997, Steve flew to Moscow on United Airlines. When the plane door opened, he saw firsthand how economically broken Russia had become.',
      '"They were down. Economically, power-wise, they were weak."',
      'China "wasn\'t what it is now" -- the 1990s were shaped by one unchallenged superpower.',
      'This sense of invincibility -- we are untouchable -- is what made the morning of September 11, 2001 so utterly shattering.',
    ],
    quote: '"We were truly the world power. Russia was now weak. And then came 9/11."',
    stats: [
      { value: '1997', label: 'Steve\'s visit to Moscow' },
      { value: '#1', label: 'Sole world superpower post-Cold War' },
      { value: '100 hrs', label: 'Ground combat in Desert Storm' },
      { value: 'Bankrupt', label: 'What the Cold War did to the Soviet economy' },
    ],
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
    index: 5,
    era: 'Section VI',
    years: 'September 11, 2001',
    title: 'The 9/11 Turning Point',
    shortTitle: '9/11',
    interviewQuestion: 'Where were you on 9/11? What was the city like before the planes hit -- and how did it impact you and those around you?',
    historicalFact:
      'On September 11, 2001, 19 hijackers carried out coordinated attacks on the World Trade Center and Pentagon. The FAA grounded all civilian aircraft for the first time in American history -- roughly 4,500 flights were ordered to land immediately. Civilian airspace was closed from September 11 to September 13, approximately two days.',
    context:
      'September 11, 2001 permanently transformed national security, global warfare, and the American soul. For Steve Simpson, it was also deeply personal. He had missed the attack by exactly one month -- and watched the second tower collapse live on television from a hotel room in Los Angeles.',
    findings: [
      'Steve had lived in New York City for years. In August 2001, he moved to San Diego for a computer project -- one month before the attacks.',
      '"By a month\'s difference, I would\'ve been living in New York." His daily office was two blocks from the World Trade Center.',
      '"I remember being in LA and going, Oh my God, watching that second tower come down live on TV."',
      'Two of the four hijacked planes -- American Airlines Flight 11 and United Airlines Flight 175 -- were originally scheduled to fly to Los Angeles, the city where Steve now watched events unfold.',
      'For approximately two days, not a single civilian aircraft flew over the United States. The FAA lifted the ground stop on September 13, 2001.',
      'When the first plane finally reappeared in the sky, it stopped freeway traffic. People pulled over and stared up in fear.',
      'Being the son of a military pilot shaped his reaction: the country immediately wanted to "punch back" -- a rush to action Steve reflects on with complexity.',
    ],
    quote: '"I remember living for days with no air traffic and fear -- and then I remember the first plane back in the sky."',
    stats: [
      { value: '1 month', label: 'Before 9/11 Steve left NYC' },
      { value: '2 blocks', label: 'His office from the World Trade Center' },
      { value: '~2 days', label: 'FAA civilian air travel shut down (Sept 11–13)' },
      { value: '~4,500', label: 'Flights grounded on 9/11' },
    ],
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
    index: 6,
    era: 'Section VII',
    years: 'Present Day',
    title: 'The Man-to-Man Reflection',
    shortTitle: 'Reflection',
    interviewQuestion: 'If you had to pick one specific memory about all of this -- the most important one -- what would it be and why?',
    historicalFact:
      'Combat veterans of the Vietnam era often returned home to silence. PTSD was not yet a recognized diagnosis. The military-civilian divide meant many pilots, soldiers, and sailors never spoke openly about what they saw -- not even to their own children.',
    context:
      'History is not just read in books -- it is lived through the people who carried it. The biggest memory Steve took from a lifetime shaped by war was not a battle, a president, or an attack. It was a conversation he had with his father a few years ago.',
    findings: [
      'Only in recent years did Steve sit down with his father for a true man-to-man talk about the Vietnam War.',
      'His father had kept his experiences private for decades. Steve was still a child during the war -- and some things simply could not be said then.',
      'They talked candidly about what his father went through: the missions, what it meant to kill, the weight it left behind.',
      '"Seeing the human -- truly seeing the human." Steve describes finally understanding what his father did and who he was beneath the uniform.',
      '"It was a complete understanding on both sides." Not father to child -- but man to man.',
      'This conversation finally healed the rift that had existed between the pilot and his son for decades.',
      'The key lesson of the entire story: history is lived through people, not books. Every era has a human face -- and sometimes you wait decades to truly see it.',
    ],
    quote: '"That conversation with my father a couple years ago -- that\'s the wrap-up to this."',
    stats: [
      { value: 'Decades', label: 'Before father & son could truly talk' },
      { value: 'Vietnam', label: 'War his father carried silently' },
      { value: '2 sides', label: 'A complete understanding on both sides' },
      { value: 'Now', label: 'The rift finally healed' },
    ],
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

export const SUBJECT_BIO = {
  name: 'Steve Simpson',
  dob: '1967',
  location: 'United States',
  connection: 'Son of a Navy Fighter Pilot',
  context:
    'Born in 1967 -- the middle of the Cold War and the Vietnam War -- Steve Simpson grew up watching his father fly missions, visited NORAD without knowing it, worked two blocks from the World Trade Center, and moved away one month before 9/11. His story is American history told from the inside.',
};
