import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, normalize, resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { getAvatarNameError } from '../src/playground/avatar.js'

const scriptsDirectory = dirname(fileURLToPath(import.meta.url))
const websiteRoot = resolve(scriptsDirectory, '..')
const packageJson = JSON.parse(
  readFileSync(resolve(websiteRoot, 'package.json'), 'utf8'),
)
const viteConfig = readFileSync(resolve(websiteRoot, 'vite.config.js'), 'utf8')

test('website resolves token CSS through the workspace package export', () => {
  assert.equal(
    packageJson.dependencies['@monoset/tokens'],
    'workspace:^0.2.0',
  )
  assert.doesNotMatch(viteConfig, /@monoset\/tokens\/css/)

  const resolvedCss = normalize(
    fileURLToPath(import.meta.resolve('@monoset/tokens/css')),
  )
  const expectedCss = normalize(
    resolve(websiteRoot, '../packages/tokens/src/index.css'),
  )

  assert.equal(resolvedCss, expectedCss)
})

test('Avatar playground names are validated without blocking edits', () => {
  assert.equal(getAvatarNameError(''), 'Enter a name for the avatar.')
  assert.equal(getAvatarNameError('   '), 'Enter a name for the avatar.')
  assert.equal(getAvatarNameError(undefined), 'Enter a name for the avatar.')
  assert.equal(getAvatarNameError(' Ada Turing '), null)
})
