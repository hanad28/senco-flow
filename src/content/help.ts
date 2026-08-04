/** Factual public help topics for the pilot-stage Unisen website. */
export const HELP_TOPICS = [
  {
    id: "pilot-and-walkthroughs",
    title: "Pilot and walkthroughs",
    description: "Start with the current pilot-stage product and talk through your context.",
    entries: [
      {
        id: "what-is-unisen",
        question: "What is Unisen?",
        answer:
          "Unisen is building SEND coordination software to help schools and families manage EHC processes more clearly. It is currently in pilot validation.",
        links: [
          {
            href: "/product",
            label: "Product overview",
            description: "See the public overview of Unisen.",
          },
        ],
      },
      {
        id: "see-unisen-or-ask-a-question",
        question: "How can I see Unisen or ask a question?",
        answer:
          "Book a 15-min walkthrough to talk through your context, or email enquiries@unisen.uk.",
        links: [
          {
            href: "/contact",
            label: "Contact and walkthroughs",
            description: "Book a 15-min walkthrough or email the team.",
          },
        ],
      },
    ],
  },
  {
    id: "latest-notes",
    title: "Latest notes",
    description: "Follow product updates and notes from building Unisen.",
    entries: [
      {
        id: "follow-unisen-blog",
        question: "Where can I read Unisen's public notes?",
        answer: "Read the Blog for notes from building Unisen.",
        links: [
          {
            href: "/blog",
            label: "Blog",
            description: "Read the latest public notes.",
          },
        ],
      },
      {
        id: "follow-unisen-changelog",
        question: "Where can I see shipped product updates?",
        answer: "See recent product updates in the Changelog.",
        links: [
          {
            href: "/changelog",
            label: "Changelog",
            description: "Browse recent product updates.",
          },
        ],
      },
    ],
  },
  {
    id: "privacy-and-safe-enquiries",
    title: "Privacy and safe enquiries",
    description:
      "Understand the current website notice and keep sensitive case details out of forms.",
    entries: [
      {
        id: "safe-website-enquiry",
        question: "What should I include in a website enquiry?",
        answer:
          "Please don't include children's names or sensitive case details in web forms. The Website Privacy Notice explains current handling of website enquiries and demo snapshots.",
        links: [
          {
            href: "/privacy",
            label: "Website Privacy Notice",
            description: "Read how website enquiries and demo snapshots are handled.",
          },
        ],
      },
    ],
  },
] as const;

export type HelpTopic = (typeof HELP_TOPICS)[number];
export type HelpEntry = HelpTopic["entries"][number];
export type HelpLink = HelpEntry["links"][number];

export const HELP_ENTRY_COUNT = HELP_TOPICS.reduce(
  (total, topic) => total + topic.entries.length,
  0,
);

export function searchHelpTopics(query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  return HELP_TOPICS.flatMap((topic) =>
    topic.entries.flatMap((entry) => {
      const matchingLinks = entry.links.filter((link) =>
        [link.label, link.description].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        ),
      );
      const textMatches = [topic.title, topic.description, entry.question, entry.answer].some(
        (value) => value.toLowerCase().includes(normalizedQuery),
      );

      if (!textMatches && matchingLinks.length === 0) return [];
      return [{ topic, entry, links: matchingLinks.length > 0 ? matchingLinks : entry.links }];
    }),
  );
}
