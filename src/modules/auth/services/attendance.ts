export interface Attendance {
    _id: string;
    employee: string;
    username?: string;
    date: Date;
    clockIn: Date;
    clockOut: Date;
}
