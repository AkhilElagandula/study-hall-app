

// types/apiResponse.ts or somewhere globally accessible
export interface ApiResponse<T = unknown> {
    status: boolean;
    message: string;
    data: T;
}

export interface Payload {
    [key: string]: unknown;
}
