import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const scriptsDirectory = dirname(fileURLToPath(import.meta.url))
const repositoryRoot = resolve(scriptsDirectory, '..')
const readWorkflow = (name) =>
  readFileSync(resolve(repositoryRoot, '.github/workflows', name), 'utf8')

const release = readWorkflow('release.yml')
const ci = readWorkflow('ci.yml')

const occurrences = (source, pattern) => [...source.matchAll(pattern)].length
const setupOrder = (source) =>
  [...source.matchAll(/uses:\s*(pnpm\/action-setup|actions\/setup-node)@v4/g)].map(
    ([, action]) => action,
  )

test('release uses the pnpm-safe Changesets path', () => {
  assert.deepEqual(setupOrder(release), [
    'pnpm/action-setup',
    'actions/setup-node',
  ])
  assert.match(release, /uses:\s*pnpm\/action-setup@v4[\s\S]*?version:\s*11\.5\.2/)
  assert.match(release, /uses:\s*actions\/setup-node@v4[\s\S]*?cache:\s*pnpm/)
  assert.match(release, /run:\s*pnpm install --frozen-lockfile/)

  for (const packageName of [
    '@monoset/tokens',
    '@monoset/motion',
    '@monoset/react',
  ]) {
    assert.match(release, new RegExp(`pnpm --filter ${packageName} build`))
  }

  assert.match(release, /publish:\s*pnpm exec changeset publish/)
  assert.match(release, /version:\s*pnpm exec changeset version/)
})

test('every CI job installs and runs through pnpm', () => {
  assert.deepEqual(setupOrder(ci), [
    'pnpm/action-setup',
    'actions/setup-node',
    'pnpm/action-setup',
    'actions/setup-node',
  ])
  assert.equal(occurrences(ci, /uses:\s*pnpm\/action-setup@v4/g), 2)
  assert.equal(occurrences(ci, /version:\s*11\.5\.2/g), 2)
  assert.equal(occurrences(ci, /cache:\s*pnpm/g), 2)
  assert.equal(occurrences(ci, /pnpm install --frozen-lockfile/g), 2)
  assert.equal(occurrences(ci, /run:\s*pnpm test:workflows/g), 1)

  for (const packageName of [
    '@monoset/tokens',
    '@monoset/motion',
    '@monoset/react',
  ]) {
    assert.match(ci, new RegExp(`pnpm --filter ${packageName} build`))
  }

  assert.match(ci, /pnpm --filter website build/)
  assert.equal(
    occurrences(ci, /run:\s*pnpm --filter website test/g),
    1,
  )
  assert.match(ci, /pnpm --filter website size-limit/)
  assert.match(ci, /pnpm --filter @monoset\/react test/)
  assert.match(ci, /pnpm --dir website exec lhci autorun/)
  assert.match(ci, /pnpm --dir website exec lhci autorun[\s\S]*?continue-on-error:\s*true/)
})

test('CI enforces the React v1 release gates', () => {
  assert.equal(
    occurrences(ci, /run:\s*pnpm --filter @monoset\/react verify:package/g),
    1,
  )
  assert.equal(
    occurrences(ci, /run:\s*pnpm --filter @monoset\/react test:e2e/g),
    1,
  )
  assert.match(
    ci,
    /run:\s*pnpm --filter @monoset\/react test:e2e[\s\S]*?env:[\s\S]*?PUPPETEER_EXECUTABLE_PATH:\s*\/usr\/bin\/google-chrome/,
  )
  assert.equal(
    occurrences(
      ci,
      /run:\s*pnpm --filter @monoset\/react test:contracts:types/g,
    ),
    1,
  )
})

test('CI supports manual reruns', () => {
  assert.equal(occurrences(ci, /^  workflow_dispatch:\s*$/gm), 1)
})

test('workflows do not bypass locked workspace tools', () => {
  const workflows = `${release}\n${ci}`

  assert.doesNotMatch(workflows, /\bnpm ci\b/)
  assert.doesNotMatch(workflows, /\bnpx\s+changeset\b/)
  assert.doesNotMatch(workflows, /\bnpx\s+-y\s+@lhci\/cli\b/)
})
