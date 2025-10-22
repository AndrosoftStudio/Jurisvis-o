import { loadArticle, loadUITree } from '@/lib/load'
import ArticleView from '@/components/ArticleView'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'

export default async function ArtigoPage({ params }:{ params: { numero: string } }) {
  const { numero } = params
  const tree = await loadUITree()
  const artigo = await loadArticle(numero)

  return (
    <main className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CF/88 — Artigo {numero}</h1>
          <p className="text-[var(--muted)] mt-1"><Link href="/">Voltar</Link></p>
        </div>
        <Link href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" className="btn" target="_blank">Site do Planalto</Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[20rem_1fr] gap-6">
        <Sidebar tree={tree} />
        {artigo ? (
          <ArticleView
            numero={String(artigo.numero)}
            texto={artigo.texto}
            breadcrumb={[artigo.hierarquia.titulo||'Título', artigo.hierarquia.capitulo||'Capítulo', artigo.hierarquia.secao||'Seção', `Art. ${artigo.numero}`].filter(Boolean)}
          />
        ) : (
          <div className="article"><p>Artigo não encontrado.</p></div>
        )}
      </div>
    </main>
  )
}
