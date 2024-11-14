declare module 'country_dial_code' {
    interface NameTranslations {
      sk: string;
      se: string;
      pl: string;
      no: string;
      ja: string;
      it: string;
      zh: string;
      nl: string;
      de: string;
      fr: string;
      es: string;
      en: string;
      pt_BR: string;
      'sr-Cyrl': string;
      'sr-Latn': string;
      zh_TW: string;
      tr: string;
      ro: string;
      ar: string;
      fa: string;
      yue: string;
    }
  
    interface Country {
      name: string;
      nameTranslations: NameTranslations;
      flag: string;
      code: string;
      dialCode: string;
      minLength: number;
      maxLength: number;
    }
    export const countries: Country[];
  
  // Utility functions
  export function getCountryByDialCode(dialCode: string): Country | undefined;
  export function getCountryByCode(code: string): Country | undefined;
  export function getCountryByName(name: string): Country | undefined;
  export function getCountryByTranslatedName(name: string, language: keyof NameTranslations): Country | undefined;
}