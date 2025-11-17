import { useEffect, useMemo, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

function TextInput({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-white/70">{label}</span>
      <input {...props} className="mt-1 w-full rounded-md bg-[#0b1633] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </label>
  )
}

function NumberInput({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-white/70">{label}</span>
      <input type="number" step="0.1" {...props} className="mt-1 w-full rounded-md bg-[#0b1633] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </label>
  )
}

function TextArea({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-white/70">{label}</span>
      <textarea {...props} className="mt-1 w-full rounded-md bg-[#0b1633] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </label>
  )
}

export default function AdminPanel() {
  const [tab, setTab] = useState('categories')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Data
  const [categories, setCategories] = useState([])
  const [clients, setClients] = useState([])
  const [projects, setProjects] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [settings, setSettings] = useState({ key: 'ui', marquee_a_seconds: 30, marquee_b_seconds: 28, glow_intensity: 0.25, parallax_intensity: 8 })

  const fetchAll = async () => {
    try {
      const [c1, c2, c3, c4, s1] = await Promise.all([
        fetch(`${API}/api/categories`).then(r => r.json()),
        fetch(`${API}/api/clients`).then(r => r.json()),
        fetch(`${API}/api/projects`).then(r => r.json()),
        fetch(`${API}/api/testimonials`).then(r => r.json()),
        fetch(`${API}/api/settings`).then(r => r.json()),
      ])
      setCategories(c1)
      setClients(c2)
      setProjects(c3)
      setTestimonials(c4)
      if (s1 && s1.key) setSettings(prev => ({
        ...prev,
        ...s1,
      }))
    } catch (e) {
      console.error(e)
      setMessage('Failed to load data')
    }
  }

  useEffect(() => { fetchAll() }, [])

  // Handlers
  const create = async (path, body) => {
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`${API}/api/${path}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
      })
      if (!res.ok) throw new Error('Request failed')
      await fetchAll()
      setMessage('Saved successfully')
    } catch (e) { setMessage('Error: ' + e.message) } finally { setLoading(false) }
  }

  const update = async (path, id, body) => {
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`${API}/api/${path}/${id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
      })
      if (!res.ok) throw new Error('Request failed')
      await fetchAll()
      setMessage('Updated')
    } catch (e) { setMessage('Error: ' + e.message) } finally { setLoading(false) }
  }

  const removeItem = async (path, id) => {
    if (!confirm('Delete this item?')) return
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`${API}/api/${path}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Request failed')
      await fetchAll()
      setMessage('Deleted')
    } catch (e) { setMessage('Error: ' + e.message) } finally { setLoading(false) }
  }

  const seed = async () => {
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`${API}/api/seed`, { method: 'POST' })
      if (!res.ok) throw new Error('Seeding failed')
      await fetchAll()
      setMessage('Sample data loaded')
    } catch (e) {
      setMessage('Error: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async (payload) => {
    setLoading(true)
    setMessage('')
    try {
      // create if none, else update by id
      if (!settings?.id) {
        const res = await fetch(`${API}/api/settings`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (!res.ok) throw new Error('Save failed')
      } else {
        const res = await fetch(`${API}/api/settings/${settings.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (!res.ok) throw new Error('Update failed')
      }
      await fetchAll()
      setMessage('Settings saved')
    } catch (e) {
      setMessage('Error: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-[#050b1b] text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin CMS</h1>
            <p className="text-white/60 mt-1">Manage categories, clients, projects, testimonials, and UI settings.</p>
          </div>
          <button onClick={seed} disabled={loading} className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500">{loading ? 'Working…' : 'Preload sample data'}</button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {['categories','clients','projects','testimonials','settings'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-1.5 text-sm border ${tab===t? 'border-white/60 bg-white/10' : 'border-white/10 bg-white/5'}`}>{t}</button>
          ))}
        </div>

        {message && <div className="mt-4 text-sm text-white/80">{message}</div>}

        {/* Categories */}
        {tab==='categories' && (
          <div className="mt-8 grid lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="font-semibold">Add Category</h2>
              <CategoryForm onSubmit={(data) => create('categories', data)} loading={loading} />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="font-semibold mb-3">Existing</h2>
              <List items={categories} fields={[['key'],['title'],['description']]} onUpdate={(id, data)=>update('categories',id,data)} onDelete={(id)=>removeItem('categories',id)} />
            </div>
          </div>
        )}

        {/* Clients */}
        {tab==='clients' && (
          <div className="mt-8 grid lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="font-semibold">Add Client</h2>
              <ClientForm categories={categories} onSubmit={(data) => create('clients', data)} loading={loading} />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="font-semibold mb-3">Existing</h2>
              <List items={clients} fields={[['name'],['category_key'],['description'],['logo_url']]} onUpdate={(id, data)=>update('clients',id,data)} onDelete={(id)=>removeItem('clients',id)} />
            </div>
          </div>
        )}

        {/* Projects */}
        {tab==='projects' && (
          <div className="mt-8 grid lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="font-semibold">Add Project</h2>
              <ProjectForm clients={clients} onSubmit={(data) => create('projects', data)} loading={loading} />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="font-semibold mb-3">Existing</h2>
              <List items={projects} fields={[['client_name'],['title'],['tag'],['description']]} onUpdate={(id, data)=>update('projects',id,data)} onDelete={(id)=>removeItem('projects',id)} />
            </div>
          </div>
        )}

        {/* Testimonials */}
        {tab==='testimonials' && (
          <div className="mt-8 grid lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="font-semibold">Add Testimonial</h2>
              <TestimonialForm onSubmit={(data) => create('testimonials', data)} loading={loading} />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="font-semibold mb-3">Existing</h2>
              <List items={testimonials} fields={[['name'],['role'],['company'],['rating'],['quote']]} onUpdate={(id, data)=>update('testimonials',id,data)} onDelete={(id)=>removeItem('testimonials',id)} />
            </div>
          </div>
        )}

        {/* Settings */}
        {tab==='settings' && (
          <div className="mt-8 grid gap-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="font-semibold mb-4">UI & Animation Settings</h2>
              <SettingsForm initial={settings} onSave={saveSettings} loading={loading} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function CategoryForm({ onSubmit, loading }) {
  const [form, setForm] = useState({ key: '', title: '', description: '' })
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSubmit(form);}} className="space-y-3">
      <TextInput label="Key" value={form.key} onChange={e=>setForm({...form, key:e.target.value})} required />
      <TextInput label="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
      <TextArea label="Description" rows={3} value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
      <button disabled={loading} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold">{loading? 'Saving...' : 'Save'}</button>
    </form>
  )
}

function ClientForm({ onSubmit, loading, categories }) {
  const [form, setForm] = useState({ name: '', category_key: '', description: '', logo_url: '' })
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSubmit(form);}} className="space-y-3">
      <TextInput label="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
      <label className="block">
        <span className="text-sm text-white/70">Category</span>
        <select value={form.category_key} onChange={e=>setForm({...form, category_key:e.target.value})} className="mt-1 w-full rounded-md bg-[#0b1633] border border-white/10 px-3 py-2 text-white focus:outline-none">
          <option value="">Select</option>
          {categories.map(c => <option key={c.id} value={c.key}>{c.title}</option>)}
        </select>
      </label>
      <TextArea label="Description" rows={3} value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
      <TextInput label="Logo URL" value={form.logo_url} onChange={e=>setForm({...form, logo_url:e.target.value})} />
      <button disabled={loading} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold">{loading? 'Saving...' : 'Save'}</button>
    </form>
  )
}

function ProjectForm({ onSubmit, loading, clients }) {
  const [form, setForm] = useState({ client_name: '', title: '', tag: '', description: '', images: '', link: '' })
  return (
    <form onSubmit={(e)=>{e.preventDefault(); const payload = { ...form, images: form.images? form.images.split(',').map(s=>s.trim()) : undefined }; onSubmit(payload);}} className="space-y-3">
      <label className="block">
        <span className="text-sm text-white/70">Client</span>
        <select value={form.client_name} onChange={e=>setForm({...form, client_name:e.target.value})} className="mt-1 w-full rounded-md bg-[#0b1633] border border-white/10 px-3 py-2 text-white focus:outline-none">
          <option value="">Select</option>
          {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </label>
      <TextInput label="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
      <TextInput label="Tag" value={form.tag} onChange={e=>setForm({...form, tag:e.target.value})} />
      <TextArea label="Description" rows={3} value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
      <TextInput label="Images (comma separated URLs)" value={form.images} onChange={e=>setForm({...form, images:e.target.value})} />
      <TextInput label="External Link" value={form.link} onChange={e=>setForm({...form, link:e.target.value})} />
      <button disabled={loading} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold">{loading? 'Saving...' : 'Save'}</button>
    </form>
  )
}

function TestimonialForm({ onSubmit, loading }) {
  const [form, setForm] = useState({ name: '', role: '', company: '', rating: 5, quote: '' })
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSubmit(form);}} className="space-y-3">
      <TextInput label="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
      <TextInput label="Role" value={form.role} onChange={e=>setForm({...form, role:e.target.value})} />
      <TextInput label="Company" value={form.company} onChange={e=>setForm({...form, company:e.target.value})} />
      <NumberInput label="Rating (0-5)" min={0} max={5} step={1} value={form.rating} onChange={e=>setForm({...form, rating: Number(e.target.value)})} />
      <TextArea label="Quote" rows={3} value={form.quote} onChange={e=>setForm({...form, quote:e.target.value})} required />
      <button disabled={loading} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold">{loading? 'Saving...' : 'Save'}</button>
    </form>
  )
}

function SettingsForm({ initial, onSave, loading }) {
  const [form, setForm] = useState(initial)
  useEffect(() => { setForm(initial) }, [initial])
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSave(form)}} className="grid md:grid-cols-2 gap-4">
      <NumberInput label="Marquee A seconds" min={5} max={120} step={0.5} value={form.marquee_a_seconds} onChange={e=>setForm({...form, marquee_a_seconds: Number(e.target.value)})} />
      <NumberInput label="Marquee B seconds" min={5} max={120} step={0.5} value={form.marquee_b_seconds} onChange={e=>setForm({...form, marquee_b_seconds: Number(e.target.value)})} />
      <NumberInput label="Glow intensity (0-1)" min={0} max={1} step={0.05} value={form.glow_intensity} onChange={e=>setForm({...form, glow_intensity: Number(e.target.value)})} />
      <NumberInput label="Parallax intensity (px)" min={0} max={40} step={1} value={form.parallax_intensity} onChange={e=>setForm({...form, parallax_intensity: Number(e.target.value)})} />
      <div className="md:col-span-2">
        <button disabled={loading} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold">{loading? 'Saving…' : 'Save Settings'}</button>
      </div>
    </form>
  )
}

function List({ items, fields, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({})

  const startEdit = (item) => { setEditing(item.id); setForm(item) }

  const FieldEditor = ({ name }) => (
    <input value={form?.[name] ?? ''} onChange={e=>setForm({...form, [name]: e.target.value})} className="w-full rounded-md bg-[#0b1633] border border-white/10 px-2 py-1 text-white text-sm" />
  )

  return (
    <div className="space-y-3">
      {items.map(it => (
        <div key={it.id} className="rounded-lg border border-white/10 p-3 flex items-center gap-3">
          <div className="grid grid-cols-3 gap-3 flex-1">
            {fields.map(([name]) => (
              <div key={name} className="text-sm text-white/80">
                <div className="text-[10px] uppercase tracking-wide text-white/50">{name}</div>
                {editing===it.id ? <FieldEditor name={name} /> : <div className="truncate">{String(it[name] ?? '')}</div>}
              </div>
            ))}
          </div>
          {editing===it.id ? (
            <div className="flex gap-2">
              <button onClick={()=>{ onUpdate(it.id, form); setEditing(null) }} className="text-xs px-2 py-1 rounded bg-green-600">Save</button>
              <button onClick={()=>setEditing(null)} className="text-xs px-2 py-1 rounded bg-slate-600">Cancel</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button onClick={()=>startEdit(it)} className="text-xs px-2 py-1 rounded bg-blue-600">Edit</button>
              <button onClick={()=>onDelete(it.id)} className="text-xs px-2 py-1 rounded bg-red-600">Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
