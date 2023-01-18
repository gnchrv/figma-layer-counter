// An interface for the object returned by the counting function
export interface Counter {
    total: number;
    hidden: number;
    topLevel?: number;
    types?: Record<string, number>;
}
