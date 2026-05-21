import { betterAuth } from 'better-auth'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export const auth = betterAuth({
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  user: {
    additionalFields: {
      xCreatedAt: { type: 'date', required: false, input: false },
    },
  },
  socialProviders: {
    twitter: {
      clientId: process.env.X_OAUTH_CLIENT_ID!,
      clientSecret: process.env.X_OAUTH_CLIENT_SECRET!,
      // Override the default getUserInfo so we also request `created_at`
      // (the built-in implementation only asks for profile_image_url).
      getUserInfo: async (token) => {
        const res = await fetch(
          'https://api.x.com/2/users/me?user.fields=profile_image_url,created_at',
          { headers: { Authorization: `Bearer ${token.accessToken}` } },
        )
        if (!res.ok) return null
        const profile = (await res.json()) as {
          data: {
            id: string
            name: string
            username: string
            profile_image_url?: string
            created_at?: string
          }
        }
        return {
          user: {
            id: profile.data.id,
            name: profile.data.name,
            email: profile.data.username,
            image: profile.data.profile_image_url,
            emailVerified: false,
            xCreatedAt: profile.data.created_at ? new Date(profile.data.created_at) : null,
          },
          data: profile,
        }
      },
    },
  },
})

export type Session = typeof auth.$Infer.Session
