export type StatusType = 'error' | 'success';

export interface LoginResponseInterface {
    status: StatusType,
    message?: string,
    token?: string,
    username?: string
}

export interface FilmsPostResponseInterface {
    status: StatusType,
    message: string
}

export interface FilmsInterface {
    id?: number,
    date: string,
    title: string,
    content: string,
    author: string
}