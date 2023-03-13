import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { message, Props } from '@types'

export default function DeleteModal(props: Props): JSX.Element {
    const supabaseClient = useSupabaseClient()
    var message: message = props.data

    //メッセージの削除
    async function Delete(id: string) {
        const { error } = await supabaseClient
            .from('post')
            .delete()
            .eq('id', id)

        await window.location.reload();
    }

    return (
        <div className="modal modal-bottom sm:modal-middle" id='delete-modal'>
            <div className="modal-box">
                <h1 className='font-bold text-2xl'>{message.text}</h1>
                <h3 className="font-bold py-5 text-lg">このメッセージを削除しようとしています。</h3>
                <p>削除したメッセージは元に戻せません。</p>
                <div className="modal-action">
                    <button onClick={() => {
                        Delete(message.id)
                        let target = document.getElementById('delete-modal') as HTMLElement
                        target.classList.toggle('modal-open');
                    }} className='btn bg-red-500 text-white'>削除</button>
                    <button onClick={() => {
                        let target = document.getElementById('delete-modal') as HTMLElement
                        target.classList.toggle('modal-open');
                    }} className='btn text-white'>キャンセル</button>
                </div>
            </div>
        </div>
    )
}