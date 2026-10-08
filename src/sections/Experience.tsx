interface ExperienceItem {
  id: string
  title: string
  organization: string
  period: string
}

// Resume-supported experience only — no fabricated responsibilities or achievements.
const experience: ExperienceItem[] = [
  {
    id: 'aitsi',
    title: 'Full Stack Web Development Intern',
    organization: 'Amerasia International Terminal Services, Inc. (AITSI)',
    period: 'Feb 2026 – May 2026',
  },
  {
    id: 'brandcom',
    title: 'Computer Technician Intern / Helper',
    organization: 'BrandCom Computer Store',
    period: 'Jun 2023 – Jul 2023',
  },
]

export function Experience() {
  return (
    <section id="experience" className="px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold tracking-tight text-lavender sm:text-4xl">
          Experience
        </h2>

        <ol className="mt-10 flex flex-col gap-6 border-l border-steel/40 pl-6">
          {experience.map((item) => (
            <li key={item.id}>
              <h3 className="text-lg font-medium text-lavender">{item.title}</h3>
              <p className="text-lavender/70">{item.organization}</p>
              <p className="mt-1 text-sm text-lavender/65">{item.period}</p>
              {/* TODO: add a short description of responsibilities and impact once approved. */}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
