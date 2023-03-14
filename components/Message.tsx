import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { message, payload } from '@types'
import EditModal from '@/components/EditModal';
import DeleteModal from '@/components/DeleteModal';

export default function Message(): JSX.Element {
    const supabaseClient = useSupabaseClient()
    //anyに逃げるな
    const user: any = useUser()
    const [Posts, setPosts] = useState<any>([])
    const [Data, SetData] = useState<any>([])

    useEffect(() => {
        //メッセージの取得
        async function loadData() {
            const { data } = await supabaseClient.from('post').select('*')
            setPosts(data)
        }

        const channel = supabaseClient
            .channel('chat')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: "post",
                },
                //Posts配列と新しいメッセージのオブジェクトを繋げる
                (payload: any) => setPosts((previous: []) => [].concat(previous, payload.new))
                //anyに逃げるな
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: "post",
                },
                //UPDATEされたメッセージのidとidが一致する要素を更新する
                (payload: any) => {
                    setPosts((previous: []) =>
                        previous.map((obj: any) => (obj.id === payload.old.id ? payload.new : obj))
                    );
                }
                //anyに逃げるな

            )
            .on(
                'postgres_changes',
                {
                    event: 'DELETE',
                    schema: 'public',
                    table: "post",
                },
                //DELETEされたメッセージをPosts配列から削除する
                (payload: any) => {
                    setPosts((previous: []) => previous.filter((obj: any) => payload.old.id !== obj.id));
                }
                //anyに逃げるな

            )
            .subscribe()

        //認証済みであればメッセージを読み込む
        if (user) loadData()
    }, [user])

    return (
        <div className='overflow-auto' style={{ height: '80vh' }}>
            {Posts.map(function (data: message) {
                //メッセージのユーザーIDとログイン中のユーザーIDが一致していたら削除ボタンを表示する
                if (data.user_id === user.id) {
                    return (
                        <div className='m-auto max-w-xl'>
                            <div className='flex space-x-2'>
                                <div className="avatar">
                                    <div className="w-8 rounded-full">
                                        <img src={data.iconurl} alt="Avater" />
                                    </div>
                                </div>

                                <h1>{data.postedby}</h1>
                                <h1>{data.postedtime}</h1>

                                <div className="dropdown">
                                    <label tabIndex={0} className="px-5">...</label>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><button onClick={() => {
                                            SetData(data)
                                            let target = document.getElementById('update-modal') as HTMLElement
                                            target.classList.toggle('modal-open');
                                        }} className='btn text-white'>メッセージを編集</button></li>
                                        <li><button onClick={() => {
                                            SetData(data)
                                            let target = document.getElementById('delete-modal') as HTMLElement
                                            target.classList.toggle('modal-open');
                                        }} className='btn bg-red-500 text-white'>メッセージを削除</button></li>
                                    </ul>
                                </div>

                            </div>

                            <h1 className='text-xl py-2'>{data.text}</h1>
                            <hr className='py-5 w-0'></hr>
                        </div>

                    )
                }

                return (
                    <div className='m-auto max-w-xl'>
                        <div className='flex space-x-2'>
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    <img src={data.iconurl} alt="Avater" />
                                </div>
                            </div>

                            <h1>{data.postedby}</h1>
                            <h1>{data.postedtime}</h1>
                        </div>

                        <h1 className='text-xl py-2'>{data.text}</h1>
                        <hr className='py-5 w-0'></hr>
                    </div>
                )

            })}

            <EditModal data={Data} />
            <DeleteModal data={Data} />
        </div>
    )
}