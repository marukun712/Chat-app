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