import { CustomError } from "./custom.error";

export default class petNotFoundError extends CustomError{
    constructor() {
        super('Pet Not Found', '0001')
    }
}