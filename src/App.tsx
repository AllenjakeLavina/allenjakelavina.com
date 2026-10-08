import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero/Hero'
import { NavBar } from './sections/NavBar'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_120%_60%_at_50%_0%,var(--color-midnight)_0%,var(--color-navy)_45%,var(--color-ink)_80%)] text-lavender">
      <NavBar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  )
}

export default App
