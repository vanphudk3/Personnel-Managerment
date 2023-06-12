export class OverTime {
    id? : number;
    start_time? : string;
    end_time? : string;
    user_id? : number;
    number_of_hours? : number;
    status? : number;
    description? : string;
    created_at? : string;
    updated_at? : string;

    constructor(id: number, start_time: string, end_time: string, user_id: number, number_of_hours: number, status: number, description: string, created_at: string, updated_at: string) {
        this.id = id;
        this.start_time = start_time;
        this.end_time = end_time;
        this.user_id = user_id;
        this.number_of_hours = number_of_hours;
        this.status = status;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}