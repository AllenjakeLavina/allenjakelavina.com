interface ProjectItem {
  id: string
  name: string
  tagline: string
}

// Resume-supported projects only — no fabricated descriptions, tech stacks, or links.
const projects: ProjectItem[] = [
  { id: 'servicelink', name: 'ServiceLink', tagline: 'Job Matching Platform for Skilled Labor' },
  { id: 'wisewaysva', name: 'WisewaysVA', tagline: 'Employee Portal System' },
]

export function Projects() {
  return (
    <section id="projects" className="px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold tracking-tight text-lavender sm:text-4xl">Projects</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="rounded-2xl border border-steel/40 bg-midnight/40 p-6"
            >
              <h3 className="text-xl font-medium text-lavender">{project.name}</h3>
              <p className="mt-2 text-lavender/70">{project.tagline}</p>
              {/* TODO: add a short description, tech stack, and links once approved. */}
              <p className="mt-4 text-sm text-lavender/65">
                TODO: add a short description, tech stack, and links.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
