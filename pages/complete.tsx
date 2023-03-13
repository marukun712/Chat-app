import Confetti from 'react-confetti'
import useWindowSize from "@/hooks/useWindowSize";
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Complete(): JSX.Element {
    const router = useRouter()
    const [time, setTime] = useState(3)

    useEffect(() => {
        function redirect() {
            router.replace('/')
        }

        setTimeout(redirect, 3000)//5秒待ってからリダイレクト

        //タイマー
        const timer = setInterval(() => {
            setTime(t => t - 1);
        }, 1000);
        return () => clearInterval(timer);

    }, [])

    //ウィンドウのサイズを取得
    const [width, height] = useWindowSize();

    return (
        <div className="party">
            <Confetti
                width={width}
                height={height}
                recycle={true}
            />
            <h1 className="text-2xl text-center py-16">認証に成功しました!</h1>
            <h1 className='text-xl text-center py-10'>{time}秒後にリダイレクト</h1>
        </div>
    )
}