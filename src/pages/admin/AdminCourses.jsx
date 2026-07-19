import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Star } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const emptyForm = {
  title: '', slug: '', short_description: '', full_description: '', duration: '', fee: 0,
  level: 'Beginner', thumbnail: '', category: '', instructor: '', featured: false, status: 'Published', display_order: 0,
  curriculum: [], learning_outcomes: [],
};

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    try {
      const data = await base44.entities.Course.list('display_order', 50);
      setCourses(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setEditing(null); setForm(emptyForm); setDialogOpen(true); };
  const openEdit = (course) => { setEditing(course); setForm({ ...course, curriculum: course.curriculum || [], learning_outcomes: course.learning_outcomes || [] }); setDialogOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const payload = { ...form, slug, fee: Number(form.fee), display_order: Number(form.display_order) };
      if (editing) {
        await base44.entities.Course.update(editing.id, payload);
      } else {
        await base44.entities.Course.create(payload);
      }
      setDialogOpen(false);
      fetchCourses();
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this course?')) return;
    await base44.entities.Course.delete(id);
    fetchCourses();
  };

  const filtered = courses.filter(c => c.title?.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex h-96 items-center justify-center"><div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search courses..." className="pl-10" />
        </div>
        <Button onClick={openCreate} className="bg-gradient-to-r from-primary to-secondary"><Plus className="h-4 w-4" /> Add Course</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => (
          <div key={course.id} className="group rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
            <div className="relative h-40 overflow-hidden">
              {course.thumbnail ? (
                <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center bg-muted"><span className="text-muted-foreground">No image</span></div>
              )}
              <div className="absolute top-2 left-2 flex gap-1.5">
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${course.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{course.status}</span>
                {course.featured && <span className="rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-xs font-semibold flex items-center gap-0.5"><Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Featured</span>}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-foreground line-clamp-1">{course.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{course.short_description}</p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <span className="text-lg font-extrabold text-primary">Rs {course.fee?.toLocaleString()}</span>
                  <span className="ml-1 text-xs text-muted-foreground">{course.duration}</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(course)} className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"><Edit2 className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(course.id)} className="rounded-lg p-2 text-muted-foreground hover:bg-red-100 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? 'Edit Course' : 'Add New Course'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated" /></div>
            </div>
            <div><Label>Short Description</Label><Textarea value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} rows={2} /></div>
            <div><Label>Full Description</Label><Textarea value={form.full_description} onChange={(e) => setForm({ ...form, full_description: e.target.value })} rows={4} /></div>
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Duration *</Label><Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="3 Months" /></div>
              <div><Label>Fee (Rs) *</Label><Input type="number" value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })} /></div>
              <div>
                <Label>Level</Label>
                <Select value={form.level} onValueChange={(v) => setForm({ ...form, level: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Beginner">Beginner</SelectItem><SelectItem value="Intermediate">Intermediate</SelectItem><SelectItem value="Advanced">Advanced</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
              <div><Label>Instructor</Label><Input value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} /></div>
            </div>
            <div><Label>Thumbnail URL</Label><Input value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Curriculum (one per line)</Label><Textarea value={(form.curriculum || []).join('\n')} onChange={(e) => setForm({ ...form, curriculum: e.target.value.split('\n').filter(Boolean) })} rows={4} /></div>
              <div><Label>Learning Outcomes (one per line)</Label><Textarea value={(form.learning_outcomes || []).join('\n')} onChange={(e) => setForm({ ...form, learning_outcomes: e.target.value.split('\n').filter(Boolean) })} rows={4} /></div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2"><Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} /><Label>Featured</Label></div>
              <div>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Published">Published</SelectItem><SelectItem value="Draft">Draft</SelectItem><SelectItem value="Archived">Archived</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2"><Label>Order</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: e.target.value })} className="w-20" /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving || !form.title || !form.duration}>{saving ? 'Saving...' : 'Save Course'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}