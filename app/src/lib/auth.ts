// lib/auth.ts

import { jwtDecode } from 'jwt-decode'
import { headers } from 'next/headers'

export interface BtpUser {
  id: string
  email: string
  givenName: string
  familyName: string
  scopes: string[]
}

type JWTPayload = {
  user_id: string
  email: string
  given_name: string
  family_name: string
  scope: Array<string>
}

export async function getBtpToken(): Promise<string | null> {
  const headerList = await headers()
  const authHeader = headerList.get('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.split(' ')[1]
}

export async function getCurrentUser(): Promise<BtpUser | null> {
  const token = await getBtpToken()
  if (!token) return null

  const decoded: JWTPayload = jwtDecode(token)

  console.log('decoded:', decoded)

  return {
    id: decoded.user_id,
    email: decoded.email,
    givenName: decoded.given_name,
    familyName: decoded.family_name,
    scopes: decoded.scope || []
  }
}
