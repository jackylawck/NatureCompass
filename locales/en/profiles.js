/**
 * locales/en/profiles.js - Behavioral Traits & Style Exploration Profiles Dictionary
 * License: CC BY-NC-SA 4.0 (Non-Commercial, ShareAlike)
 * 
 * 【Key Convention】
 * Archetype keys strictly follow alphabetical order (C < D < I < S):
 * - Dual Dimensions (6): CD, CI, CS, DI, DS, IS
 * - Triple Dimensions (4): CDI, CDS, CIS, DIS
 * - Quad Balanced (1): CDIS
 * Consumers must normalize primary dimensions via:
 * const archetypeKey = [...primary].sort().join('');
 */

export default {
  traits: {
    D: {
      name: "Drive / Challenge",
      tagline: "Goal-Driven · Decisive · Pioneering",
      strengths: "Decisive in ambiguous or high-pressure situations, overcoming obstacles to achieve tangible results.",
      blindspots: "May overlook peers' emotional bandwidth and procedural subtleties under speed pressure; risks appearing impatient.",
      coaching_tips: "Deliberately pause before making final calls, listen to alternative perspectives, and create autonomy space for teammates."
    },
    I: {
      name: "Influence / Inspiration",
      tagline: "Contagious Energy · Visionary · Collaborative Catalyst",
      strengths: "Fosters open and vibrant collaboration, articulates compelling visions, and rallies diverse stakeholders effectively.",
      blindspots: "May tire of routine operational tasks and granular data audits; follow-through can suffer without structure.",
      coaching_tips: "Institute clear tracking mechanisms and milestones to convert creative enthusiasm into disciplined, measurable impact."
    },
    S: {
      name: "Steadiness / Pace",
      tagline: "Enduring Support · Dependable · Cultural Anchor",
      strengths: "Prioritizes long-term operational harmony and relational trust; provides patient, steadfast backing as a dependable pillar.",
      blindspots: "Tends to resist sudden abrupt shifts or interpersonal friction; may suppress personal viewpoints to preserve harmony.",
      coaching_tips: "Practice expressing personal boundaries and counter-arguments actively, viewing adaptation as essential for resilience."
    },
    C: {
      name: "Compliance / Precision",
      tagline: "Objective · Standards-Oriented · Thorough",
      strengths: "Anchored in empirical logic and rigorous benchmarks; establishes robust error-prevention frameworks ensuring dependable outputs.",
      blindspots: "Perfectionism may slow decision cadence and risk missing critical opportunity windows in dynamic environments.",
      coaching_tips: "Embrace the reality that 'done is better than perfect' when risks are bounded, allowing agile, iterative improvements."
    }
  },
  archetypes: {
    // --- Dual Dimensions (6) ---
    CD: {
      title: "Strategic Architect",
      desc: "Pursues ambitious breakthroughs via airtight analytical rigor; builds high-performance operating models with precision."
    },
    CI: {
      title: "Persuasive Evaluator",
      desc: "Synthesizes expressive insights with disciplined deduction; transforms complex concepts into structured persuasive cases."
    },
    CS: {
      title: "Conscientious Anchor",
      desc: "Dedicated, methodical, and profoundly loyal; the ultimate guardian of uncompromising quality benchmarks and continuity."
    },
    DI: {
      title: "Trailblazing Promoter",
      desc: "Blends assertive drive with magnetic charisma; adept at opening new strategic frontiers while inspiring collective momentum."
    },
    DS: {
      title: "Resilient Implementer",
      desc: "Combines purposeful focus with calm tenacity; moves forward decisively while safeguarding baseline operational integrity."
    },
    IS: {
      title: "Harmonizing Connector",
      desc: "Highly empathetic and socially attuned; excels at soothing friction and cementing authentic organizational cohesion."
    },

    // --- Triple Dimensions (4) ---
    CDI: {
      title: "Catalytic Reformer",
      desc: "Drives assertive action grounded in objective rigor and persuasion, maintaining low compromise on standard delivery."
    },
    CDS: {
      title: "Pragmatic Executor",
      desc: "Disciplined, results-focused, and paced; executes robustly through actions rather than public social posturing."
    },
    CIS: {
      title: "Inclusive Collaborator",
      desc: "Combines cohesion, analytical thoroughness, and steady pacing, favoring consensus over aggressive competitive posturing."
    },
    DIS: {
      title: "Dynamic Motivator",
      desc: "Energetic, highly communicative, and collaborative; highly adaptive without being constrained by rigid protocols."
    },

    // --- Quad Balanced (1) ---
    CDIS: {
      title: "Contextual Adapter",
      desc: "Evenly balanced across all four preferences, showing dynamic fluidity to shift stances depending on operational context."
    }
  }
};
