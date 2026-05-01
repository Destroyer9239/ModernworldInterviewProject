export interface StorySection {
  id: string;
  index: number;
  era: string;
  years: string;
  title: string;
  interviewQuestion: string;
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
    interviewQuestion: 'What are your earliest memories of being the son of a Navy fighter pilot?',
    context:
      'An era marked by intense non-violent battle between the U.S. and the Soviet Union, leading to proxy wars across the globe. Steve Simpson was born in 1967 -- right in the middle of it -- as the son of a Navy fighter pilot.',
    findings: [
      'Steve\'s earliest memories were of his father being gone for long periods of time as a Navy fighter pilot.',
      '"You don\'t really get a perspective as a kid. You just know that there\'s tension in the world, and you know your father\'s been gone."',
      'It was the stress constantly brought into the house that defined those early years -- not words, just a weight the whole family carried.',
      'His parents divorced when Steve was around six years old.',
      'As Steve grew older -- hitting 8, 9, 10 -- he became more aware of the divide between military families and the civilian world around him.',
      'The military felt they had done what they were asked to do. They weren\'t allowed to fight the war on their terms -- and then they came home.',
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
    interviewQuestion: 'Was your father ever deployed? How was the atmosphere at home while he was gone -- and when he was there?',
    context:
      'Vietnam was almost a quiet war. You were in the military, you knew about it, but the civilian world kept its distance. The U.S. Navy projected power from aircraft carriers while families at home listened to the President on the radio.',
    findings: [
      'Steve\'s father flew on the very first strike of the Vietnam War, deployed on an aircraft carrier.',
      '"I remember my mom hearing the President announce it." Steve has since found and read the actual news article from that day.',
      'On the very first day of strikes, his father came running back to the ship, was sent on patrol, and flew that mission.',
      'The family lived near base but not on it. They would visit Steve\'s father and be on the base regularly.',
      'From the 1970s through the 1980s, the phrase "Thank you for your service" simply did not exist.',
      '"The military did their best. They fought a war, but they didn\'t feel supported -- and then they went home and had kids like me."',
      'Vietnam created a permanent rift between the military and civilians that would take decades to heal.',
    ],
    quote: '"On the very first day, he came running back, was sent on patrol -- and was in the air."',
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
    interviewQuestion: 'Did you move bases? Were there drills in your area? What were they like?',
    context:
      'Reagan brought the country\'s confidence back up. The face-down with Russia defined the decade -- and for kids growing up near Coronado Naval Air Station in San Diego, the Cold War was never just an abstraction.',
    findings: [
      'Steve grew up in San Diego near Coronado Naval Air Station. The family did not live on base, but they visited and were part of the base world.',
      'Schools ran "duck, cover, and run" drills. Families were taught to wear layers of clothing and keep covered food ready for a radiation blast.',
      '"You were in too many circles. Duck, cover, run -- didn\'t really matter." The children understood the futility.',
      'After his parents divorced, Steve and his brother had a custody agreement to visit their father in Montana.',
      '"I did not know that while I\'m visiting Montana, he\'s actually working at NORAD." His father was stationed inside Cheyenne Mountain -- one of the most classified command centers in the world.',
      'Reagan\'s presidency marked a decisive shift: the projection of force and power rebuilt national confidence after the weakness of the Ford and Carter years.',
    ],
    quote: '"Reagan really brought the country\'s confidence up."',
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
    interviewQuestion: 'How were the presidents at the time of the Cold War? Were there any who drastically changed your life?',
    context:
      'Growing up as the son of a military pilot gave Steve a front-row view of each presidency -- not through party politics, but through the one lens that mattered to a Navy family: strength, confidence, and the projection of American power.',
    findings: [
      'FORD: Took over after Nixon resigned. "We didn\'t feel strength and power. I felt like we were weak." Ford spoke but had no force.',
      'CARTER: The nation continued to feel vulnerable. Steve grew up watching presidents who seemed unable to project the power that military families expected.',
      'REAGAN: "The projection of force and power, the confidence -- Reagan really brought the country\'s confidence up." A decisive turning point for the nation.',
      'BUSH SR.: A good president, but without the commanding force of Reagan. The momentum of confidence began to soften.',
      'CLINTON: "He gave Saturday Night Live a lot of skits, let\'s put it that way." A period of prosperity but diminished projection of force.',
      'BUSH JR.: "A lot of Saturday Night Live skits." The second Bush faced 9/11 and launched the War on Terror -- shaping the world that followed.',
      'Steve considered joining the military himself -- "It was actually ultra-competitive" -- but ultimately chose a college degree. Life took a different path.',
    ],
    quote: '"I\'m not speaking politically as Democrat or Republican -- I\'m speaking as a kid growing up. We didn\'t feel strength and power."',
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
    interviewQuestion: 'The Cold War ended when you were in your early 20s. How did feelings and the atmosphere change?',
    context:
      'After Desert Storm and the Soviet collapse, the United States stood as the sole world power. A dangerous sense of invincibility settled in -- we had bankrupted Russia and seemed untouchable. Then Steve visited Moscow in 1997 and saw the truth.',
    findings: [
      'Russia invaded Afghanistan; the U.S. countered by sending Stinger missiles to the Mujahideen -- a proxy war in reverse, the Cold War\'s last move.',
      'Desert Storm and Desert Shield were pivotal: they reunited American civilians and the military after decades of division. The country came back together.',
      'Post-Desert Storm, the U.S. felt "truly the world power." Russia was collapsing. China was not yet a threat.',
      'In 1997, Steve flew to Moscow on United Airlines. When the plane door opened, he saw firsthand how economically broken Russia had become.',
      '"They were down. Economically, power-wise, they were weak." The Soviet threat Steve had grown up fearing was gone.',
      'China "wasn\'t what it is now" -- the geopolitical landscape of the late 1990s was shaped by a single, unchallenged superpower.',
      'This sense of invincibility -- we are untouchable -- is what made 9/11 so utterly shattering.',
    ],
    quote: '"We were truly the world power. Russia was now weak. And then... 9/11."',
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
    interviewQuestion: 'Where were you on 9/11? What was it like before the planes hit -- and how did it impact you and the people around you?',
    context:
      'September 11, 2001 permanently transformed national security and global warfare. For Steve Simpson, it was also deeply personal -- he had missed the attack by exactly one month, and watched the second tower fall live on television from Los Angeles.',
    findings: [
      'Steve had lived in New York City for years. In August 2001, he moved to San Diego for a computer project -- one month before the attacks.',
      '"By a month\'s difference, I would\'ve been living in New York." His daily office was two blocks from the World Trade Center.',
      'He watched the second tower collapse live on TV from a client\'s hotel room in Los Angeles.',
      'One of the hijacked planes was targeting Los Angeles -- where Steve now was. The proximity was not lost on him.',
      '"It was unprecedented." For three, four, five days, not a single aircraft flew over the United States. The nation was frozen.',
      'When planes finally returned to the sky days later, a single aircraft passing over the freeway stopped traffic. People stared upward in fear.',
      'Being the son of a military pilot shaped his reaction: the country had gone from feeling untouchable to wanting to immediately "punch back" -- a rush to action Steve reflects on with complexity.',
    ],
    quote: '"I remember being in LA and going, Oh my God, watching that second tower come down live on TV. And then living for days with no air traffic and fear."',
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
    interviewQuestion: 'If you had to pick one specific memory about all of this -- the most important one -- what would it be and why?',
    context:
      'History is not just read in books -- it is lived through the people who carried it. The biggest memory Steve took from a lifetime shaped by war was not a battle, a president, or an attack. It was a conversation.',
    findings: [
      'Only in recent years did Steve sit down with his father for a true man-to-man talk about the Vietnam War.',
      'His father had kept his experiences private for decades. Steve was still a child during the war -- some things simply could not be said then.',
      'They talked candidly about what his father went through: the missions, the killing, the weight of it all.',
      '"Seeing the human -- truly seeing the human." Steve describes finally understanding what his father did and who he was beneath the uniform.',
      '"It was a complete understanding on both sides." Not father to child -- but man to man.',
      'This conversation finally healed the rift that had existed between the pilot and his son for decades.',
      'The takeaway of the entire interview: history is lived through people, not books. Every era has a human face -- and sometimes you have to wait decades to see it clearly.',
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

export const SUBJECT_BIO = {
  name: 'Steve Simpson',
  dob: '1967',
  location: 'United States',
  connection: 'Son of a Navy Fighter Pilot',
  context:
    'Born in 1967 -- the middle of the Cold War and the Vietnam War -- Steve Simpson grew up watching his father fly missions, visited NORAD without knowing it, worked two blocks from the World Trade Center, and moved away one month before 9/11. His story is American history told from the inside.',
};
