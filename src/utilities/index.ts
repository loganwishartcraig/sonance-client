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
        } else {
            const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4() + S4() + S4()}`;
        }
    },

};
