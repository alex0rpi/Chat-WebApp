export interface Note {
    id: string,
    author: string,
    text?: string,
    createdAt: string, // string because we'll be fetching JSON data, which does not admit Date objects.
}