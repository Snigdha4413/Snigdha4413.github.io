/* Edit this file to change project text. Put your real repo / live links in `link`. */
const GH = 'https://github.com/Snigdha4413';
const PROJECTS = [
  { id: 'secret-sharing', title: 'Secret Sharing', tag: 'Published paper · ACT 2026', seed: 11,
    pal: ['#1f9aa8','#2b3aa8','#150f45','#0b0b2e','#f6d55c'], stack: ['Python','SHA-256','Tkinter'],
    blurb: 'Split a document into shares. Any k of n rebuild it, and tampered shares are caught first.',
    story: 'Shamir\'s (k,n) threshold scheme splits a document into n shares so that any k of them rebuild it. Each share carries its own SHA-256 authentication, so a tampered share is rejected before reconstruction. A Tkinter GUI wraps it. Team of 4.',
    stats: ['100% reconstruction accuracy','Under 6% share-size overhead'],
    note: 'Published at the 17th International Conference on Advances in Computing, Control, and Telecommunication Technologies (ACT 2026), Scopus-indexed, ID 2-s2.0-105047234934.', links: [{ label: 'View on GitHub', url: 'https://github.com/Snigdha4413/Document-Secret-Sharing-System' }] },
  { id: 'course-scheduler', title: 'Timetable Agents', tag: 'Agentic AI', seed: 23,
    pal: ['#ee9fd0','#b58be0','#2b3aa8','#150f45','#fff1b8'], stack: ['Python','Q-Learning','Streamlit'],
    blurb: 'Department and room agents learn to negotiate university timetables with no clashes.',
    story: 'Department and room agents learn to negotiate conflict-free timetables. I built the department agents, with legal-action masking so room, faculty and student-group clashes are impossible by construction. Deployed as a Streamlit app with CSV import, presets and downloadable timetables.',
    stats: ['About 33% fewer clashes than greedy (18.9 vs 28.2)','Benchmarked over 5 seeds at 75% grid load'], note: '', links: [{ label: 'View on GitHub', url: 'https://github.com/Snigdha4413/Timetable-agents' }] },
  { id: 'spotify-markov', title: 'Spotify as a Markov Chain', tag: 'Statistics', seed: 37,
    pal: ['#f6d55c','#ff9a6b','#ee6f9f','#7a3fb0','#fff6d0'], stack: ['JavaScript','Chart.js'],
    blurb: 'Listening history as four states: Library, Discovery, Ad and Offline.',
    story: 'Streaming history modelled as a 4-state Markov chain (Library, Discovery, Ad, Offline). It computes transition matrices and stationary distributions, then checks them with Monte Carlo simulation. Absorbing-chain analysis estimates expected session length and ad exposure, with an ad-frequency sensitivity model and a multi-user benchmark.',
    stats: ['4 states, stationary distribution verified by simulation'], note: '', link: '' },
  { id: 'survey-analysis', title: 'Survey Data, Decoded', tag: 'Statistics', seed: 41,
    pal: ['#9be0d0','#4fb8c0','#1f6fa8','#2b3aa8','#ffe9a0'], stack: ['Python','Pandas','Statsmodels','Streamlit'],
    blurb: 'Real survey data, cleaned and tested, then packaged as an interactive app.',
    story: 'Cleaned and augmented real survey data, then applied hypothesis testing, ANOVA, MANOVA and linear regression to draw inferences. The whole analysis is packaged as an interactive Streamlit application.',
    stats: ['Hypothesis tests, ANOVA, MANOVA, regression'], note: '', links: [{ label: 'Open the live app', url: 'https://ssdiproject-3usqzjl8573g96rlh6ye6r.streamlit.app/' }] }
];
