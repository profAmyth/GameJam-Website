// Site configuration. Replace placeholder values before deploying.
// Never put real secret API keys here -- Formspree form IDs are public-safe
// (they only accept submissions, they can't be used to read data), but keep
// this file out of source control if you ever add anything more sensitive.

const SITE_CONFIG = {
  // Create a form at https://formspree.io and paste its endpoint below.
  FORMSPREE_ENDPOINT: "https://formspree.io/f/YOUR_FORM_ID",

  EVENT_NAME: "HackJam CU",
  EVENT_DATE_ISO: "2027-07-04T09:00:00+05:30", // kickoff time, IST
  TEAM_SIZE_MIN: 2,
  TEAM_SIZE_MAX: 4,

  // Fake starting count for the "teams registered" display (demo only).
  COUNTER_BASE: 128,
};
