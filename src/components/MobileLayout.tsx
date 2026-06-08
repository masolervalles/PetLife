import { ReactNode } from 'react'
import BottomNav from './BottomNav'

interface Props {
  children: ReactNode
  noPadding?: boolean
}

export default function MobileLayout({ children, noPadding = false }: Props) {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className={`flex-1 overflow-y-auto hide-scrollbar ${noPadding ? '' : 'pb-24'}`}>
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
