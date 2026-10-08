import type { CSSProperties } from 'react'
import { heroField } from '../../data/heroField'
import './TechField.css'

const BACK_Z = 5
const FRONT_Z = 15

function depthZIndices(mode: (typeof heroField)[number]['depthMode']) {
  if (mode === 'back') return { zA: BACK_Z, zB: BACK_Z }
  if (mode === 'front') return { zA: FRONT_Z, zB: FRONT_Z }
  return { zA: BACK_Z, zB: FRONT_Z }
}

export function TechField() {
  return (
    <div className="tech-field" aria-hidden="true">
      {heroField.map((item) => {
        const { zA, zB } = depthZIndices(item.depthMode)
        const style = {
          '--center-x': item.centerX,
          '--center-y': item.centerY,
          '--radius-x': item.radiusX,
          '--radius-y': item.radiusY,
          '--duration': `${item.durationSeconds}s`,
          '--phase': item.phase,
          '--scale-back': item.scaleBack,
          '--scale-front': item.scaleFront,
          '--brightness-back': item.brightnessBack,
          '--brightness-front': item.brightnessFront,
          '--z-a': zA,
          '--z-b': zB,
        } as CSSProperties

        return (
          <div
            key={item.id}
            className={item.visibleOnMobile ? 'tech-field__item' : 'tech-field__item hidden md:block'}
            style={style}
          >
            <img src={item.icon} alt="" />
          </div>
        )
      })}
    </div>
  )
}
