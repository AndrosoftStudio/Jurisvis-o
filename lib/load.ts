import { promises as fs } from 'fs'
import path from 'path'
import type { CF88, UITree } from './types'
import { cfJsonToUITree } from './transform'

export async function loadUITree(): Promise<UITree> {
  const file = path.join(process.cwd(), 'public', 'dados', 'cf88.json')
  const raw = await fs.readFile(file, 'utf-8')
  const cf: CF88 = JSON.parse(raw)
  return cfJsonToUITree(cf)
}

export async function loadArticle(numero: string) {
  const tree = await loadUITree()
  return tree.artigos.find(a => a.numero === numero)
}
