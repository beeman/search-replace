#!/usr/bin/env node
/* istanbul ignore file */
import globby from 'globby'
import replace, { ReplaceInFileConfig } from 'replace-in-file'
import yargs from 'yargs'

import { existsSync, mkdirSync, renameSync } from 'fs'
import { dirname } from 'path'

const argv = yargs
  .options({
    d: { type: 'boolean', alias: 'dry', description: `Don't make any changes`, default: false },
    r: { type: 'boolean', alias: 'rename-files', description: 'Renames files', default: false },
    f: { type: 'string', alias: 'regexp-flags', description: 'Flags to pass in to regexp', default: 'g' },
    w: { type: 'string', alias: 'working-dir', description: 'Working dir', default: '.' },
    p: { type: 'array', alias: 'pair', description: 'The search,replace pairs', default: [] },
    s: { type: 'array', alias: 'separator', description: 'Separator between search,replace', default: ',' },
  })
  .alias('h', 'help')
  .help('help')
  .usage('Usage: $0 -p foo,bar')
  .showHelpOnFail(false, 'Specify --help for available options').argv

const cwd = argv.w
const dry = argv.d
const pairs = argv.p
const renameFiles = !!argv.renameFiles

const main = async () => {
  if (!pairs.length) {
    console.log(`Provide at least one search/replace pair. See --help for details.`)
    return
  }

  const files = await globby(cwd, { gitignore: true, absolute: false })
  const froms: RegExp[] = []
  const tos: string[] = []

  pairs.forEach((pair: string) => {
    const [fromThis, toThis] = pair.split(argv.s)
    froms.push(new RegExp(fromThis, argv.f))
    tos.push(toThis)
  })
  const options: ReplaceInFileConfig = {
    files: [...files],
    from: [...froms],
    to: [...tos],
    dry: dry || false,
  }

  console.log(`👀  I will search and replace!`)
  console.log(
    `From: ${JSON.stringify(
      froms.map((f) => f.toString()),
      null,
      2,
    )}`,
  )
  console.log(`To: ${JSON.stringify(tos, null, 2)}`)
  if (dry) {
    console.log(`DRY RUN: I won't make any changes!`)
  }

  try {
    const results = await replace(options)
    const changes = results.filter((item) => item.hasChanged)
    console.log('Changes files:', changes)
  } catch (error) {
    console.error('Error occurred:', error)
  }

  if (renameFiles) {
    const filesToRename = files
      .map((file) => ({ from: file, to: file }))
      .filter((file) => {
        let hasMatch = false

        froms.forEach((f, idx) => {
          if (f.test(file.from)) {
            hasMatch = true
            file.to = file.to.replace(f, tos[idx])
          }
        })

        return hasMatch
      })

    console.log('File renames:')
    filesToRename.map(({ from, to }) => {
      console.log(`   ${from} => ${to}`)
      if (!dry) {
        const path = dirname(to)
        if (!existsSync(path)) {
          console.log(`Creating path ${path}`)
          mkdirSync(path, { recursive: true })
        }
        renameSync(from, to)
      }
    })
  }
}

if (require.main === module) {
  main()
}
