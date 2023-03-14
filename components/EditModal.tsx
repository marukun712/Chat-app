import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { message, Props } from '@types'

export default function EditModal(props: Props): JSX.Element {
    const supabaseClient = useSupabaseClient()
    const [Text, SetText] = useState<string>('')
    var message: message = props.data

    //メッセージの更新
    async function Update(id: string) {
        const { error } = await supabaseClient
            .from('post')
            .update({ text: Text })
            .eq('id', id)

        SetText('')
    }

    return (
        <div className="modal modal-bottom sm:modal-middle" id='update-modal'>
            <div className="modal-box">
                <h1 className='font-bold text-2xl'>{message.text}</h1>
                <h3 className="font-bold py-5 text-lg">編集後のメッセージを入力してください。</h3>
                <input type="text" placeholder="テキストを入力..." className="input input-bordered p-50 input-lg flex" value={Text} onChange={function (e) { SetText(e.target.value) }} />
                <div className="modal-action">
                    <button onClick={() => {
                        Update(message.id)
                        let target = document.getElementById('update-modal') as HTMLElement
                        target.classList.toggle('modal-open');
                    }} className='btn text-white'>確定</button>
                    <button onClick={() => {
                        let target = document.getElementById('update-modal') as HTMLElement
                        target.classList.toggle('modal-open');
                    }} className='btn text-white'>キャンセル</button>
                </div>
            </div>
        </div>
    )
}