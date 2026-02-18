import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { translations, type Language, type Translations } from './index';

interface LanguageContextType {
    language: Language;
    changeLanguage: (lang: Language) => void;
    t: (key: string, params?: Record<string, string>) => string;
    translations: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>(() => {
        return (localStorage.getItem('language') as Language) || 'vi';
    });

    const [currentTranslations, setCurrentTranslations] = useState<Translations>(translations[language]);

    useEffect(() => {
        setCurrentTranslations(translations[language]);
        localStorage.setItem('language', language);
    }, [language]);

    const changeLanguage = useCallback((lang: Language) => {
        setLanguage(lang);
    }, []);

    const t = useCallback(
        (key: string, params?: Record<string, string>): string => {
            const keys = key.split('.');
            let value: any = currentTranslations;

            for (const k of keys) {
                if (value && typeof value === 'object' && k in value) {
                    value = value[k];
                } else {
                    return key;
                }
            }

            if (typeof value !== 'string') {
                return key;
            }

            if (params) {
                return Object.entries(params).reduce(
                    (str, [paramKey, paramValue]) =>
                        str.replace(`{${paramKey}}`, paramValue),
                    value
                );
            }

            return value;
        },
        [currentTranslations]
    );

    return (
        <LanguageContext.Provider
            value={{
                language,
                changeLanguage,
                t,
                translations: Object.keys(translations) as Language[],
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
