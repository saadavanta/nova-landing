import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const emptyForm = { question: '', answer: '', category: 'General', display_order: 0, status: 'Published' };

export default function AdminFAQs() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try { setItems(await base44.entities.FAQ.list('display_order', 100)); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setEditing(null); setForm(emptyForm); setDialogOpen(true); };
  const openEdit = (item) => { setEditing(item); setForm(item); setDialogOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...form, display_order: Number(form.display_order) };
      if (editing) await base44.entities.FAQ.update(editing.id, payload);
      else await base44.entities.FAQ.create(payload);
      setDialogOpen(false); fetchItems();
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => { if (confirm('Delete this FAQ?')) { await base44.entities.FAQ.delete(id); fetchItems(); } };

  if (loading) return <div className="flex h-96 items-center justify-center"><div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <div className="flex justify-end"><Button onClick={openCreate} className="bg-gradient-to-r from-primary to-secondary"><Plus className="h-4 w-4" /> Add FAQ</Button></div>
      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
        <div className="divide-y divide-border">
          {items.map((faq) => (
            <div key={faq.id} className="flex items-start justify-between gap-4 p-4 hover:bg-muted/30">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{faq.category}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${faq.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{faq.status}</span>
                </div>
                <p className="font-semibold text-foreground">{faq.question}</p>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{faq.answer}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(faq)} className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"><Edit2 className="h-4 w-4" /></button>
                <button onClick={() => handleDelete(faq.id)} className="rounded-lg p-2 text-muted-foreground hover:bg-red-100 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
        {items.length === 0 && <div className="py-16 text-center"><p className="text-muted-foreground">No FAQs found.</p></div>}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? 'Edit FAQ' : 'Add FAQ'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Question *</Label><Input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} /></div>
            <div><Label>Answer *</Label><Textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={4} /></div>
            <div className="flex gap-4">
              <div><Label>Category</Label><Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}><SelectTrigger className="w-48"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Enrollment">Enrollment</SelectItem><SelectItem value="Payments">Payments</SelectItem><SelectItem value="Courses">Courses</SelectItem><SelectItem value="Certificates">Certificates</SelectItem><SelectItem value="Technical Support">Technical Support</SelectItem><SelectItem value="General">General</SelectItem></SelectContent></Select></div>
              <div><Label>Status</Label><Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}><SelectTrigger className="w-36"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Published">Published</SelectItem><SelectItem value="Draft">Draft</SelectItem></SelectContent></Select></div>
              <div><Label>Order</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: e.target.value })} className="w-24" /></div>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={handleSave} disabled={saving || !form.question || !form.answer}>{saving ? 'Saving...' : 'Save'}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}