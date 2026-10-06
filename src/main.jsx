import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import './styles.css'

const I18N = {
  en: {
    appTitle: 'Tender Package Builder',
    appSubtitle: 'Check, match, validate and combine tender documents — entirely in your browser.',
    language: 'বাংলা',
    tenderSetup: '1. Tender setup',
    requirements: 'Requirements JSON',
    chooseJson: 'Choose requirements.json',
    tenderDetails: 'Tender details',
    tenderId: 'Tender ID', title: 'Title', entity: 'Procuring entity', bidder: 'Bidder', deadline: 'Submission deadline',
    documents: 'Required documents', upload: '2. Upload PDFs', pdfOnly: 'PDF files only • up to 30 files • 50 MB total',
    files: 'Uploaded files', match: '3. Match & check', autoMatch: 'Auto-match by filename', clearMatches: 'Clear matches',
    requirement: 'Required document', file: 'Matched file', expiry: 'Expiry date', status: 'Status', actions: 'Actions',
    selectFile: 'Select a file', remove: 'Remove', noFile: 'No file matched', optional: 'Optional', mandatory: 'Mandatory',
    missing: 'Missing', expiryNeeded: 'Expiry date needed', expired: 'Expired', notProvided: 'Not provided', ok: 'OK', duplicate: 'Duplicate',
    generate: 'Generate package', blocked: 'Package is blocked. Fix every blocking status before generating.', ready: 'Ready to generate',
    included: 'Included documents', noFiles: 'No PDF files uploaded yet.', noRequirements: 'Upload requirements.json to begin.',
    fileRejected: 'File rejected', invalidJson: 'Could not read requirements.json. Please check that it is valid JSON.',
    invalidPdf: 'This file is not a valid, readable PDF.', tooMany: 'You can upload at most 30 PDF files.', tooLarge: 'The total upload size cannot exceed 50 MB.',
    generated: 'Package generated and downloaded.', processing: 'Processing…', generating: 'Generating…', autoMatched: 'Filename auto-match completed.',
    footer: 'All document processing happens locally in your browser. No tender files are uploaded.', page: 'pages',
    summary: 'Checklist summary', valid: 'valid', blocking: 'blocking', bonus: 'Bonus: filename auto-match + exact duplicate detection.',
    reset: 'Reset', datePlaceholder: 'YYYY-MM-DD', duplicateNote: 'Exact duplicate content. The same content cannot be matched to two requirements.',
    noBlocking: 'No blocking issues.', choose: 'Choose', clear: 'Clear', matched: 'Matched', notMatched: 'Not matched',
    noExpiry: 'Not required', change: 'Change', removeFile: 'Remove file', uploadHint: 'You can select many PDFs at once.',
    statusHelp: 'Status updates immediately after every match or expiry-date change.', invalidType: 'Only PDF files are accepted.',
  },
  bn: {
    appTitle: 'টেন্ডার প্যাকেজ বিল্ডার',
    appSubtitle: 'ব্রাউজারেই টেন্ডারের ডকুমেন্ট যাচাই, ম্যাচ, ভ্যালিডেট ও একত্র করুন।',
    language: 'English',
    tenderSetup: '১. টেন্ডার সেটআপ', requirements: 'Requirements JSON', chooseJson: 'requirements.json নির্বাচন করুন',
    tenderDetails: 'টেন্ডারের তথ্য', tenderId: 'টেন্ডার আইডি', title: 'শিরোনাম', entity: 'ক্রয়কারী প্রতিষ্ঠান', bidder: 'বিডার', deadline: 'জমাদানের শেষ তারিখ',
    documents: 'প্রয়োজনীয় ডকুমেন্ট', upload: '২. PDF আপলোড', pdfOnly: 'শুধু PDF • সর্বোচ্চ ৩০টি • মোট ৫০ MB', files: 'আপলোড করা ফাইল',
    match: '৩. ম্যাচ ও যাচাই', autoMatch: 'ফাইলের নাম দিয়ে Auto-match', clearMatches: 'ম্যাচ মুছুন', requirement: 'প্রয়োজনীয় ডকুমেন্ট',
    file: 'ম্যাচ করা ফাইল', expiry: 'মেয়াদ শেষের তারিখ', status: 'স্ট্যাটাস', actions: 'অ্যাকশন', selectFile: 'একটি ফাইল নির্বাচন করুন',
    remove: 'সরান', noFile: 'কোনো ফাইল ম্যাচ করা হয়নি', optional: 'ঐচ্ছিক', mandatory: 'আবশ্যিক', missing: 'অনুপস্থিত',
    expiryNeeded: 'মেয়াদ শেষের তারিখ প্রয়োজন', expired: 'মেয়াদ শেষ', notProvided: 'দেওয়া হয়নি', ok: 'ঠিক আছে', duplicate: 'ডুপ্লিকেট',
    generate: 'প্যাকেজ তৈরি করুন', blocked: 'প্যাকেজ তৈরি বন্ধ আছে। সব blocking সমস্যা ঠিক করুন।', ready: 'প্যাকেজ তৈরি করা যাবে', included: 'অন্তর্ভুক্ত ডকুমেন্ট',
    noFiles: 'এখনও কোনো PDF আপলোড করা হয়নি।', noRequirements: 'শুরু করতে requirements.json আপলোড করুন।', fileRejected: 'ফাইল বাতিল',
    invalidJson: 'requirements.json পড়া যায়নি। বৈধ JSON ফাইল নির্বাচন করুন।', invalidPdf: 'এই ফাইলটি বৈধ বা পড়ার উপযোগী PDF নয়।',
    tooMany: 'সর্বোচ্চ ৩০টি PDF আপলোড করা যাবে।', tooLarge: 'মোট ফাইলের আকার ৫০ MB-এর বেশি হতে পারবে না।', generated: 'প্যাকেজ তৈরি ও ডাউনলোড হয়েছে।',
    processing: 'প্রসেস হচ্ছে…', generating: 'তৈরি হচ্ছে…', autoMatched: 'ফাইলের নাম অনুযায়ী Auto-match সম্পন্ন হয়েছে।',
    footer: 'সব ডকুমেন্ট প্রসেসিং আপনার ব্রাউজারেই হয়। কোনো টেন্ডার ফাইল আপলোড করা হয় না।', page: 'পৃষ্ঠা', summary: 'চেকলিস্ট সারাংশ', valid: 'ঠিক',
    blocking: 'সমস্যা', bonus: 'Bonus: filename auto-match + exact duplicate detection.', reset: 'রিসেট', datePlaceholder: 'YYYY-MM-DD',
    duplicateNote: 'একই কনটেন্টের ডুপ্লিকেট। একই কনটেন্ট দুইটি requirement-এ ম্যাচ করা যাবে না।', noBlocking: 'কোনো blocking সমস্যা নেই।', choose: 'নির্বাচন', clear: 'মুছুন',
    matched: 'ম্যাচ করা', notMatched: 'ম্যাচ করা হয়নি', noExpiry: 'প্রয়োজন নেই', change: 'পরিবর্তন', removeFile: 'ফাইল সরান', uploadHint: 'একসাথে অনেক PDF নির্বাচন করতে পারবেন।',
    statusHelp: 'ম্যাচ বা expiry date পরিবর্তন করলেই status সঙ্গে সঙ্গে আপডেট হয়।', invalidType: 'শুধু PDF ফাইল গ্রহণ করা হয়।',
  }
}

const BLOCKING = new Set(['missing', 'expiryNeeded', 'expired'])

function normalize(s = '') { return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim() }
function formatBytes(bytes) { return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB` }
function scoreMatch(filename, req) {
  const f = normalize(filename), title = normalize(req.title_en), tokens = title.split(' ').filter(Boolean)
  let score = tokens.reduce((sum, token) => sum + (f.includes(token) ? token.length : 0), 0)
  const aliases = {
    'trade license': ['trade', 'license'], 'tin certificate': ['tin'], 'vat registration certificate': ['vat', 'bin'],
    'bank solvency certificate': ['bank', 'solvency'], 'experience certificate': ['experience', 'cert'],
    'audited financial statement': ['financial'], "manufacturer's authorization": ['manufacturer', 'authorization'],
    'technical proposal': ['technical'], 'financial proposal': ['financial'], 'signed declaration': ['declaration', 'signed']
  }
  for (const alias of aliases[req.title_en?.toLowerCase()] || []) if (f.includes(alias)) score += 8
  return score
}
async function sha256(file) {
  const hash = await crypto.subtle.digest('SHA-256', await file.arrayBuffer())
  return [...new Uint8Array(hash)].map(x => x.toString(16).padStart(2, '0')).join('')
}
async function readPdf(file) {
  const bytes = await file.arrayBuffer()
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: false })
  return { pages: pdf.getPageCount(), bytes }
}

function App() {
  const [lang, setLang] = useState('en')
  const t = I18N[lang]
  const [requirements, setRequirements] = useState(null)
  const [files, setFiles] = useState([])
  const [matches, setMatches] = useState({})
  const [expiry, setExpiry] = useState({})
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const totalBytes = files.reduce((sum, f) => sum + f.file.size, 0)
  const duplicateGroups = useMemo(() => {
    const map = new Map()
    files.forEach(f => { if (!map.has(f.hash)) map.set(f.hash, []); map.get(f.hash).push(f.id) })
    return [...map.values()].filter(group => group.length > 1)
  }, [files])
  const duplicateIds = useMemo(() => new Set(duplicateGroups.flat()), [duplicateGroups])
  const fileById = useMemo(() => Object.fromEntries(files.map(f => [f.id, f])), [files])

  const statuses = useMemo(() => {
    if (!requirements) return {}
    const out = {}
    for (const req of [...requirements.requirements].sort((a, b) => a.order - b.order)) {
      const fileId = matches[req.id]
      if (!fileId) out[req.id] = req.mandatory ? 'missing' : 'notProvided'
      else if (req.has_expiry && !expiry[req.id]) out[req.id] = 'expiryNeeded'
      else if (req.has_expiry && expiry[req.id] < requirements.tender.submission_deadline) out[req.id] = 'expired'
      else out[req.id] = 'ok'
    }
    return out
  }, [requirements, matches, expiry])

  const blockingCount = Object.values(statuses).filter(s => BLOCKING.has(s)).length
  const okCount = Object.values(statuses).filter(s => s === 'ok').length
  const statusLabel = { missing: t.missing, expiryNeeded: t.expiryNeeded, expired: t.expired, notProvided: t.notProvided, ok: t.ok }

  async function loadRequirements(file) {
    setError(''); setNotice('')
    try {
      const data = JSON.parse(await file.text())
      if (!data?.tender || !Array.isArray(data.requirements)) throw new Error('invalid')
      data.requirements = [...data.requirements].sort((a, b) => a.order - b.order)
      setRequirements(data); setMatches({}); setExpiry({})
      setNotice(`${t.tenderDetails}: ${data.tender.tender_id}`)
    } catch { setError(t.invalidJson) }
  }

  async function addFiles(fileList) {
    setError(''); setNotice('')
    const incoming = [...fileList]
    const next = [...files]
    if (next.length + incoming.length > 30) { setError(t.tooMany); return }
    const existingKeys = new Set(files.map(x => `${x.file.name}|${x.file.size}`))
    for (const file of incoming) {
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) { setError(`${t.fileRejected}: ${file.name}. ${t.invalidType}`); continue }
      if (existingKeys.has(`${file.name}|${file.size}`)) continue
      const proposedTotal = next.reduce((s, x) => s + x.file.size, 0) + file.size
      if (proposedTotal > 50 * 1024 * 1024) { setError(t.tooLarge); break }
      try {
        const { pages, bytes } = await readPdf(file)
        const hash = await sha256(new File([bytes], file.name, { type: 'application/pdf' }))
        next.push({ id: crypto.randomUUID(), file, pages, hash })
      } catch { setError(`${t.fileRejected}: ${file.name}. ${t.invalidPdf}`) }
    }
    setFiles(next)
  }

  function removeFile(id) {
    setFiles(prev => prev.filter(f => f.id !== id))
    setMatches(prev => Object.fromEntries(Object.entries(prev).filter(([, v]) => v !== id)))
  }

  function setMatch(reqId, fileId) {
    setMatches(prev => {
      const next = { ...prev }
      Object.keys(next).forEach(k => { if (k !== reqId && next[k] === fileId) delete next[k] })
      if (fileId) next[reqId] = fileId
      else delete next[reqId]
      return next
    })
  }

  function isFileBlockedForRequirement(fileId, reqId) {
    if (!fileId) return false
    // One file can only belong to one requirement.
    const usedElsewhere = Object.entries(matches).some(([id, selected]) => id !== reqId && selected === fileId)
    if (usedElsewhere) return true
    // Exact duplicates may exist, but only ONE file from the duplicate group can be matched at a time.
    const selectedDuplicate = Object.entries(matches).find(([id, selected]) => id !== reqId && selected === fileId && duplicateIds.has(selected))
    if (selectedDuplicate) return true
    const file = fileById[fileId]
    if (file && duplicateIds.has(fileId)) {
      return Object.entries(matches).some(([id, selected]) => id !== reqId && selected && fileById[selected]?.hash === file.hash)
    }
    return false
  }

  function autoMatch() {
    if (!requirements) return
    const used = new Set(Object.values(matches))
    const next = { ...matches }
    for (const req of requirements.requirements) {
      if (next[req.id]) continue
      const candidates = files.filter(f => !used.has(f.id)).map(f => ({ f, score: scoreMatch(f.file.name, req) })).sort((a, b) => b.score - a.score)
      const best = candidates.find(c => c.score >= 6 && !isFileBlockedForRequirement(c.f.id, req.id))
      if (best) { next[req.id] = best.f.id; used.add(best.f.id) }
    }
    setMatches(next); setNotice(t.autoMatched)
  }

  function clearMatches() { setMatches({}); setExpiry({}); setNotice(t.clearMatches) }

  async function generatePackage() {
    if (!requirements || blockingCount > 0 || busy) return
    setBusy(true); setError(''); setNotice('')
    try {
      const out = await PDFDocument.create()
      const regular = await out.embedFont(StandardFonts.Helvetica)
      const bold = await out.embedFont(StandardFonts.HelveticaBold)
      const PAGE_FOOTER = 36
      const coverHeight = 841.89
      const cover = out.addPage([595.28, coverHeight])
      const { width, height } = cover.getSize()
      const navy = rgb(0.035, 0.07, 0.16), blue = rgb(0.12, 0.32, 0.92), muted = rgb(.35, .39, .46)
      cover.drawRectangle({ x: 0, y: height - 112, width, height: 112, color: navy })
      cover.drawText('TENDER PACKAGE', { x: 42, y: height - 58, size: 25, font: bold, color: rgb(1, 1, 1) })
      cover.drawText(requirements.tender.tender_id, { x: 42, y: height - 84, size: 11, font: regular, color: rgb(.78, .84, .96) })
      let y = height - 152
      const rows = [
        ['Tender title', requirements.tender.title], ['Procuring entity', requirements.tender.procuring_entity], ['Bidder', requirements.tender.bidder],
        ['Submission deadline', requirements.tender.submission_deadline], ['Package made', new Date().toISOString().slice(0, 10)]
      ]
      for (const [label, value] of rows) { cover.drawText(label, { x: 42, y, size: 10, font: bold, color: muted }); cover.drawText(String(value), { x: 185, y, size: 10, font: regular, color: rgb(.08, .1, .14) }); y -= 23 }
      y -= 10
      cover.drawText('Included documents', { x: 42, y, size: 15, font: bold, color: blue }); y -= 26
      const included = requirements.requirements.filter(r => matches[r.id]).sort((a, b) => a.order - b.order)
      for (const req of included) {
        const f = fileById[matches[req.id]]
        if (y < PAGE_FOOTER + 22) break
        cover.drawText(`${req.order}. ${req.title_en}`, { x: 48, y, size: 9.5, font: regular, color: rgb(.12, .14, .18) })
        y -= 18
      }

      for (const req of [...requirements.requirements].sort((a, b) => a.order - b.order)) {
        const fileId = matches[req.id]
        if (!fileId) continue
        const src = await PDFDocument.load(await fileById[fileId].file.arrayBuffer())
        for (const srcPage of src.getPages()) {
          const embedded = await out.embedPage(srcPage)
          const w = srcPage.getWidth(), h = srcPage.getHeight()
          const page = out.addPage([w, h + PAGE_FOOTER])
          page.drawPage(embedded, { x: 0, y: PAGE_FOOTER, width: w, height: h })
        }
      }

      const pages = out.getPages(), total = pages.length
      pages.forEach((page, i) => {
        const { width, height } = page.getSize()
        page.drawLine({ start: { x: 28, y: 25 }, end: { x: width - 28, y: 25 }, thickness: .5, color: rgb(.78, .8, .84) })
        const text = `${requirements.tender.tender_id} | Page ${i + 1} of ${total}`
        const size = 8.5, tw = regular.widthOfTextAtSize(text, size)
        page.drawText(text, { x: (width - tw) / 2, y: 11, size, font: regular, color: rgb(.28, .31, .36) })
      })

      const bytes = await out.save()
      const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }))
      const a = document.createElement('a'); a.href = url; a.download = `${requirements.tender.tender_id}_Package.pdf`; a.click()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
      setNotice(t.generated)
    } catch (e) { console.error(e); setError(t.invalidPdf) }
    finally { setBusy(false) }
  }

  function reset() { setRequirements(null); setFiles([]); setMatches({}); setExpiry({}); setError(''); setNotice('') }

  return <div className="app">
    <header className="topbar">
      <div className="brand-wrap"><div className="logo-mark">TP</div><div><div className="brand">{t.appTitle}</div><div className="subtitle">{t.appSubtitle}</div></div></div>
      <div className="top-actions"><button className="lang-btn" onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}>{t.language}</button><button className="reset-btn" onClick={reset}>{t.reset}</button></div>
    </header>
    <main>
      {(error || notice) && <div className={error ? 'alert error' : 'alert success'}>{error || notice}</div>}

      <section className="hero-card">
        <div><span className="eyebrow">DEVFEST • DOCUMENT CONTROL</span><h1>{t.appTitle}</h1><p>{t.appSubtitle}</p></div>
        <div className="hero-pills"><span>100% Browser</span><span>PDF Validation</span><span>Secure Local Processing</span></div>
      </section>

      <section className="card">
        <div className="section-head"><div className="section-title"><span className="step step-blue">01</span><div><h2>{t.tenderSetup}</h2><p>{t.requirements}</p></div></div><label className="primary small">{t.chooseJson}<input type="file" accept=".json,application/json" onChange={e => e.target.files[0] && loadRequirements(e.target.files[0])} hidden /></label></div>
        {requirements ? <>
          <div className="tender-grid"><Info label={t.tenderId} value={requirements.tender.tender_id}/><Info label={t.title} value={requirements.tender.title}/><Info label={t.entity} value={requirements.tender.procuring_entity}/><Info label={t.bidder} value={requirements.tender.bidder}/><Info label={t.deadline} value={requirements.tender.submission_deadline}/></div>
          <div className="mini-list">{requirements.requirements.map(r => <div className="mini-row" key={r.id}><span>{r.order}. {lang === 'bn' ? r.title_bn : r.title_en}</span><span className={r.mandatory ? 'tag required' : 'tag'}>{r.mandatory ? t.mandatory : t.optional}</span></div>)}</div>
        </> : <div className="empty">{t.noRequirements}</div>}
      </section>

      <section className="card">
        <div className="section-head"><div className="section-title"><span className="step step-purple">02</span><div><h2>{t.upload}</h2><p>{t.pdfOnly}</p></div></div><label className="primary small">{t.upload}<input type="file" accept="application/pdf,.pdf" multiple onChange={e => addFiles(e.target.files)} hidden /></label></div>
        <div className="dropzone" onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); addFiles(e.dataTransfer.files) }}><div className="drop-icon">PDF</div><div><strong>{t.drop}</strong><p>{t.uploadHint}</p></div></div>
        <div className="file-toolbar"><strong>{t.files}</strong><span>{files.length}/30 · {formatBytes(totalBytes)}/50 MB</span></div>
        {files.length === 0 ? <div className="empty">{t.noFiles}</div> : <div className="file-list">{files.map(f => <div className={'file-row' + (duplicateIds.has(f.id) ? ' dup' : '')} key={f.id}><div className="file-main"><div className="pdf-badge">PDF</div><div><strong>{f.file.name}</strong><small>{f.pages} {t.page} · {formatBytes(f.file.size)}</small></div></div><div className="file-status">{duplicateIds.has(f.id) ? <span className="status duplicate">{t.duplicate}</span> : <span className="hash">SHA-256 {f.hash.slice(0, 8)}…</span>}<button className="icon-btn" title={t.removeFile} aria-label={t.removeFile} onClick={() => removeFile(f.id)}>×</button></div></div>)}</div>}
      </section>

      <section className="card">
        <div className="section-head"><div className="section-title"><span className="step step-green">03</span><div><h2>{t.match}</h2><p>{t.statusHelp}</p></div></div><div className="button-row"><button className="secondary" onClick={autoMatch} disabled={!requirements || !files.length}>{t.autoMatch}</button><button className="ghost" onClick={clearMatches} disabled={!requirements}>{t.clearMatches}</button></div></div>
        {requirements ? <div className="table-wrap"><table><thead><tr><th>#</th><th>{t.requirement}</th><th>{t.file}</th><th>{t.expiry}</th><th>{t.status}</th></tr></thead><tbody>{requirements.requirements.map(req => {
          const st = statuses[req.id], selected = matches[req.id]
          return <tr key={req.id}><td><span className="order-badge">{req.order}</span></td><td><div className="req-name">{lang === 'bn' ? req.title_bn : req.title_en}<span className={req.mandatory ? 'dot req' : 'dot'}>{req.mandatory ? '•' : '○'}</span></div><small className="req-type">{req.mandatory ? t.mandatory : t.optional}{req.has_expiry ? ` • ${t.expiry}` : ''}</small></td>
            <td><select value={selected || ''} onChange={e => setMatch(req.id, e.target.value)} disabled={files.length === 0}><option value="">{t.selectFile}</option>{files.map(f => <option key={f.id} value={f.id} disabled={isFileBlockedForRequirement(f.id, req.id)}>{f.file.name}{duplicateIds.has(f.id) ? ` — ${t.duplicate}` : ''}</option>)}</select></td>
            <td>{req.has_expiry && selected ? <input type="date" aria-label={`${t.expiry}: ${req.title_en}`} value={expiry[req.id] || ''} min="1900-01-01" placeholder={t.datePlaceholder} onChange={e => setExpiry(x => ({ ...x, [req.id]: e.target.value }))}/> : <span className="muted">{t.noExpiry}</span>}</td>
            <td><span className={`status ${st}`}>{statusLabel[st]}</span></td></tr>
        })}</tbody></table></div> : <div className="empty">{t.noRequirements}</div>}
        {requirements && <div className="bottom-panel"><div><div className="summary-title">{t.summary}</div><div className="summary"><span><b>{okCount}</b> {t.valid}</span><span className={blockingCount ? 'danger' : ''}><b>{blockingCount}</b> {t.blocking}</span></div></div><div className="generate-area"><div className={blockingCount ? 'blocked-text' : 'ready-text'}>{blockingCount ? t.blocked : t.noBlocking}</div><button className="generate" disabled={blockingCount > 0 || busy} onClick={generatePackage}>{busy ? t.generating : t.generate}</button></div></div>}
      </section>
    </main>
    <footer>{t.footer}</footer>
  </div>
}

function Info({ label, value }) { return <div className="info"><span>{label}</span><strong>{value}</strong></div> }
createRoot(document.getElementById('root')).render(<App />)
