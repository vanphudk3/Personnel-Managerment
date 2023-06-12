export class BreakTime {
    id? : number;
    start_time? : string;
    end_time? : string;
    user_id? : number;
    work_schedule_id? : number;
    status? : number;
    description? : string;
    created_at? : string;
    updated_at? : string;

    constructor(id: number, start_time: string, end_time: string, user_id: number, work_schedule_id: number, status: number, description: string, created_at: string, updated_at: string) {
        this.id = id;
        this.start_time = start_time;
        this.end_time = end_time;
        this.user_id = user_id;
        this.work_schedule_id = work_schedule_id;
        this.status = status;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}