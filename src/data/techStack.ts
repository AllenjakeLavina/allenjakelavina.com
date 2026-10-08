import amazonawsIcon from '../assets/tech/amazonaws.svg'
import angularjsIcon from '../assets/tech/angularjs.svg'
import arduinoIcon from '../assets/tech/arduino.svg'
import csharpIcon from '../assets/tech/csharp.svg'
import css3Icon from '../assets/tech/css3.svg'
import fastapiIcon from '../assets/tech/fastapi.svg'
import flutterIcon from '../assets/tech/flutter.svg'
import gitIcon from '../assets/tech/git.svg'
import githubIcon from '../assets/tech/github.svg'
import html5Icon from '../assets/tech/html5.svg'
import javaIcon from '../assets/tech/java.svg'
import mongodbIcon from '../assets/tech/mongodb.svg'
import mysqlIcon from '../assets/tech/mysql.svg'
import nodejsIcon from '../assets/tech/nodedotjs.svg'
import phpIcon from '../assets/tech/php.svg'
import postgresqlIcon from '../assets/tech/postgresql.svg'
import pythonIcon from '../assets/tech/python.svg'
import raspberrypiIcon from '../assets/tech/raspberrypi.svg'
import reactIcon from '../assets/tech/react.svg'
import renderIcon from '../assets/tech/render.svg'
import svelteIcon from '../assets/tech/svelte.svg'
import typescriptIcon from '../assets/tech/typescript.svg'
import vercelIcon from '../assets/tech/vercel.svg'
import vuedotjsIcon from '../assets/tech/vuedotjs.svg'

export type SkillCategory =
  | 'Frontend Development'
  | 'Backend Development'
  | 'Databases'
  | 'Tools & Platforms'
  | 'Hardware & Embedded'
  | 'Networking'

export interface SkillItem {
  id: string
  name: string
  category: SkillCategory
  /** Vite-resolved URL of the technology's local SVG mark — omitted where no recognizable official mark applies (see design note in Skills section). */
  icon?: string
}

/**
 * Complete resume-supported skill set, organized by category for the Skills
 * section. This is the full pool — the hero's animated technology field
 * (src/data/heroField.ts) draws a curated subset from the items that have an
 * `icon`, it does not define the skill set itself.
 */
export const skills: SkillItem[] = [
  // Frontend Development
  { id: 'html', name: 'HTML', category: 'Frontend Development', icon: html5Icon },
  { id: 'css', name: 'CSS', category: 'Frontend Development', icon: css3Icon },
  { id: 'angularjs', name: 'AngularJS', category: 'Frontend Development', icon: angularjsIcon },
  { id: 'svelte', name: 'Svelte', category: 'Frontend Development', icon: svelteIcon },
  { id: 'vuejs', name: 'Vue.js', category: 'Frontend Development', icon: vuedotjsIcon },
  { id: 'react', name: 'React', category: 'Frontend Development', icon: reactIcon },
  { id: 'flutter', name: 'Flutter', category: 'Frontend Development', icon: flutterIcon },

  // Backend Development
  { id: 'nodejs', name: 'Node.js', category: 'Backend Development', icon: nodejsIcon },
  { id: 'java', name: 'Java', category: 'Backend Development', icon: javaIcon },
  { id: 'php', name: 'PHP', category: 'Backend Development', icon: phpIcon },
  { id: 'csharp', name: 'C#', category: 'Backend Development', icon: csharpIcon },
  { id: 'typescript', name: 'TypeScript', category: 'Backend Development', icon: typescriptIcon },
  { id: 'python', name: 'Python', category: 'Backend Development', icon: pythonIcon },
  { id: 'fastapi', name: 'FastAPI', category: 'Backend Development', icon: fastapiIcon },

  // Databases
  { id: 'mysql', name: 'MySQL', category: 'Databases', icon: mysqlIcon },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Databases', icon: postgresqlIcon },
  { id: 'mongodb', name: 'MongoDB', category: 'Databases', icon: mongodbIcon },

  // Tools & Platforms
  { id: 'git', name: 'Git', category: 'Tools & Platforms', icon: gitIcon },
  { id: 'github', name: 'GitHub', category: 'Tools & Platforms', icon: githubIcon },
  { id: 'aws', name: 'AWS', category: 'Tools & Platforms', icon: amazonawsIcon },
  { id: 'render', name: 'Render', category: 'Tools & Platforms', icon: renderIcon },
  { id: 'vercel', name: 'Vercel', category: 'Tools & Platforms', icon: vercelIcon },

  // Hardware & Embedded
  { id: 'pc-assembly', name: 'PC Assembly & Maintenance', category: 'Hardware & Embedded' },
  { id: 'desktops-laptops', name: 'Desktops & Laptops', category: 'Hardware & Embedded' },
  { id: 'arduino', name: 'Arduino', category: 'Hardware & Embedded', icon: arduinoIcon },
  { id: 'raspberry-pi', name: 'Raspberry Pi', category: 'Hardware & Embedded', icon: raspberrypiIcon },

  // Networking
  { id: 'routers', name: 'Routers', category: 'Networking' },
  { id: 'switches', name: 'Switches', category: 'Networking' },
  { id: 'cabling', name: 'Cabling', category: 'Networking' },
  { id: 'wifi-setup', name: 'Wi-Fi Setup', category: 'Networking' },
]
