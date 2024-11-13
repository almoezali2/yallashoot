async function extractTextFromImageOCRSpace() {
    console.log("تم النقر على الزر"); // تحقق من تشغيل الزر
    const imageInput = document.getElementById('imageInput');
    const output = document.getElementById('output');

    if (imageInput.files.length === 0) {
        output.textContent = "يرجى اختيار صورة أولاً.";
        console.log("لم يتم اختيار أي صورة."); // تحقق من اختيار الصورة
        return;
    }

    const file = imageInput.files[0];

    // تحقق من حجم الملف (1 ميجابايت = 1024 * 1024 بايت)
    if (file.size > 1024 * 1024) {
        output.textContent = "حجم الصورة يتجاوز 1 ميجابايت. يرجى تحميل صورة أصغر.";
        console.log("حجم الصورة يتجاوز 1 ميجابايت");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", "ara"); // اللغة العربية
    formData.append("isOverlayRequired", "false");

    try {
        const response = await fetch("https://api.ocr.space/parse/image", {
            method: "POST",
            headers: {
                "apikey": "K88508569788957" // استبدل YOUR_API_KEY بمفتاح API الخاص بك من OCR Space
            },
            body: formData
        });
        
        const result = await response.json();
        
        if (result.IsErroredOnProcessing) {
            output.textContent = "حدث خطأ أثناء معالجة الصورة: " + result.ErrorMessage[0];
            console.log("خطأ في معالجة الصورة:", result.ErrorMessage[0]); // عرض الخطأ في وحدة التحكم
        } else {
            const text = result.ParsedResults[0].ParsedText;
            output.innerHTML = text.replace(/\n/g, '<br>');
            console.log("النص المستخرج:", text); // عرض النص المستخرج في وحدة التحكم
        }
    } catch (error) {
        console.error("Error fetching response from OCR Space API:", error);
        output.textContent = "حدث خطأ أثناء استخراج النص.";
    }
}
