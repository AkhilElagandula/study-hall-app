

// types/apiResponse.ts or somewhere globally accessible
export interface ApiResponse<T = any> {
    status: boolean;
    message: string;
    data: T;
}

export interface Payload {
    [key: string]: any;
}
