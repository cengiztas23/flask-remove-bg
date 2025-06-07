import { NextResponse } from 'next/server'
import { sendResetEmail } from '@/lib/sendEmail'

export async function GET() {
  try {
    await sendResetEmail('sorguartiyorum@gmail.com', 'test-token-123')
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Mail gönderme hatası:', err)
    return NextResponse.json({ error: 'Gönderilemedi' }, { status: 500 })
  }
}
