# country_dial_code

country_dial_code is a simple library that provides country information including dial code. Country list is from https://github.com/vanshg395/intl_phone_field.

Example:

```javascript

import { getCountryByCode, getDialCodeByCountryCode } from "country_dial_code";

const code = getDialCodeByCountryCode("US");
console.log(code); // 1

const country= getCountryByCode("US");
console.log(country); 

// {
//     name: 'United States',
//     nameTranslations: {
//       sk: 'Spojené štáty',
//       se: 'Amerihká ovttastuvvan stáhtat',
//       pl: 'Stany Zjednoczone',
//       no: 'USA',
//       ja: 'アメリカ合衆国',
//       it: 'Stati Uniti',
//       zh: '美国',
//       nl: 'Verenigde Staten',
//       de: 'Vereinigte Staaten',
//       fr: 'États-Unis',
//       es: 'Estados Unidos',
//       en: 'United States',
//       pt_BR: 'Estados Unidos',
//       'sr-Cyrl': 'Сједињене Америчке Државе',
//       'sr-Latn': 'Sjedinjene Američke Države',
//       zh_TW: '美國',
//       tr: 'Amerika Birleşik Devletleri',
//       ro: 'Statele Unite ale Americii',
//       ar: 'الولايات المتحدة',
//       fa: 'ایالات متحده آمریکا',
//       yue: '美利堅郃眾囯'
//     },
//     flag: '🇺🇸',
//     code: 'US',
//     dialCode: '1',
//     minLength: 10,
//     maxLength: 10
//   } 
```