import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { supabase } from 'supabase'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function LoginForm(): JSX.Element {
    //SupabaseのAuth-uiを使ったログインフォーム
    return (
        <div className='m-auto max-w-sm py-10'>
            <h1 className='text-2xl text-center color-white py-5'>Login</h1>
            <Auth
                redirectTo="https:/marukun712-chat-app.vercel.app/complete"
                appearance={{ theme: ThemeSupa }}
                supabaseClient={supabase}
                providers={['google']}
                socialLayout="horizontal"
            />
        </div>
    )
}