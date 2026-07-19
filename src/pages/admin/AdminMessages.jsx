import { useState, useEffect } from 'react';
import { Search, Mail, MailOpen, Trash2, Reply } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    try { setMessages(await base44.entities.ContactMessage.list('-created_date', 100)); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    await base44.entities.ContactMessage.update(id, { status });
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    setSelected(prev => prev ? { ...prev, status } : null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    await base44.entities.ContactMessage.delete(id);
    setSelected(null);
    fetchMessages();
  };

  const filtered = messages.filter(m => m.name?.toLowerCase().includes(search.toLowerCase()) || m.email?.toLowerCase().includes(search.toLowerCase()) || m.subject?.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex h-96 items-center justify-center"><div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search messages..." className="pl-10" />
      </div>

      <div className="grid gap-3">
        {filtered.map((msg) => (
          <div key={msg.id} onClick={() => { setSelected(msg); if (msg.status === 'New') updateStatus(msg.id, 'Read'); }} className="cursor-pointer rounded-xl border border-border bg-white p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${msg.status === 'New' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  {msg.status === 'New' ? <Mail className="h-5 w-5" /> : <MailOpen className="h-5 w-5" />}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-semibold truncate ${msg.status === 'New' ? 'text-foreground' : 'text-muted-foreground'}`}>{msg.name}</p>
                    {msg.status === 'New' && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <p className="text-sm font-medium text-foreground truncate">{msg.subject}</p>
                  <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${msg.status === 'New' ? 'bg-blue-100 text-blue-700' : msg.status === 'Read' ? 'bg-gray-100 text-gray-600' : msg.status === 'Replied' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{msg.status}</span>
                <span className="text-xs text-muted-foreground">{new Date(msg.created_date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <div className="py-16 text-center"><p className="text-muted-foreground">No messages found.</p></div>}

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader><DialogTitle>{selected.subject}</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted/30 p-4">
                  <div><p className="text-xs text-muted-foreground">From</p><p className="font-medium">{selected.name}</p></div>
                  <div><p className="text-xs text-muted-foreground">Email</p><p className="font-medium truncate">{selected.email}</p></div>
                  {selected.phone && <div><p className="text-xs text-muted-foreground">Phone</p><p className="font-medium">{selected.phone}</p></div>}
                  <div><p className="text-xs text-muted-foreground">Date</p><p className="font-medium">{new Date(selected.created_date).toLocaleString()}</p></div>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <p className="text-sm text-foreground whitespace-pre-wrap">{selected.message}</p>
                </div>
                <div className="flex gap-2 border-t border-border pt-4">
                  <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} onClick={() => updateStatus(selected.id, 'Replied')} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary"><Reply className="h-4 w-4" /> Reply via Email</Button>
                  </a>
                  <Button variant="outline" onClick={() => handleDelete(selected.id)} className="border-red-300 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}