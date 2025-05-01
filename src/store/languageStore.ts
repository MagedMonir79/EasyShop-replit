import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// تحقق مما إذا كان يتم التشغيل في بيئة المتصفح
const isBrowser = typeof window !== 'undefined';

interface LanguageState {
  language: 'en' | 'ar';
  direction: 'ltr' | 'rtl';
  isInitialized: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: 'en' | 'ar') => void;
}

// إنشاء مخزن Zustand مع دعم SSR
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',  // اللغة الافتراضية هي الإنجليزية
      direction: 'ltr', // الاتجاه الافتراضي من اليسار إلى اليمين
      isInitialized: false, // إضافة حالة لتتبع ما إذا كان قد تم تهيئة المخزن

      toggleLanguage: () => {
        set((state) => ({
          language: state.language === 'en' ? 'ar' : 'en',
          direction: state.language === 'en' ? 'rtl' : 'ltr',
          isInitialized: true
        }));
      },

      setLanguage: (lang) => {
        set({
          language: lang,
          direction: lang === 'ar' ? 'rtl' : 'ltr',
          isInitialized: true
        });
      },
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => (isBrowser ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {}
      })),
      skipHydration: true, // تخطي الهيدراشن التلقائي لمنع أخطاء عدم تطابق المحتوى
    }
  )
);

// دالة مساعدة لتهيئة المخزن يدويًا بعد التحميل في جانب العميل
export const initializeLanguageStore = () => {
  if (isBrowser) {
    try {
      const storedValue = localStorage.getItem('language-storage');
      if (storedValue) {
        const { state } = JSON.parse(storedValue);
        useLanguageStore.setState({
          language: state.language,
          direction: state.direction,
          isInitialized: true
        });
      } else {
        // إذا لم تكن هناك قيمة مخزنة، ضبط حالة التهيئة فقط
        useLanguageStore.setState({ isInitialized: true });
      }
    } catch (error) {
      console.error('Error initializing language store:', error);
      useLanguageStore.setState({ isInitialized: true });
    }
  }
};