import { heroField } from '../../data/heroField'

export function IdentityPanel() {
  return (
    <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-lavender sm:text-5xl lg:text-6xl">
          Allen Jake Lavina
        </h1>
        <p className="mt-3 text-lg text-lavender/65 sm:text-xl">Full Stack Developer</p>
      </div>

      {/* TODO: replace with an approved 1–2 sentence introduction. */}
      <p className="max-w-prose text-base text-lavender/80 sm:text-lg">
        TODO: short introduction — add 1–2 sentences about your focus and what you build.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
        <a
          href="#projects"
          className="rounded-full bg-lavender px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender"
        >
          View My Work
        </a>
        <a
          href="#contact"
          className="rounded-full border border-steel px-6 py-3 text-sm font-medium text-lavender transition-colors hover:border-lavender focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender"
        >
          Get In Touch
        </a>
      </div>

      {/*
        Accessible, non-animated confirmation of what's in the decorative
        technology field (design.md § 13) — the field itself is aria-hidden,
        so this is the one source every user (and screen reader) can rely on.
        The complete skill set lives in the Skills section below; this is
        just what's animating in this specific scene.
      */}
      <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-lavender/65 lg:justify-start">
        {heroField.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}
