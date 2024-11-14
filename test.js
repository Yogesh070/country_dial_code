import {
    countries,
    getCountryByCode,
    getCountryByDialCode,
    getLocalizedName
  } from './index.js';
  
  describe('Country List Tests', () => {
    describe('Country List Structure', () => {
      test('countries array should be defined', () => {
        expect(countries).toBeDefined();
        expect(Array.isArray(countries)).toBeTruthy();
      });
  
      test('each country should have required properties', () => {
        countries.forEach(country => {
          expect(country).toHaveProperty('name');
          expect(country).toHaveProperty('nameTranslations');
          expect(country).toHaveProperty('flag');
          expect(country).toHaveProperty('code');
          expect(country).toHaveProperty('dialCode');
          expect(country).toHaveProperty('minLength');
          expect(country).toHaveProperty('maxLength');
        });
      });
  
      test('country codes should be unique', () => {
        const codes = countries.map(country => country.code);
        const uniqueCodes = new Set(codes);
        expect(codes.length).toBe(uniqueCodes.size);
      });
    });
  
    describe('getCountryByCode', () => {
      test('should return correct country for valid code', () => {
        const us = getCountryByCode('US');
        expect(us).toBeDefined();
        expect(us.name).toBe('United States');
        expect(us.dialCode).toBe('1');
      });
  
      test('should return undefined for invalid code', () => {
        expect(getCountryByCode('XX')).toBeUndefined();
      });
  
      test('should be case sensitive', () => {
        expect(getCountryByCode('us')).toBeUndefined();
        expect(getCountryByCode('US')).toBeDefined();
      });
    });
  
    describe('getCountryByDialCode', () => {
        test('should return a country for valid dial code', () => {
          const uk = getCountryByDialCode('44');
          expect(uk).toBeDefined();
          expect(uk.dialCode).toBe('44');
        });
    
        test('should handle shared dial codes', () => {
          const dialCode44Countries = countries.filter(country => country.dialCode === '44');
          expect(dialCode44Countries.length).toBeGreaterThan(1);
          expect(dialCode44Countries.map(c => c.name)).toContain('United Kingdom');
          expect(dialCode44Countries.map(c => c.name)).toContain('Guernsey');
        });
    
        test('should return undefined for invalid dial code', () => {
          expect(getCountryByDialCode('999')).toBeUndefined();
        });
    
        test('should handle dial codes with multiple digits', () => {
          const india = getCountryByDialCode('91');
          expect(india).toBeDefined();
          expect(india.name).toBe('India');
          expect(india.code).toBe('IN');
        });
    
        test('should return correct country for unique dial codes', () => {
          // Test with a country that has a unique dial code
          const france = getCountryByDialCode('33');
          expect(france).toBeDefined();
          expect(france.name).toBe('France');
          expect(france.code).toBe('FR');
        });
      });
    
    describe('getLocalizedName', () => {
      test('should return localized name for supported language', () => {
        const germany = countries.find(country => country.code === 'DE');
        expect(getLocalizedName(germany, 'de')).toBe('Deutschland');
        expect(getLocalizedName(germany, 'fr')).toBe('Allemagne');
        expect(getLocalizedName(germany, 'es')).toBe('Alemania');
      });
  
      test('should return default name for unsupported language', () => {
        const france = countries.find(country => country.code === 'FR');
        expect(getLocalizedName(france, 'xx')).toBe('France');
      });
  
      test('should handle undefined language code', () => {
        const italy = countries.find(country => country.code === 'IT');
        expect(getLocalizedName(italy, undefined)).toBe('Campione d\'Italia');
      });
    });
  
    describe('Phone Number Length Validation', () => {
      test('minLength should not be greater than maxLength', () => {
        countries.forEach(country => {
          expect(country.minLength).toBeLessThanOrEqual(country.maxLength);
        });
      });
  
      test('length values should be positive numbers', () => {
        countries.forEach(country => {
          expect(country.minLength).toBeGreaterThan(0);
          expect(country.maxLength).toBeGreaterThan(0);
        });
      });
    });
  
    describe('Flag Emoji Validation', () => {
      test('all flags should be valid emoji flags', () => {
        const flagRegex = /^[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]$/;
        countries.forEach(country => {
          expect(flagRegex.test(country.flag)).toBeTruthy();
        });
      });
    });
  
    describe('Name Translations', () => {
      test('all countries should have translations for common languages', () => {
        const requiredLanguages = ['en', 'es', 'fr', 'de', 'zh'];
        countries.forEach(country => {
          requiredLanguages.forEach(lang => {
            expect(country.nameTranslations).toHaveProperty(lang);
            expect(country.nameTranslations[lang]).toBeTruthy();
          });
        });
      });
  
      test('translations should be non-empty strings', () => {
        countries.forEach(country => {
          Object.values(country.nameTranslations).forEach(translation => {
            expect(typeof translation).toBe('string');
            expect(translation.length).toBeGreaterThan(0);
          });
        });
      });
    });
  
    describe('Edge Cases', () => {
      test('should handle countries with shared dial codes', () => {
        const usDialCode = '1';
        const countriesWithUS = countries.filter(country => country.dialCode === usDialCode);
        expect(countriesWithUS.length).toBeGreaterThan(1);
      });
  
      test('should handle special characters in country names', () => {
        const specialChars = countries.filter(country => /[àáâäãåèéêëìíîïòóôöõøùúûüÿýñçčšž]/i.test(country.name));
        specialChars.forEach(country => {
          expect(country.nameTranslations.en).toBeDefined();
        });
      });
    });
  });