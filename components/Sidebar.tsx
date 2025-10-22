'use client'
import Link from 'next/link'
import { useState } from 'react'
import type { UITree } from '@/lib/types'

export default function Sidebar({ tree }:{ tree: UITree }) {
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const key = (parts: (string|number)[]) => parts.join('-')

  return (
    <aside className="sidebar">
      <h3 className="text-sm text-[var(--muted)] mb-2">Navegação</h3>
      <div className="space-y-3">
        {tree.titulos.map((t, ti) => {
          const tk = key(['t',ti])
          const isOpen = open[tk] ?? true
          return (
            <div key={tk}>
              <button className="w-full text-left" onClick={()=>setOpen(s=>({...s,[tk]:!isOpen}))}>
                <div className="flex items-center justify-between">
                  <div><span className="mr-2">{isOpen ? '📕' : '📘'}</span><b>TÍTULO {t.numero}</b></div>
                  <span className="text-xs text-[var(--muted)]">{t.nome}</span>
                </div>
              </button>
              {isOpen && (
                <div className="pl-2 mt-2 space-y-2">
                  {t.artigos.map(a => (
                    <div key={a.numero}>
                      <Link href={`/artigos/${a.numero}`} className="block text-sm hover:underline">Art. {a.numero}</Link>
                    </div>
                  ))}
                  {t.capitulos.map((c, ci) => {
                    const ck = key(['t',ti,'c',ci])
                    const cOpen = open[ck] ?? true
                    return (
                      <div key={ck} className="pl-2">
                        <button onClick={()=>setOpen(s=>({...s,[ck]:!cOpen}))} className="text-left">
                          <div className="flex items-center justify-between">
                            <div><span className="mr-2">{cOpen ? '📖' : '📔'}</span><b>CAPÍTULO {c.numero}</b></div>
                            <span className="text-xs text-[var(--muted)]">{c.nome}</span>
                          </div>
                        </button>
                        {cOpen && (
                          <div className="pl-2 mt-2 space-y-1">
                            {c.artigos.map(a => (
                              <div key={a.numero}><Link href={`/artigos/${a.numero}`} className="block text-sm hover:underline">Art. {a.numero}</Link></div>
                            ))}
                            {c.secoes.map((s, si) => (
                              <div key={key(['t',ti,'c',ci,'s',si])} className="pl-2">
                                <div className="text-xs text-[var(--muted)] mb-1">Seção {s.numero} — {s.nome}</div>
                                {s.artigos.map(a => (
                                  <div key={a.numero}><Link href={`/artigos/${a.numero}`} className="block text-sm hover:underline">Art. {a.numero}</Link></div>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </aside>
  )
}
