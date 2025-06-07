import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get('__session')

  if (!session) {
    redirect('/start')
  }
}
