export class WorkSchedule {
    id? : number;
    date? : string;
    description? : string;
    group_id? : number;
    department_id? : number;
    created_at? : string;
    updated_at? : string;

    constructor(id: number, date: string, description: string, group_id: number, department_id: number, created_at: string, updated_at: string) {
        this.id = id;
        this.date = date;
        this.description = description;
        this.group_id = group_id;
        this.department_id = department_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
