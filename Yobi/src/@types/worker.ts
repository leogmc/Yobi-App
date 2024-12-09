import { Key } from "react";

export interface WorkerProps {
    id?: Key | null | undefined;
    city?: string;
    createAt?: string;
    name?: string;
    phone?: string;
    profession?: string;
    profilePhoto?: string;
    resume?: string;
    role?: string;
}