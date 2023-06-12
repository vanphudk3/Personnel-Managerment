export class Shift {
    id? : number;
    description? : string;
    start_time? : string;
    end_time? : string;
    group_id? : number;
    department_id? : number;
    created_at? : string;
    updated_at? : string;

    constructor(id: number, description: string, start_time: string, end_time: string, created_at: string, updated_at: string) {
        this.id = id;
        this.description = description;
        this.start_time = start_time;
        this.end_time = end_time;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}