import { getSkillMarkdown } from '../../../lib/cms/server'
import { markdownResponse } from '../../../lib/cms/feed'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const skill = await getSkillMarkdown()
  if (!skill) {
    return new Response('skill.md not configured', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
  const body = skill.body.startsWith('# skill-md-version:')
    ? skill.body
    : `# skill-md-version: ${skill.version}\n\n${skill.body}`
  return markdownResponse(body, req)
}
