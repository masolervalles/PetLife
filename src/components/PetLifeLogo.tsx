interface LogoProps {
  variant?: 'full' | 'icon' | 'inverse'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = { sm: 28, md: 36, lg: 48 }

export default function PetLifeLogo({ variant = 'full', size = 'md', className = '' }: LogoProps) {
  const iconSize = sizes[size]
  const textColor = variant === 'inverse' ? 'white' : '#21878F'
  const iconPrimary = variant === 'inverse' ? 'white' : '#21878F'

  const Icon = () => (
    <svg width={iconSize} height={iconSize} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Paw shape */}
      <ellipse cx="24" cy="31" rx="11" ry="9.5" fill={iconPrimary} opacity="0.15"/>
      <ellipse cx="24" cy="31" rx="11" ry="9.5" stroke={iconPrimary} strokeWidth="2"/>
      {/* Toes */}
      <ellipse cx="13" cy="22" rx="4" ry="5" fill={iconPrimary} opacity="0.15"/>
      <ellipse cx="13" cy="22" rx="4" ry="5" stroke={iconPrimary} strokeWidth="2"/>
      <ellipse cx="19" cy="18" rx="4" ry="5" fill={iconPrimary} opacity="0.15"/>
      <ellipse cx="19" cy="18" rx="4" ry="5" stroke={iconPrimary} strokeWidth="2"/>
      <ellipse cx="29" cy="18" rx="4" ry="5" fill={iconPrimary} opacity="0.15"/>
      <ellipse cx="29" cy="18" rx="4" ry="5" stroke={iconPrimary} strokeWidth="2"/>
      <ellipse cx="35" cy="22" rx="4" ry="5" fill={iconPrimary} opacity="0.15"/>
      <ellipse cx="35" cy="22" rx="4" ry="5" stroke={iconPrimary} strokeWidth="2"/>
      {/* Heartbeat */}
      <path d="M16 31 L19 27 L21.5 35 L24 26 L26.5 31 L32 31" stroke="#F3705C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  if (variant === 'icon') return <Icon />

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <Icon />
      <span style={{ color: textColor, fontSize: size === 'sm' ? 18 : size === 'md' ? 22 : 28, fontWeight: 700, letterSpacing: '-0.5px', fontFamily: 'Montserrat, sans-serif' }}>
        PetLife
      </span>
    </div>
  )
}
