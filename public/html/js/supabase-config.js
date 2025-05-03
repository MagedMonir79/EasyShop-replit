// تكوين Supabase
const SUPABASE_URL = "https://rkxqcnyujnxjjpnanojp.supabase.co"; // عنوان URL الحقيقي لمشروعك
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJreHFjbnl1am54ampwbmFub2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5MTM5MDEsImV4cCI6MjAzMDQ4OTkwMX0.IZFUgsjZIyVcGZOH7D9KUw_QMWpYYQA0U-LwndTlkHw"; // المفتاح العام الحقيقي لمشروعك

// التأكد من أن كائن supabase معرّف
let supabaseClient;

// إنشاء عميل Supabase
function createSupabaseClient() {
    if (typeof supabase === 'undefined') {
        console.error('مكتبة Supabase غير معرّفة. تأكد من تضمين مكتبة Supabase قبل هذا الملف.');
        return null;
    }
    
    if (!supabaseClient) {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    
    return supabaseClient;
};