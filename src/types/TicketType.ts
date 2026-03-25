interface ITicket{
    ticket_id: number,
    ticket_title: string,
    ticket_body: string,
    user_created: number,
    user_performed: number,
    user_dept: number,
    ticket_type?: string,
    ticket_status: string,
    ticket_priority?: string,
    ticket_category?: number,
    ticket_subcategory?: number,
    ticket_created: Date | string,
    ticket_performed?: Date | string,
    deleted: boolean;
}

interface IComment{
    comment_id: number,
    comment_date: Date | string,
    comment_user: number,
    comment_body: string,
    ticket_id: number,
    deleted: boolean;
}

export {type ITicket, type IComment}