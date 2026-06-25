import bcrypt, { compare } from "bcrypt";

export const authService = {
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    },

    async comparePassword(
        password: string,
        hash: string,
    ): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }
};


