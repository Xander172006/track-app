import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <h1 className='mt-4 mb-7 text-[2.25rem] font-extrabold text-orange-700'>Login</h1>
            <form onSubmit={submit} className='w-full'>
                <div>
                    
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full h-[3rem] text-white placeholder:text-gray-500 focus:outline-none focus:border-none"
                        placeholder="Email"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                  

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-6">

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full h-[3rem] text-white placeholder:text-gray-500 focus:outline-none focus:border-none"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex flex-row justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ml-2 sm:text-sm text-[0.8rem] text-orange-500">Remember me</span>
                    </label>
                    <label className='flex items-center'>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="sm:text-sm text-gray-300 hover:text-gray-500 transition duration-300 ease-in-out rounded-md"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </label>
                </div>

                <div className="flex items-center justify-center w-full mt-6">
                    <PrimaryButton className="w-full flex justify-center text-[1.20rem]" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
                    <div className='flex justify-center my-6 text-white text-[0.9rem]'>
                        <span>Don't have an account? </span><a className='font-bold ml-2 hover:text-gray-400 transition duration-300 ease-in-out' href="/register">Register</a>
                    </div>
            </form>
        </GuestLayout>
    );
}
