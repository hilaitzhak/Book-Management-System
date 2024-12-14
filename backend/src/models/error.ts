export class BookError {
    public message: string;
    public statusCode: number;

    constructor(error?: BookError) {
        this.message = error?.message || 'Internal Server Error';
        this.statusCode = error?.statusCode || 500;
    }
}