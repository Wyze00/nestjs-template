export interface AccessTokenPayload {
    sub: string;
    iat: number;
    exp: number;
}

export interface RefreshTokenPayload extends AccessTokenPayload {
    refreshToken: string;
}
