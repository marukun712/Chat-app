import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { post } from '@types'

export default function Post(): JSX.Element {
    const supabaseClient = useSupabaseClient()
    const user = useUser()
    const [Text, SetText] = useState('')

    //メッセージをDBに保存する
    async function PostData(Text: string) {
        //認証済みかの確認
        if (user && Text !== '') {
            var day = new Date()
            var year = day.getFullYear();
            var month = day.getMonth();
            var date = day.getDate();
            var hour = day.getHours();
            var minutes = day.getMinutes();
            var seconds = day.getSeconds();

            var postedAt = `${year}-${month}-${date}`
            var postedTime = `${hour}:${minutes}:${seconds}`

            var post: post = { text: Text, postedby: user.user_metadata.name, postedat: postedAt, user_id: user.id, iconurl: user.user_metadata.avatar_url, postedtime: postedTime }

            const { error } = await supabaseClient
                .from('post')
                .insert(post)
            SetText('')
        } else {
            alert('テキストボックスに文字を入力してください。')
        }
    }

    return (
        <div>
            <div className='input space-x-9 w-screen flex fixed bottom-10'>
                <input type="text" placeholder="テキストを入力..." className="input input-bordered p-50 input-lg w-screen flex" value={Text} onChange={function (e) { SetText(e.target.value) }} />
                <button className="btn" onClick={() => PostData(Text)}>Post</button>
            </div>
        </div>
    )

}