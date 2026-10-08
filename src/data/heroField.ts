import awsIcon from '../assets/tech/amazonaws.svg'
import githubIcon from '../assets/tech/github.svg'
import javaIcon from '../assets/tech/java.svg'
import mongodbIcon from '../assets/tech/mongodb.svg'
import nodejsIcon from '../assets/tech/nodedotjs.svg'
import postgresqlIcon from '../assets/tech/postgresql.svg'
import pythonIcon from '../assets/tech/python.svg'
import reactIcon from '../assets/tech/react.svg'
import typescriptIcon from '../assets/tech/typescript.svg'
import vuedotjsIcon from '../assets/tech/vuedotjs.svg'

/**
 * 'crossing'  — dynamically swaps between behind/in-front of the portrait as
 *               it travels (the depth illusion from design.md § 9).
 * 'back'      — stays behind the portrait for its whole loop: ambient,
 *               background presence.
 * 'front'     — stays in front of the portrait for its whole loop: a
 *               foreground accent.
 *
 * Mixing all three across the field is what gives the scene depth without
 * every item needing the full crossing mechanism — see TechField.css.
 */
export type OrbitDepthMode = 'crossing' | 'back' | 'front'

export interface HeroFieldItem {
  id: string
  name: string
  icon: string
  /** Offset of this item's own ellipse center from the stage center, in container query units. */
  centerX: string
  centerY: string
  radiusX: string
  radiusY: string
  durationSeconds: number
  /** 0–1 fraction of the duration, used as a negative animation-delay so items don't move in lockstep. */
  phase: number
  depthMode: OrbitDepthMode
  scaleBack: number
  scaleFront: number
  brightnessBack: number
  brightnessFront: number
  /** Whether this item stays visible/animating at the mobile cap (design.md § 15). */
  visibleOnMobile: boolean
}

/**
 * Hand-authored, fixed per-item configuration — deliberately NOT generated
 * with Math.random() or any per-render randomness, so the field is
 * deterministic and reproducible (same layout on every load and every
 * render). Each item has its own center offset, ellipse size, speed and
 * phase so the field reads as scattered trajectories rather than one shared
 * circle. A curated 10-item subset of the full skills pool (src/data/techStack.ts)
 * chosen for visual variety across frontend/backend/database/tooling — not a
 * claim that these 10 are more important than the rest of the resume.
 */
export const heroField: HeroFieldItem[] = [
  {
    id: 'react',
    name: 'React',
    icon: reactIcon,
    centerX: '0cqw',
    centerY: '0cqh',
    radiusX: '38cqw',
    radiusY: '15cqh',
    durationSeconds: 34,
    phase: 0,
    depthMode: 'crossing',
    scaleBack: 0.68,
    scaleFront: 1.22,
    brightnessBack: 0.55,
    brightnessFront: 1.15,
    visibleOnMobile: true,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: typescriptIcon,
    centerX: '-3cqw',
    centerY: '3cqh',
    radiusX: '33cqw',
    radiusY: '12cqh',
    durationSeconds: 27,
    phase: 0.15,
    depthMode: 'crossing',
    scaleBack: 0.72,
    scaleFront: 1.15,
    brightnessBack: 0.58,
    brightnessFront: 1.12,
    visibleOnMobile: true,
  },
  {
    id: 'python',
    name: 'Python',
    icon: pythonIcon,
    centerX: '9cqw',
    centerY: '-9cqh',
    radiusX: '16cqw',
    radiusY: '8cqh',
    durationSeconds: 46,
    phase: 0.4,
    depthMode: 'back',
    scaleBack: 0.5,
    scaleFront: 0.68,
    brightnessBack: 0.4,
    brightnessFront: 0.55,
    visibleOnMobile: true,
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: nodejsIcon,
    centerX: '1cqw',
    centerY: '-2cqh',
    radiusX: '36cqw',
    radiusY: '14cqh',
    durationSeconds: 22,
    phase: 0.55,
    depthMode: 'crossing',
    scaleBack: 0.7,
    scaleFront: 1.2,
    brightnessBack: 0.55,
    brightnessFront: 1.15,
    visibleOnMobile: false,
  },
  {
    id: 'java',
    name: 'Java',
    icon: javaIcon,
    centerX: '-14cqw',
    centerY: '9cqh',
    radiusX: '16cqw',
    radiusY: '8cqh',
    durationSeconds: 38,
    phase: 0.08,
    depthMode: 'front',
    scaleBack: 1.05,
    scaleFront: 1.3,
    brightnessBack: 1,
    brightnessFront: 1.2,
    visibleOnMobile: true,
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    icon: postgresqlIcon,
    centerX: '-10cqw',
    centerY: '-10cqh',
    radiusX: '14cqw',
    radiusY: '7cqh',
    durationSeconds: 52,
    phase: 0.7,
    depthMode: 'back',
    scaleBack: 0.48,
    scaleFront: 0.65,
    brightnessBack: 0.38,
    brightnessFront: 0.52,
    visibleOnMobile: false,
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: mongodbIcon,
    centerX: '0cqw',
    centerY: '3cqh',
    radiusX: '28cqw',
    radiusY: '17cqh',
    durationSeconds: 30,
    phase: 0.3,
    depthMode: 'crossing',
    scaleBack: 0.65,
    scaleFront: 1.25,
    brightnessBack: 0.5,
    brightnessFront: 1.18,
    visibleOnMobile: false,
  },
  {
    id: 'aws',
    name: 'AWS',
    icon: awsIcon,
    centerX: '10cqw',
    centerY: '7cqh',
    radiusX: '12cqw',
    radiusY: '6cqh',
    durationSeconds: 41,
    phase: 0.6,
    depthMode: 'front',
    scaleBack: 1.1,
    scaleFront: 1.28,
    brightnessBack: 1.05,
    brightnessFront: 1.2,
    visibleOnMobile: false,
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: githubIcon,
    centerX: '2cqw',
    centerY: '1cqh',
    radiusX: '34cqw',
    radiusY: '12cqh',
    durationSeconds: 25,
    phase: 0.85,
    depthMode: 'crossing',
    scaleBack: 0.7,
    scaleFront: 1.18,
    brightnessBack: 0.55,
    brightnessFront: 1.12,
    visibleOnMobile: true,
  },
  {
    id: 'vuejs',
    name: 'Vue.js',
    icon: vuedotjsIcon,
    centerX: '7cqw',
    centerY: '8cqh',
    radiusX: '15cqw',
    radiusY: '7cqh',
    durationSeconds: 44,
    phase: 0.2,
    depthMode: 'back',
    scaleBack: 0.5,
    scaleFront: 0.7,
    brightnessBack: 0.4,
    brightnessFront: 0.55,
    visibleOnMobile: false,
  },
]
