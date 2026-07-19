import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Megaphone } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const emptyForm = { title: '', message: '', audience: 'All Students', publish_date: '', expiry_date: '', status: 'Active' };

export default function AdminAnnouncements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try { setItems(await base44.entities.Announcement.list('-created_date', 100)); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setEditing(null); setForm(emptyForm); setDialogOpen(true); };
  const openEdit = (item) => { setEditing(item); setForm(item); setDialogOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...form, publish_date: form.publish_date ? new Date(form.publish_date).toISOString() : new Date().toISOString() };
      if (editing) await base44.entities.Announcement.update(editing.id, payload);
      else await base44.entities.Announcement.create(payload);
      setDialogOpen(false); fetchItems();
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => { if (confirm('Delete this announcement?')) { await base44.entities.Announcement.delete(id); fetchItems(); } };

  if (loading) return <div className="flex h-96 items-center justify-center"><div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <div className="flex justify-end"><Button onClick={openCreate} className="bg-gradient-to-r from-primary to-secondary"><Plus className="h-4 w-4" /> New Announcement</Button></div>
      <div className="grid gap-3">
        {items.map((ann) => (
          <div key={ann.id} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${ann.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  <Megaphone className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-foreground">{ann.title}</p>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${ann.status === 'Active' ? 'bg-green-100 text-green-700' : ann.status === 'Draft' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-700'}`}>{ann.status}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{ann.message}</p>
                  <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                    <span>Audience: {ann.audience}</span>
                    {ann.publish_date && <span>Published: {new Date(ann.publish_date).toLocaleDateString()}</span>}
                    {ann.expiry_date && <span>Expires: {new Date(ann.expiry_date).toLocaleDateString()}</span>}
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(ann)} className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"><Edit2 className="h-4 w-4" /></button>
                <button onClick={() => handleDelete(ann.id)} className="rounded-lg p-2 text-muted-foreground hover:bg-red-100 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="py-16 text-center"><p className="text-muted-foreground">No announcements yet.</p></div>}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? 'Edit Announcement' : 'New Announcement'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Message *</Label><Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Audience</Label><Select value={form.audience} onValueChange={(v) => setForm({ ...form, audience: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="All Students">All Students</SelectItem><SelectItem value="Selected Course">Selected Course</SelectItem><SelectItem value="Individual Student">Individual Student</SelectItem></SelectContent></Select></div>
              <div><Label>Status</Label><Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Active">Active</SelectItem><SelectItem value="Draft">Draft</SelectItem><SelectItem value="Expired">Expired</SelectItem></SelectContent></Select></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Expiry Date</Label><Input type="date" value={form.expiry_date || ''} onChange={(e) => setForm({ ...form, expiry_date: e.target.value })} /></div>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={handleSave} disabled={saving || !form.title || !form.message}>{saving ? 'Saving...' : 'Publish'}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}