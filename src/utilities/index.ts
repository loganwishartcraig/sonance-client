export type OrNullify<I extends {}> = {
    [key in keyof I]: I[key] | null
};

export const Utilities = {

    decimalToHex: (dec: number): string => `0${dec.toString(16)}`.substr(-2),

    generateRandomId: ({
        delimiter = '-',
        partCount = 4,
    }: {
        delimiter?: string,
        partCount?: number
    } = {}): string => {

        if (window && window.crypto) {
            const randomValues = window.crypto.getRandomValues(new Uint8Array(partCount / 2));
            return Array.from(randomValues, Utilities.decimalToHex).join(delimiter);
        } {
            const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4() + S4() + S4()}`;
        }
    },

    cookieIsSet(cookieName: string, target: string = document.cookie): boolean {
        return new RegExp(`^(.*;)?\s*${cookieName}\s*=\s*[^;]`).test(target);
    },

    removeCookie(cookieName: string, target: string = document.cookie): void {
        // TODO: allow just removing the single cookie, not all cookies.
        document.cookie = `${cookieName}=; Path=/; Max-Age=0;`;
    },

    deepClone<T extends {}>(target: T): T {
        return JSON.parse(JSON.stringify(target));
    },

};
