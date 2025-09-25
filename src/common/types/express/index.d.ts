// src/common/types/express/index.d.ts
import { JwtPayload } from '../auth.types';

declare global {
    namespace Express {
        export interface Request {
            user?: JwtPayload;
        }
    }
}
