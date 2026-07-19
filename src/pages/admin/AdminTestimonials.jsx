import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const emptyForm = { student_name: '', course: '', rating: 5, review: '', photo: '', graduation_year: '', featured: false, status: 'Published', display_order: 0 };

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try { setItems(await base44.entities.Testimonial.list('display_order', 100)); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setEditing(null); setForm(emptyForm); setDialogOpen(true); };
  const openEdit = (item) => { setEditing(item); setForm(item); setDialogOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...form, rating: Number(form.rating), display_order: Number(form.display_order) };
      if (editing) await base44.entities.Testimonial.update(editing.id, payload);
      else await base44.entities.Testimonial.create(payload);
      setDialogOpen(false); fetchItems();
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => { if (confirm('Delete this testimonial?')) { await base44.entities.Testimonial.delete(id); fetchItems(); } };

  if (loading) return <div className="flex h-96 items-center justify-center"><div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <div className="flex justify-end"><Button onClick={openCreate} className="bg-gradient-to-r from-primary to-secondary"><Plus className="h-4 w-4" /> Add Testimonial</Button></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <div key={t.id} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              {t.photo ? <img src={t.photo} alt={t.student_name} className="h-12 w-12 rounded-full object-cover" /> : <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">{t.student_name?.charAt(0)}</div>}
              <div className="flex-1">
                <p className="font-bold text-foreground">{t.student_name}</p>
                <p className="text-xs text-muted-foreground">{t.course}</p>
                <div className="mt-1 flex">{[...Array(5)].map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />)}</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{t.review}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${t.status === 'Published' ? 'bg-green-100 text-green-700' : t.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{t.status}</span>
              <div className="flex gap-1">
                <button onClick={() => openEdit(t)} className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"><Edit2 className="h-4 w-4" /></button>
                <button onClick={() => handleDelete(t.id)} className="rounded-lg p-2 text-muted-foreground hover:bg-red-100 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Student Name *</Label><Input value={form.student_name} onChange={(e) => setForm({ ...form, student_name: e.target.value })} /></div>
            <div><Label>Course *</Label><Input value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Rating</Label><Select value={String(form.rating)} onValueChange={(v) => setForm({ ...form, rating: Number(v) })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{[5,4,3,2,1].map(r => <SelectItem key={r} value={String(r)}>{r} Stars</SelectItem>)}</SelectContent></Select></div>
              <div><Label>Graduation Year</Label><Input value={form.graduation_year} onChange={(e) => setForm({ ...form, graduation_year: e.target.value })} /></div>
            </div>
            <div><Label>Review *</Label><Textarea value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} rows={4} /></div>
            <div><Label>Photo URL</Label><Input value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} /></div>
            <div className="flex gap-4">
              <div><Label>Status</Label><Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Published">Published</SelectItem><SelectItem value="Pending">Pending</SelectItem><SelectItem value="Rejected">Rejected</SelectItem></SelectContent></Select></div>
              <div><Label>Display Order</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: e.target.value })} className="w-24" /></div>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={handleSave} disabled={saving || !form.student_name || !form.review}>{saving ? 'Saving...' : 'Save'}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}