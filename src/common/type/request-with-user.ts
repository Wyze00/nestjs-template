import { Request } from 'express';

export class RequestWithUser extends Request {
    user?: any;
}
