import { execSync } from 'child_process'
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env' })

if (process.env.DATABASE_URL) {
  console.log('Running drizzle-kit migrate...')
  execSync('drizzle-kit migrate', { stdio: 'inherit' })
} else {
  console.log('DATABASE_URL not set — skipping drizzle-kit migrate')
}
