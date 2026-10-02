export const workshop = {
  title: 'LLM Agents Under Threat in Cyberspace',
  shortTitle: 'Agents Under Threat',
  status: 'AAAI-27 Workshop',
  date: 'February 22 or 23, 2027',
  location: 'Montréal, Canada',
  format: 'Full-day, in person',
  contact: 'xinfeng.li@polyu.edu.hk',
  summary:
    'A focused forum for understanding how autonomous language-model agents fail under adversarial pressure—and how to build systems that remain reliable when inputs, tools, and collaborators cannot be trusted.',
};

export const researchQuestions = [
  {
    index: '01',
    title: 'What enters the agent?',
    text: 'How do prompt injection, poisoned observations, deceptive memory, and multimodal inputs redirect an agent before it ever acts?',
    tag: 'Input channels',
  },
  {
    index: '02',
    title: 'What can the agent reach?',
    text: 'How do tools, APIs, permissions, browsers, code execution, and external services turn language-model mistakes into consequential actions?',
    tag: 'Tool use',
  },
  {
    index: '03',
    title: 'Who can the agent trust?',
    text: 'How do coordination, delegation, identity, and communication failures propagate across multi-agent systems?',
    tag: 'Coordination',
  },
];

export const cfpTopics = [
  {
    number: '01',
    title: 'Direct and indirect prompt injection',
    text: 'Attacks that use user inputs, retrieved content, web pages, documents, messages, or other untrusted context to redirect agent behavior.',
  },
  {
    number: '02',
    title: 'Adversarial observations and context manipulation',
    text: 'Deceptive environmental feedback, context corruption, instruction conflicts, and attacks on an agent’s perception of its state or goals.',
  },
  {
    number: '03',
    title: 'Memory and retrieval poisoning',
    text: 'Persistent compromise through long-term memory, retrieval systems, knowledge bases, cached interactions, and cross-session state.',
  },
  {
    number: '04',
    title: 'Multimodal attacks against agents',
    text: 'Manipulation delivered through images, audio, video, interfaces, documents, and mixed-modality observations.',
  },
  {
    number: '05',
    title: 'Tool and privilege misuse',
    text: 'Exploitation of browsers, code execution, APIs, credentials, permissions, external services, and action-planning pipelines.',
  },
  {
    number: '06',
    title: 'Multi-agent security',
    text: 'Compromised agents, trust and identity, adversarial coordination, collusion, delegation failures, and cascading failures in agent ecosystems.',
  },
  {
    number: '07',
    title: 'Secure agent architectures',
    text: 'Isolation, sandboxing, least privilege, safe tool interfaces, policy enforcement, capability control, and secure-by-design orchestration.',
  },
  {
    number: '08',
    title: 'Monitoring, provenance, and recovery',
    text: 'Runtime detection, audit trails, provenance tracking, incident response, rollback, recovery, and effective human oversight.',
  },
  {
    number: '09',
    title: 'Evaluation and benchmarking',
    text: 'Realistic threat models, red-teaming methods, environments, metrics, datasets, reproducible benchmarks, and end-to-end evaluations.',
  },
  {
    number: '10',
    title: 'Responsible deployment and disclosure',
    text: 'Operational lessons, deployment safeguards, defense limitations, vulnerability coordination, and responsible disclosure practices.',
  },
];

export const importantDates = [
  { label: 'Submission deadline', value: 'November 20, 2026', note: 'Anywhere on Earth' },
  { label: 'Acceptance notification', value: 'December 2, 2026', note: 'Author notification' },
  { label: 'Camera-ready', value: 'January 15, 2027', note: 'Final version due' },
  { label: 'Workshop', value: 'February 22 or 23, 2027', note: 'In person · Montréal' },
];

export const schedule = [
  { time: '09:00–09:15', title: 'Opening remarks', type: 'Welcome' },
  { time: '09:15–10:00', title: 'Keynote 1', type: 'Keynote' },
  { time: '10:00–10:30', title: 'Paper session 1', type: 'Research' },
  { time: '10:30–11:00', title: 'Coffee break', type: 'Break' },
  { time: '11:00–11:30', title: 'Invited talk 1', type: 'Invited talk' },
  { time: '11:30–12:30', title: 'Paper session 2', type: 'Research' },
  { time: '12:30–14:00', title: 'Lunch break', type: 'Break' },
  { time: '14:00–14:45', title: 'Keynote 2', type: 'Keynote' },
  { time: '14:45–15:30', title: 'Paper session 3', type: 'Research' },
  { time: '15:30–16:00', title: 'Coffee break & poster session', type: 'Poster' },
  { time: '16:00–16:30', title: 'Invited talk 2', type: 'Invited talk' },
  { time: '16:30–17:10', title: 'Panel discussion', type: 'Panel' },
  { time: '17:10–17:15', title: 'Closing remarks & award', type: 'Closing' },
];

export const speakers = [
  { name: 'Wenyuan Xu', affiliation: 'Zhejiang University', role: 'Keynote 1', initials: 'WX' },
  { name: 'Bo Li', affiliation: 'University of Chicago', role: 'Keynote 2', initials: 'BL' },
  { name: 'Nicolas Papernot', affiliation: 'University of Toronto · Vector Institute', role: 'Invited talk 1', initials: 'NP' },
  { name: 'Niloofar Mireshghallah', affiliation: 'University of Washington', role: 'Invited talk 2', initials: 'NM' },
];

export const organizers = [
  { name: 'Xinfeng Li', affiliation: 'The Hong Kong Polytechnic University', role: 'General Chair · Main Contact', image: '/people/xinfeng-li.png', imageAvailable: true },
  { name: 'Aditi Raghunathan', affiliation: 'Carnegie Mellon University', role: 'Program Chair', image: '/people/rag.jpg', imageAvailable: false },
  { name: 'Xinyue Shen', affiliation: 'University of Waterloo', role: 'Local Arrangements · Publications', image: '/people/shen.jpg', imageAvailable: false },
  { name: 'Wenbo Pan', affiliation: 'City University of Hong Kong', role: 'Publicity', image: '/people/pan.jpg', imageAvailable: false },
];

export const advisers = [
  { name: 'Florian Tramèr', affiliation: 'ETH Zürich', role: 'Advisory Board' },
  { name: 'Neil Gong', affiliation: 'Duke University', role: 'Advisory Board' },
  { name: 'Virginia Smith', affiliation: 'Carnegie Mellon University', role: 'Advisory Board' },
  { name: 'Tongliang Liu', affiliation: 'The University of Sydney', role: 'Advisory Board' },
  { name: 'Z. Jane Wang', affiliation: 'The University of British Columbia', role: 'Advisory Board' },
  { name: 'Junhao Dong', affiliation: 'Nanyang Technological University', role: 'Advisory Board' },
];

export const submissionPolicy = {
  format: 'Full papers up to 7 pages, excluding references. Shorter papers are welcome.',
  style: 'AAAI two-column format.',
  review: 'Single-blind, with at least two reviews and a third review for borderline submissions.',
  publication: 'Non-archival. Authors retain the ability to submit expanded work elsewhere.',
  disclosure: 'Responsible disclosure is expected for work involving real systems or vulnerabilities.',
  destination: 'Submission instructions will be announced soon.',
};
