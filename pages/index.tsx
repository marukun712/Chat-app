import { useUser } from '@supabase/auth-helpers-react'
import LoginForm from '@/components/LoginForm';
import Message from '@/components/Message';
import Post from '@/components/Post';

export default function Home(): JSX.Element {
  const user = useUser()

  //認証していなければログインフォームを返す
  if (!user)
    return (
      <LoginForm />
    )

  return (
    <div>
      <Message />
      <Post />
    </div>
  )
}

