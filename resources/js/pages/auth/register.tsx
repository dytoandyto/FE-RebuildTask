import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { Building2, Compass, Lock, Mail, User } from 'lucide-react';

export default function Register() {
    return (
        <AuthLayout
            title="Create an account"
            description="Enter your details below to create your account"
        >
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <div className='relative'>
                                    <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="name"
                                        placeholder="Full name"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200/60 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:bg-white focus:border-blue-300 transition-all"
                                    />
                                </div>
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="company_name">Company Name</Label>
                                <div className='relative'>
                                    <Building2 size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <Input
                                        id="company_name"
                                        type="text"
                                        required
                                        tabIndex={2}
                                        autoComplete="organization"
                                        name="company_name"
                                        placeholder="Company"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200/60 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:bg-white focus:border-blue-300 transition-all"
                                    />
                                </div>
                                <InputError
                                    message={errors.company_name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <div className='relative'>
                                    <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={3}
                                        autoComplete="email"
                                        name="email"
                                        placeholder="email@example.com"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200/60 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:bg-white focus:border-blue-300 transition-all"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <div className='relative'>
                                    <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="Password"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200/60 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:bg-white focus:border-blue-300 transition-all"
                                    />
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={5}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                    className="w-full pl-4 pr-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200/60 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:bg-white focus:border-blue-300 transition-all"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                                tabIndex={6}
                                data-test={processing}
                            >
                                {processing && <Spinner />}
                                Create account
                            </Button>
                        </div>
                    </>
                )}
            </Form>
            <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-500">Or continue with</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <button className="px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200/60 hover:bg-slate-100/50 hover:border-slate-300 transition-all duration-200 flex items-center justify-center gap-2 text-slate-700">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="text-sm">Google</span>
                </button>

                <button className="px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200/60 hover:bg-slate-100/50 hover:border-slate-300 transition-all duration-200 flex items-center justify-center gap-2 text-slate-700">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="text-sm">GitHub</span>
                </button>
            </div>
            <div className="text-center text-sm text-slate-500 mt-2">
                Already have an account?{' '}
                <TextLink href={login()} tabIndex={7} className='text-blue-600 hover:text-blue-700 transition-colors'>
                    Log in
                </TextLink>
            </div>
        </AuthLayout>
    );
}