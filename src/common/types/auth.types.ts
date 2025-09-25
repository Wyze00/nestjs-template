export interface JwtPayload {
    sub: string;
    iat: number;
    exp: number;
    refreshToken?: string;
}

export interface AccessTokenPayload {
    sub: string; // Subject (User ID)
    iat: number; // Issued At (Unix Timestamp)
    exp: number; // Expiration Time (Unix Timestamp)
}

export interface RefreshTokenPayload extends AccessTokenPayload {
    refreshToken: string;
}
