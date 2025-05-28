// JWT Configuration
export const JWT_SECRET = process.env.TOKEN_SECRET || 'cyclebay_secure_jwt_secret_key_2024';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '240h';