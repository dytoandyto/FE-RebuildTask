import { useState } from 'react'; // 1. Tambahin ini
import { FileIcon, ImageIcon, FileTextIcon, ExternalLink, Download, Search, LayoutGrid, FileX } from 'lucide-react';

interface Props {
    task: any;
}

export const TaskDocuments = ({ task }: Props) => {
    // 2. Tambah State untuk search
    const [searchQuery, setSearchQuery] = useState("");

    const documents = [
        { id: 1, name: 'site_survey_v1.png', size: '2.4 MB', type: 'image', date: '12 Jan 2026', uploader: 'Andyto' },
        { id: 2, name: 'technical_specs.pdf', size: '1.1 MB', type: 'pdf', date: '13 Jan 2026', uploader: 'Michael' },
        { id: 3, name: 'budget_analysis.xlsx', size: '850 KB', type: 'excel', date: '14 Jan 2026', uploader: 'Sarah' },
        { id: 4, name: 'initial_briefing.docx', size: '450 KB', type: 'word', date: '14 Jan 2026', uploader: 'Andyto' },
    ];

    // 3. Logic Filter: Nyari berdasarkan nama
    const filteredDocuments = documents.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'image': return <ImageIcon className="text-blue-500" size={24} />;
            case 'excel': return <FileTextIcon className="text-emerald-500" size={24} />;
            default: return <FileIcon className="text-sada-red" size={24} />;
        }
    };

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* --- TOP BAR: SEARCH & FILTER --- */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/10 p-4 rounded-2xl border border-border">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search evidence..."
                        value={searchQuery} // 4. Hubungin ke state
                        onChange={(e) => setSearchQuery(e.target.value)} // 5. Update state pas diketik
                        className="w-full bg-background border-border rounded-xl pl-10 text-[10px] font-black uppercase tracking-widest focus:ring-sada-red"
                    />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-background px-3 py-1.5 rounded-lg border border-border">
                    <LayoutGrid size={14} /> Grid View
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    {/* 6. Cek kalau hasil filter kosong */}
                    {filteredDocuments.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filteredDocuments.map((doc) => (
                                <div key={doc.id} className="group bg-background border border-border rounded-2xl p-4 hover:border-sada-red/40 transition-all shadow-sm flex flex-col gap-4">
                                    <div className="size-full aspect-video bg-muted/30 rounded-xl flex items-center justify-center border border-dashed border-border group-hover:bg-muted/50 transition-colors">
                                        {getFileIcon(doc.type)}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[11px] font-black text-foreground uppercase truncate">{doc.name}</span>
                                        <div className="flex justify-between items-center opacity-60">
                                            <span className="text-[8px] font-bold text-muted-foreground uppercase">{doc.size} • {doc.date}</span>
                                            <button className="text-sada-red hover:scale-110 transition-transform">
                                                <Download size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // 7. Tampilan kalau nggak ketemu apa-apa
                        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-border rounded-[32px] opacity-50">
                            <FileX size={48} className="text-muted-foreground mb-4" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">No matching intelligence found</p>
                        </div>
                    )}
                </div>

                {/* --- KANAN: EXTERNAL LINKS & SUMMARY --- */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bg-muted/10 border border-border rounded-[32px] p-8 flex flex-col gap-6 shadow-inner">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">External Intelligence</span>

                        <div className="flex flex-col gap-3">
                            {[
                                { label: 'Figma Design', url: 'https://figma.com/...' },
                                { label: 'Tech Documentation', url: 'https://notion.so/...' },
                                { label: 'Source Repository', url: 'https://github.com/...' }
                            ].map((link, i) => (
                                <a key={i} href={link.url} target="_blank" className="flex items-center justify-between p-4 bg-background border border-border rounded-xl hover:text-sada-red transition-all group">
                                    <span className="text-[10px] font-black uppercase tracking-tight">{link.label}</span>
                                    <ExternalLink size={14} className="opacity-40 group-hover:opacity-100" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 border border-dashed border-border rounded-[32px] bg-sada-red/5">
                        <span className="text-[8px] font-black text-sada-red uppercase tracking-[0.3em] block mb-2">Storage Status</span>
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">Cloud Capacity</span>
                            <span className="text-[10px] font-black text-foreground uppercase">75% Used</span>
                        </div>
                        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-sada-red" style={{ width: '75%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};