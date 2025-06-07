'use client'

import { useEffect, useState } from 'react'
import StartPage from '@/app/start/page'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    let attempts = 0

    const interval = setInterval(async () => {
      const dom = (window as any).$memberstackDom

      if (dom && typeof dom.getMemberJSON === 'function') {
        clearInterval(interval)

        try {
          const { data: member } = await dom.getMemberJSON()

          if (member) {
            console.log('✅ Kullanıcı giriş yaptı:', member)
            setIsLoggedIn(true)
          } else {
            console.warn('❌ Giriş yapılmamış.')
            setIsLoggedIn(false)
          }
        } catch (err) {
          console.error('❌ Member verisi alınamadı:', err)
          setIsLoggedIn(false)
        } finally {
          setIsLoading(false)
        }

      } else if (attempts > 20) {
        clearInterval(interval)
        console.warn('❌ Memberstack yüklenemedi veya getMemberJSON fonksiyonu tanımsız.')
        setIsLoading(false)
      }

      attempts++
    }, 150)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-cyan-400 text-lg">
        Yükleniyor...
      </div>
    )
  }

  if (!isLoggedIn) {
    return <StartPage />
  }

  return <>{children}</>
}
