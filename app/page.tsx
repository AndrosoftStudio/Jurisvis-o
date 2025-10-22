import Link from 'next/link'
import { loadUITree } from '@/lib/load'
import Sidebar from '@/components/Sidebar'
import SearchBar from '@/components/SearchBar'

export default async function Home() {
  const tree = await loadUITree()
  const artigos = tree.artigos

  return (
    <main className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Constituição Federal — Dados Locais</h1>
          <p className="text-[var(--muted)] mt-1">Navegue pelos títulos, capítulos, seções e artigos da CF/88.</p>
        </div>
        <Link href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" className="btn" target="_blank">Site do Planalto</Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[20rem_1fr] gap-6">
        <Sidebar tree={tree} />

        <div>
          <SearchBar artigos={artigos} onFilter={()=>{}} />
          <div className="card p-5">
            <p>Escolha um artigo na navegação à esquerda ou acesse diretamente, por exemplo: <Link href="/artigos/5" className="underline">Art. 5º</Link></p>
            <p className="mt-2 text-sm text-[var(--muted)]">Você também pode editar <code>public/dados/cf88.json</code> e o site refletirá as mudanças.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
