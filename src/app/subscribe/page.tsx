'use client'

import { useEffect } from 'react'

export default function SubscribePage() {
  useEffect(() => {
    const startStripeCheckout = async () => {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) {
        const error = await res.text()
        console.error('Stripe API hatası:', error)
        return
      }

      const data = await res.json()
      window.location.href = data.url // 👈 direkt yönlendir
    }

    startStripeCheckout()
  }, [])

  return (
    <div className="text-center text-white mt-20">
      <p>Redirecting to payment page...</p>
    </div>
  )
}
