interface Props {
  initials: string
  size?: number
  className?: string
}

const palette = [
  ['#2b3946', '#cdd5dc'],
  ['#3a2b46', '#decdd4'],
  ['#2b463e', '#cddcd5'],
  ['#46352b', '#dcd2cd'],
  ['#3a3a46', '#d2d2dc'],
]

const colorFor = (initials: string) => {
  let h = 0
  for (let i = 0; i < initials.length; i++) h = (h * 31 + initials.charCodeAt(i)) >>> 0
  return palette[h % palette.length]
}

export function Avatar({ initials, size = 40, className = '' }: Props) {
  const [bg, fg] = colorFor(initials)
  return (
    <div
      className={`rounded-full flex items-center justify-center font-semibold ${className}`}
      style={{ width: size, height: size, background: bg, color: fg, fontSize: size * 0.38 }}
      aria-hidden
    >
      {initials}
    </div>
  )
}
