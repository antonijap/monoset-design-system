import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const message = 'Publish with pnpm or the Changesets release command.'

export function isPnpmUserAgent(userAgent = '') {
  return userAgent.trim().toLowerCase().startsWith('pnpm/')
}

const invokedPath = process.argv[1]
  ? pathToFileURL(resolve(process.argv[1])).href
  : undefined

if (invokedPath === import.meta.url && !isPnpmUserAgent(process.env.npm_config_user_agent)) {
  console.error(message)
  process.exitCode = 1
}
