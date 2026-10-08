import type { SkillCategory } from '../data/techStack'
import { skills } from '../data/techStack'

const CATEGORY_ORDER: SkillCategory[] = [
  'Frontend Development',
  'Backend Development',
  'Databases',
  'Tools & Platforms',
  'Hardware & Embedded',
  'Networking',
]

export function Skills() {
  return (
    <section id="skills" className="px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold tracking-tight text-lavender sm:text-4xl">Skills</h2>
        <p className="mt-2 max-w-prose text-lavender/65">
          The complete resume-supported skill set, by category. The hero's animated field above
          shows a curated selection from this list, not a replacement for it.
        </p>

        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          {CATEGORY_ORDER.map((category) => (
            <div key={category}>
              <h3 className="text-sm font-medium tracking-wide text-lavender/65 uppercase">{category}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <li
                      key={skill.id}
                      className="flex items-center gap-2 rounded-full border border-steel/40 bg-midnight/40 px-3 py-1.5 text-sm text-lavender"
                    >
                      {skill.icon && <img src={skill.icon} alt="" className="h-4 w-4" />}
                      {skill.name}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
