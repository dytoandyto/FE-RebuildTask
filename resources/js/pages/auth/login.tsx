import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { LoginField } from '@/layouts/login/login_input';
import { SocialButtons } from '@/layouts/login/sosial_button';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { Mail, Lock, EyeOff, Eye } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({ status, canResetPassword, canRegister }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthLayout
            title="Log in to your account"
            description="Enter your email and password below to log in"
        >
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-5">
                            {/* Email Field */}
                            <LoginField
                                id="email"
                                type="email"
                                label="Email address"
                                autoComplete="email"
                                icon={Mail}
                                placeholder="your@company.com"
                            >
                                <InputError message={errors.email} className="mt-1" />
                            </LoginField>
                            {/* Password Field */}
                            <LoginField
                                id="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                icon={Lock}
                                placeholder="Password"
                                autoComplete="current-password" >
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                                <InputError message={errors.password} className="mt-1" />
                            </LoginField>


                            {/* Remember Me */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-300/50"
                                    />
                                    <span className="text-slate-600 text-sm group-hover:text-slate-800 transition-colors">
                                        Remember me
                                    </span>
                                </label>
                                {canResetPassword && (
                                    <TextLink
                                        href={request()}
                                        className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
                                        tabIndex={5}
                                    >
                                        Forgot password?
                                    </TextLink>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                                tabIndex={4}
                                disabled={processing}
                            >
                                {processing && <Spinner />}
                                Log in
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
                    <span className="px-4 bg-background text-muted-foreground ">Or continue with</span>
                </div>
            </div>

            <SocialButtons />

            {canRegister && (
                <div className="text-center text-sm text-slate-500 mt-2">
                    Don't have an account?{' '}
                    <TextLink href={register()} className='text-blue-600 hover:text-blue-700 transition-colors'>
                        Sign up
                    </TextLink>
                </div>
            )}

            {status && (
                <div className="mt-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}