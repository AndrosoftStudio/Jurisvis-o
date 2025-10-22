'use client'
import React from 'react'

function fmt(text: string): JSX.Element {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  return (
    <div className="space-y-2">
      {lines.map((seg, i) => {
        if (/^\s*[IVXLCDM]+\s*[-–—]/i.test(seg)) {
          const m = seg.match(/^\s*([IVXLCDM]+)\s*[-–—]?\s*(.*)$/i)
          return <div className="inciso" key={i}><b>Inciso {m?.[1]}:</b> {m?.[2]}</div>
        } else if (/^\s*§/.test(seg)) {
          return <div className="paragrafo" key={i}>{seg}</div>
        } else if (/^\s*[a-z]\)/.test(seg)) {
          return <div className="alinea" key={i}>{seg}</div>
        }
        return <p key={i}>{seg}</p>
      })}
    </div>
  )
}

export default function ArticleView({ numero, texto, breadcrumb }:{ numero:string, texto:string, breadcrumb:string[] }) {
  return (
    <div className="article">
      <div className="breadcrumb">{breadcrumb.join(' › ')}</div>
      <h1 className="text-2xl font-semibold mb-3">Art. {numero}</h1>
      {fmt(texto)}
    </div>
  )
}
