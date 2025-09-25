// src/common/types/express/index.d.ts
import { JwtPayload } from '../jwt-payload.type';

declare global {
    namespace Express {
        export interface Request {
            user?: JwtPayload;
        }
    }
}
