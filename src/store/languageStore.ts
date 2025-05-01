import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageState {
  language: 'en' | 'ar';
  direction: 'ltr' | 'rtl';
  toggleLanguage: () => void;
  setLanguage: (lang: 'en' | 'ar') => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',  // اللغة الافتراضية هي الإنجليزية
      direction: 'ltr', // الاتجاه الافتراضي من اليسار إلى اليمين

      toggleLanguage: () => {
        set((state) => ({
          language: state.language === 'en' ? 'ar' : 'en',
          direction: state.language === 'en' ? 'rtl' : 'ltr',
        }));
      },

      setLanguage: (lang) => {
        set({
          language: lang,
          direction: lang === 'ar' ? 'rtl' : 'ltr',
        });
      },
    }),
    {
      name: 'language-storage',
    }
  )
);