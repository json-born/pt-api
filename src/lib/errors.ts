export class ValidationError extends Error {
    public status: Number;
    public errors: Object;

    constructor(errors: Object) {
        super('Input Error');
        this.status = 400;
        this.errors = errors;
    }
}

export class BadRequestError extends Error {
    public status: Number;
    public errors: Object;

    constructor(message: string = 'Bad Request', errors: Object) {
        super(message);
        this.status = 400;
        this.errors = errors;
    }
}

export class CustomError extends Error {
    public status: Number;
    public errors: Object;

    constructor(status: number, message: string, errors: Object) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
}

export class AuthenticationError extends Error {
    public status: Number;
    public errors: Object;

    constructor(message: string, errors: Object) {
        super(message);
        this.status = 401;
        this.errors = errors;
    }
}
