import { IdentityPanel } from './IdentityPanel'
import { Portrait } from './Portrait'

export function Hero() {
  return (
    <section id="about" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_30%_20%,var(--color-steel)_0%,transparent_60%)] opacity-20 blur-3xl"
      />
      <div className="grid flex-1 items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-24">
        <Portrait />
        <IdentityPanel />
      </div>
    </section>
  )
}
