//投稿するメッセージの型
export type post = {
    text: string,
    postedby: string,
    postedat: string,
    user_id: string,
    iconurl: string,
    postedtime: string,
}

//受け取るメッセージの型
export type message = {
    text: string,
    postedby: string,
    postedat: string,
    user_id: string,
    iconurl: string,
    postedtime: string,
    id: string
}

//Propsの型
export type Props = {
    data: {
        text: string,
        postedby: string,
        postedat: string,
        user_id: string,
        iconurl: string,
        postedtime: string,
        id: string
    }
}

//メッセージの更新時に受け取るpayloadの型
export type payload = {
    "schema": string,
    "table": string,
    "commit_timestamp": string,
    "eventType": string,
    "new": {},
    "old": {},
    "errors": null
}