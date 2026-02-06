import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { 
    ArrowLeft, 
    CheckCircle2, 
    Clock, 
    MessageSquare, 
    Paperclip, 
    ExternalLink, 
    History,
    Send,
    ShieldCheck,
    AlertCircle
} from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function SubTaskDetail({ subtaskId = "STK-003" }) {
    // Dummy Data Spesifik Sub-task (Nanti ini dari Backend)
    const subtask = {
        id: subtaskId,
        parent_task_id: "TSK-001",
        parent_task_title: "Alur sistem & Arsitektur API",
        title: "Revisi Desain Berdasarkan Feedback",
        status: "in-progress",
        assignee: "Andyto",
        deadline: "2025-11-25",
        figma_link: "https://figma.com/file/...",
        description: "Melakukan perbaikan pada section hero sesuai dengan feedback dari manager pada meeting tanggal 20. Pastikan warna sada-red sesuai brand guideline v2.",
        history: [
            { id: 1, user: "Andyto", action: "Updated figma link", time: "2 hours ago" },
            { id: 2, user: "Michael Chen", action: "Changed status to In Progress", time: "5 hours ago" },
        ],
        comments: [
            { id: 1, user: "Michael Chen", text: "Jangan lupa cek responsiveness-nya di ukuran tablet ya.", time: "1 hour ago", avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=1a1a1a&color=fff" }
        ]
    };

    return (
        <AppLayout breadcrumbs={[]}> {/* Breadcrumbs bisa disesuaikan */}
            <Head title={`Objective: ${subtask.id}`} />

            <div className="mx-auto w-full max-w-[1400px] p-6 md:p-10 flex flex-col gap-8 animate-in fade-in duration-700">
                
                {/* --- HEADER: NAVIGATION & QUICK ACTIONS --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white border border-border p-8 rounded-[40px] shadow-sm">
                    <div className="flex items-center gap-6">
                        <Link href="#" onClick={() => window.history.back()} className="size-12 rounded-2xl bg-muted/50 flex items-center justify-center hover:bg-sada-red hover:text-white transition-all group">
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        </Link>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-sada-red uppercase tracking-widest italic">{subtask.id}</span>
                                <div className="size-1 bg-border rounded-full" />
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-50">{subtask.parent_task_title}</span>
                            </div>
                            <h1 className="text-2xl font-black uppercase tracking-tighter italic text-foreground leading-none">{subtask.title}</h1>
                        </div>
                    </div>

                    <button className="flex items-center gap-3 px-8 h-12 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95">
                        <CheckCircle2 size={16} /> Mark as Secured
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* --- LEFT COLUMN: CORE INTELLIGENCE --- */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        
                        {/* 1. Technical Briefing */}
                        <div className="bg-white border border-border rounded-[40px] p-10 flex flex-col gap-6 shadow-sm">
                            <div className="flex items-center gap-3 border-b border-border pb-5">
                                <ShieldCheck className="text-sada-red" size={20} />
                                <h3 className="text-sm font-black uppercase tracking-widest italic">Technical Briefing</h3>
                            </div>
                            <p className="text-muted-foreground text-[13px] leading-relaxed italic font-medium">
                                {subtask.description}
                            </p>
                            
                            {/* Link Figma (Sangat krusial buat UI UX) */}
                            <a href={subtask.figma_link} target="_blank" className="flex items-center justify-between p-5 bg-muted/20 border border-border rounded-2xl hover:border-sada-red/30 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-xl bg-zinc-900 flex items-center justify-center text-white font-black italic">F</div>
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-black uppercase tracking-tight">Main Design File</span>
                                        <span className="text-[9px] font-bold text-muted-foreground opacity-60 uppercase">Click to open Figma Canvas</span>
                                    </div>
                                </div>
                                <ExternalLink size={16} className="text-muted-foreground group-hover:text-sada-red" />
                            </a>
                        </div>

                        {/* 2. Communication Hub (Comments) */}
                        <div className="bg-white border border-border rounded-[40px] p-10 flex flex-col gap-6 shadow-sm">
                            <div className="flex items-center gap-3 border-b border-border pb-5">
                                <MessageSquare className="text-sada-red" size={20} />
                                <h3 className="text-sm font-black uppercase tracking-widest italic">Communication Hub</h3>
                            </div>

                            <div className="space-y-6">
                                {subtask.comments.map(comment => (
                                    <div key={comment.id} className="flex gap-4">
                                        <img src={comment.avatar} className="size-10 rounded-xl border border-border shadow-sm shrink-0" />
                                        <div className="flex flex-col gap-2 flex-1">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[11px] font-black uppercase tracking-tight text-foreground italic">{comment.user}</span>
                                                <span className="text-[9px] font-bold text-muted-foreground uppercase opacity-40">{comment.time}</span>
                                            </div>
                                            <div className="bg-muted/30 p-4 rounded-2xl border border-border/50">
                                                <p className="text-[12px] font-medium text-muted-foreground italic">{comment.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Comment Input */}
                            <div className="mt-4 relative">
                                <textarea 
                                    placeholder="Add intelligence or feedback..." 
                                    className="w-full bg-zinc-50 border-border rounded-[24px] p-5 text-sm italic focus:ring-sada-red focus:border-sada-red min-h-[120px] resize-none pr-16"
                                />
                                <button className="absolute right-4 bottom-4 size-10 bg-sada-red text-white rounded-xl flex items-center justify-center shadow-lg shadow-sada-red/20 hover:bg-red-700 transition-all active:scale-95">
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: LOGISTICS & HISTORY --- */}
                    <div className="lg:col-span-1 flex flex-col gap-8">
                        
                        {/* Operational Details Card */}
                        <div className="bg-zinc-900 text-white rounded-[40px] p-8 shadow-2xl flex flex-col gap-6 relative overflow-hidden group">
                             <div className="absolute right-0 top-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                                <Clock size={100} />
                            </div>
                            <div className="relative z-10 space-y-6">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-black text-sada-red uppercase tracking-[0.3em]">Operational Status</span>
                                    <h4 className="text-2xl font-black italic uppercase tracking-tighter">{subtask.status.replace('-', ' ')}</h4>
                                </div>

                                <div className="space-y-4">
                                    <DetailRow label="Primary Operative" value={subtask.assignee} />
                                    <DetailRow label="Termination Date" value={subtask.deadline} />
                                    <DetailRow label="Attachments" value="03 Proofs" />
                                </div>
                            </div>
                        </div>

                        {/* Audit Trail (History) */}
                        <div className="bg-white border border-border rounded-[40px] p-8 flex flex-col gap-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <History size={16} className="text-sada-red" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">Audit Trail</span>
                            </div>
                            <div className="space-y-4">
                                {subtask.history.map(item => (
                                    <div key={item.id} className="flex flex-col gap-1 border-l-2 border-border pl-4 pb-2">
                                        <span className="text-[10px] font-black uppercase tracking-tight text-foreground">{item.user}</span>
                                        <span className="text-[9px] font-bold text-muted-foreground italic leading-none">{item.action}</span>
                                        <span className="text-[8px] font-bold text-muted-foreground/40 uppercase mt-1">{item.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Revision Warning (Conditional) */}
                        <div className="bg-sada-red/5 border border-sada-red/20 rounded-3xl p-6 flex items-start gap-4">
                            <AlertCircle className="text-sada-red shrink-0" size={18} />
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-sada-red uppercase tracking-widest">Protocol Alert</span>
                                <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-70 leading-relaxed">
                                    This sub-sector is under close monitoring due to multiple iteration cycles.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}

// Sub-component for Right Sidebar Info
const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
        <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">{label}</span>
        <span className="text-[11px] font-black uppercase tracking-tight text-white/90 italic">{value}</span>
    </div>
);