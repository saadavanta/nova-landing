import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const emptyForm = { title: '', slug: '', excerpt: '', content: '', featured_image: '', category: '', tags: [], author: '', publish_status: 'Draft' };

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try { setPosts(await base44.entities.BlogPost.list('-created_date', 100)); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setEditing(null); setForm(emptyForm); setDialogOpen(true); };
  const openEdit = (post) => { setEditing(post); setForm({ ...post, tags: post.tags || [] }); setDialogOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const payload = { ...form, slug, tags: Array.isArray(form.tags) ? form.tags : form.tags.split(',').map(t => t.trim()).filter(Boolean) };
      if (editing) await base44.entities.BlogPost.update(editing.id, payload);
      else await base44.entities.BlogPost.create(payload);
      setDialogOpen(false); fetchPosts();
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    await base44.entities.BlogPost.delete(id); fetchPosts();
  };

  const filtered = posts.filter(p => p.title?.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex h-96 items-center justify-center"><div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts..." className="pl-10" />
        </div>
        <Button onClick={openCreate} className="bg-gradient-to-r from-primary to-secondary"><Plus className="h-4 w-4" /> New Post</Button>
      </div>

      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Author</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-muted/30">
                  <td className="px-5 py-3">
                    <p className="font-medium text-foreground line-clamp-1">{post.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{post.excerpt}</p>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{post.category || '-'}</td>
                  <td className="px-5 py-3 text-muted-foreground">{post.author || '-'}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${post.publish_status === 'Published' ? 'bg-green-100 text-green-700' : post.publish_status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{post.publish_status}</span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground text-xs">{new Date(post.created_date).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(post)} className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"><Edit2 className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(post.id)} className="rounded-lg p-2 text-muted-foreground hover:bg-red-100 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="py-16 text-center"><p className="text-muted-foreground">No blog posts found.</p></div>}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? 'Edit Post' : 'New Blog Post'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated" /></div>
              <div><Label>Author</Label><Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} /></div>
            </div>
            <div><Label>Excerpt</Label><Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} /></div>
            <div><Label>Featured Image URL</Label><Input value={form.featured_image} onChange={(e) => setForm({ ...form, featured_image: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
              <div><Label>Tags (comma-separated)</Label><Input value={Array.isArray(form.tags) ? form.tags.join(', ') : form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} /></div>
            </div>
            <div>
              <Label>Content *</Label>
              <div className="mt-2">
                <ReactQuill theme="snow" value={form.content} onChange={(v) => setForm({ ...form, content: v })} style={{ height: '250px' }} />
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={form.publish_status} onValueChange={(v) => setForm({ ...form, publish_status: v })}>
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Published">Published</SelectItem><SelectItem value="Draft">Draft</SelectItem><SelectItem value="Scheduled">Scheduled</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving || !form.title || !form.content}>{saving ? 'Saving...' : 'Save Post'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}