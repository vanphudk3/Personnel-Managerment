export class BreakTimeLog {
    id? : number;
    start_time? : string;
    end_time? : string;
    user_id? : number;
    group_id? : number;
    department_id? : number;
    created_by? : number;
    created_at? : string;
    updated_at? : string;

    constructor(id: number, start_time: string, end_time: string, user_id: number, group_id: number, department_id: number, created_by: number, created_at: string, updated_at: string) {
        this.id = id;
        this.start_time = start_time;
        this.end_time = end_time;
        this.user_id = user_id;
        this.group_id = group_id;
        this.department_id = department_id;
        this.created_by = created_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}