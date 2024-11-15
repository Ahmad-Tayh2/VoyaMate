import { createHmac } from 'crypto';


export function generateToken(userId:number,expiresInMinutes:number=10):string{
    const expirationTime = Date.now() + expiresInMinutes * 60 * 1000; 
    const secret_key=process.env.EMAIL_VERIFICATION_SECRET_KEY
    const hash = createHmac('sha256', secret_key) 
    .update(userId+ expirationTime.toString()) 
    .digest('hex');
    return `${hash}.${expirationTime}`
}


export const verifyToken = (userId: number, token: string): boolean => {
    const secret_key = process.env.EMAIL_VERIFICATION_SECRET_KEY;
    const tokenParts = token.split('.');
    if (tokenParts.length !== 2) {
        throw new Error("Invalid token format");
    }
    const [hash, expirationTime]=tokenParts;
    const currentTime = Date.now();
    
    if (!hash || !expirationTime || currentTime > parseInt(expirationTime)) {
        throw new Error("Invalid or expired token");
    }

    const expectedHash = createHmac('sha256', secret_key)
        .update(userId + expirationTime)
        .digest('hex');
    return expectedHash === hash;
};