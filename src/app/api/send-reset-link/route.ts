import { NextResponse } from 'next/server'
import crypto from 'crypto'
import PasswordResetToken from '@/models/PasswordResetToken'
import { connectToDB } from '@/lib/db'
import { sendResetEmail } from '@/lib/sendEmail'

export async function POST(req: Request) {
  const { email } = await req.json()
  await connectToDB()

  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60) // 1 saat

  await PasswordResetToken.create({ email, token, expiresAt })
  await sendResetEmail(email, token)

  return NextResponse.json({ success: true })
}
