import { useUser } from '@supabase/auth-helpers-react'
import LoginForm from '@/components/LoginForm';
import Message from '@/components/Message';
import Post from '@/components/Post';
import Head from 'next/head';

export default function Home(): JSX.Element {
  const user = useUser()

  //認証していなければログインフォームを返す
  if (!user)
    return (
      <div>
        <Head>
          <title>Chat-app:Login</title>
          <meta property="og:title" content="Chat-app:Login" />
          <meta property="og:description" content="Supabaseを使って作られた簡単なチャットアプリ。" />
          <meta property="og:url" content="https://marukun712-chat-app.vercel.app/" />
          <meta property="og:image" content="https://avatars.githubusercontent.com/u/54469796?s=280&v=4" />
          <meta property="og:title" content="Chat-app" />
        </Head>
        <LoginForm />
      </div>
    )

  return (
    <div>
      <Head>
        <title>Chat-app</title>
        <meta property="og:title" content="Chat-app" />
        <meta property="og:description" content="Supabaseを使って作られた簡単なチャットアプリ。" />
        <meta property="og:url" content="https://marukun712-chat-app.vercel.app/" />
        <meta property="og:image" content="https://avatars.githubusercontent.com/u/54469796?s=280&v=4" />
        <meta property="og:title" content="Chat-app" />
      </Head>
      <Message />
      <Post />
    </div>
  )
}

