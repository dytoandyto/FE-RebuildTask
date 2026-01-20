import React from 'react';
import { useForm } from '@inertiajs/react';
import { X, FolderPlus, Layout, Users, AlignLeft, Palette } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    workspaces: any[]; // Data workspace dari backend
    managers: any[];   // Data user/manager dari backend
}

export const CreateProjectModal = ({ isOpen, onClose, workspaces, managers }: Props) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        workspace_id: '',
        description: '',
        manager_id: '',
        color: 'from-blue-500 to-cyan-500', // Default gradasi
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/projects', {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const colorOptions = [
        { name: 'Ocean', value: 'from-blue-500 to-cyan-500' },
        { name: 'Royal', value: 'from-indigo-500 to-purple-500' },
        { name: 'Sada', value: 'from-sada-red to-red-700' },
        { name: 'Forest', value: 'from-emerald-500 to-teal-500' },
        { name: 'Sunset', value: 'from-orange-500 to-pink-500' },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-card border border-border w-full max-w-lg rounded-[32px] shadow-2xl shadow-black/20 overflow-hidden animate-in zoom-in-95 duration-300">
                
                {/* Header */}
                <div className="px-8 py-6 border-b border-border flex justify-between items-center bg-muted/20">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-sada-red flex items-center justify-center shadow-lg shadow-sada-red/20">
                            <FolderPlus className="text-white size-5" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black uppercase tracking-widest text-foreground">Initiate Project</h2>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase opacity-60">Deployment Phase 01</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    
                    {/* Project Name */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Project Identifier</label>
                        <div className="relative">
                            <Layout className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <input 
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="E.G. REDESIGN CORE SYSTEM"
                                className="w-full bg-muted/30 border-border rounded-2xl pl-11 py-3 text-xs font-bold uppercase tracking-tight focus:ring-sada-red focus:border-sada-red"
                            />
                        </div>
                        {errors.name && <p className="text-[10px] text-sada-red font-bold mt-1 uppercase">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Workspace Select */}
                        <select 
                            value={data.workspace_id}
                            onChange={e => setData('workspace_id', e.target.value)}
                            className="..."
                        >
                            <option value="">Select Sector</option>
                            {workspaces.map(ws => (
                                <option key={ws.id} value={ws.id}>{ws.name}</option>
                            ))}
                        </select>

                        {/* Manager Select */}
                        <select 
                            value={data.manager_id}
                            onChange={e => setData('manager_id', e.target.value)}
                            className="..."
                        >
                            <option value="">Assign Lead</option>
                            {managers.map(m => (
                                <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Strategic Overview</label>
                        <div className="relative">
                            <AlignLeft className="absolute left-4 top-4 size-4 text-muted-foreground" />
                            <textarea 
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={3}
                                placeholder="PROJECT OBJECTIVES AND SCOPE..."
                                className="w-full bg-muted/30 border-border rounded-2xl pl-11 py-3 text-xs font-medium focus:ring-sada-red"
                            />
                        </div>
                    </div>

                    {/* Color Picker Grid */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                            <Palette size={12} /> Visual Coding
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {colorOptions.map((color) => (
                                <button
                                    key={color.value}
                                    type="button"
                                    onClick={() => setData('color', color.value)}
                                    className={`size-8 rounded-lg bg-gradient-to-br ${color.value} border-2 transition-all ${data.color === color.value ? 'border-foreground scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        disabled={processing}
                        className="w-full bg-foreground text-background font-black uppercase tracking-[0.2em] py-4 rounded-2xl hover:bg-sada-red hover:text-white transition-all duration-300 disabled:opacity-50 mt-4 shadow-xl shadow-black/10"
                    >
                        {processing ? 'Deploying...' : 'Establish Project'}
                    </button>
                </form>
            </div>
        </div>
    );
};