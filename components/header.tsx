import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'

export default function Header(): JSX.Element {
  const supabaseClient = useSupabaseClient()
  const user = useUser()

  //認証済みかどうかの確認
  if (!user)
    return (
      <></>
    )

  //認証済みであればヘッダーを返す
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Chat-app</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={user.user_metadata.avatar_url} />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li><a>Profile</a></li>
            <li><a>Settings</a></li>
            <li><button onClick={() => supabaseClient.auth.signOut()}>Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  )
}