import portraitSrc from '../../assets/portrait/allen-portrait.png'
import { TechField } from './TechField'

export function Portrait() {
  return (
    <div className="relative isolate mx-auto aspect-2/3 w-full max-w-md sm:max-w-lg lg:max-w-xl">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,var(--color-steel)_0%,var(--color-midnight)_55%,transparent_75%)] opacity-45 blur-3xl"
      />
      <TechField />
      <img
        src={portraitSrc}
        alt="Portrait of Allen Jake Lavina"
        width={407}
        height={612}
        fetchPriority="high"
        className="relative z-10 h-full w-full object-contain object-bottom"
      />
    </div>
  )
}
