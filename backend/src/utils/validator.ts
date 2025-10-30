export class Validator {

    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isValidMatricula(matricula: string): boolean {
        return matricula.length >= 3 && matricula.length <= 20;
    }

    static isValidPhone(phone: string): boolean {
        const phoneRegex = /^[0-9]{10,15}$/;
        return phoneRegex.test(phone.replace(/[\s-]/g, ''));
    }

    static isValidPassword(password: string): boolean {
        return password.length >= 6;
    }

    static isValidCode(code: string, length: number = 6): boolean {
        const codeRegex = new RegExp(`^[0-9]{${length}}$`);
        return codeRegex.test(code);
    }

    static sanitizeString(str: string): string {
        return str.trim().replace(/[<>]/g, '');
    }
}