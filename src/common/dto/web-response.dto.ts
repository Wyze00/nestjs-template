export interface WebResponse<T> {
    data?: T;
    errors?: string | Record<string, any>;
}
