# Yorum Analizi Uygulaması - Proje Yapısı

## Dosya Yapısı

```
/mnt/okcomputer/output/
├── index.html              # Ana sayfa - URL girişi
├── analysis.html           # Analiz sonuçları sayfası
├── main.js                 # Ana JavaScript dosyası
├── resources/              # Kaynak dosyaları
│   ├── hero-bg.jpg        # Hero arka plan görseli
│   ├── analysis-icon.svg  # Analiz ikonu
│   └── report-bg.jpg      # Rapor arka planı
├── design.md              # Tasarım sistemi dokümanı
├── interaction.md         # İnteraktif tasarım dokümanı
└── outline.md            # Bu proje yapısı dokümanı
```

## Sayfa İçerikleri

### index.html - Ana Sayfa
**Amaç**: Kullanıcıdan URL alıp analiz sürecini başlatmak

**Bölümler**:
1. **Navigation Bar**: Logo, menü öğeleri, tema değiştirme
2. **Hero Section**: 
   - Parallax arka plan efekti
   - Animasyonlu başlık (Typed.js)
   - URL giriş formu
   - Örnek URL'ler
3. **Özellikler Section**: Uygulama özelliklerini tanıtan kartlar
4. **Nasıl Çalışır Section**: 3 adımlı işlem açıklaması
5. **Footer**: Telif hakkı ve bağlantılar

**İnteraktif Öğeler**:
- URL input validasyonu
- Analiz butonu hover efektleri
- Progress bar animasyonu
- Parallax scrolling

### analysis.html - Analiz Sonuçları
**Amaç**: Analiz sonuçlarını profesyonel rapor olarak göstermek

**Bölümler**:
1. **Navigation Bar**: Geri dönüş butonu, rapor indirme
2. **Rapor Header**: İşletme bilgileri ve genel skor
3. **Ana İçerik Grid**:
   - Özet kartı
   - Kritik sorunlar listesi
   - En olumlu/olumsuz yorumlar
   - Şüpheli yorum analizi
   - Duygu dağılımı grafiği
   - Tarihsel dağılım çizelgesi
   - Anahtar konular bulutu
4. **PDF İndirme Section**: Rapor dışa aktarma

**İnteraktif Öğeler**:
- Grafik hover detayları
- Kart genişletme/küçültme
- Filtreleme seçenekleri
- PDF dışa aktarma butonu

## JavaScript Fonksiyonları

### main.js - Ana İşlevler
1. **URL Analiz Fonksiyonu**:
   ```javascript
   function analyzeURL(url) {
       // URL doğrulama
       // Analiz süreci başlatma
       // Progress bar güncelleme
       // Yönlendirme
   }
   ```

2. **Veri İşleme**:
   ```javascript
   function processAnalysisResults(data) {
       // Gelen veriyi işleme
       // Grafikleri oluşturma
       // Raporu hazırlama
   }
   ```

3. **Grafik Oluşturma**:
   ```javascript
   function createCharts() {
       // Duygu dağılımı grafiği
       // Zaman çizelgesi
       // Konu bulutu
       // Skor göstergeleri
   }
   ```

4. **PDF Dışa Aktarma**:
   ```javascript
   function exportToPDF() {
       // Raporu PDF olarak indirme
       // Formatlama ve düzenleme
   }
   ```

## Görsel ve İçerik Kaynakları

### Görsel İçerikler
- **Hero Görseli**: Modern teknoloji ve analiz konsepti
- **Analiz İkonları**: Minimalist ikon seti
- **Arka Planlar**: Parallax efektleri için katmanlı görseller
- **Grafik Temaları**: Veri görselleştirme için tema renkleri

### Metin İçerikleri
- **Başlıklar**: Analiz ve raporlama odaklı başlıklar
- **Açıklamalar**: Özellik ve işlev açıklamaları
- **Örnek Veriler**: Demo analiz sonuçları
- **Yardım Metinleri**: Kullanıcı yönlendirmeleri

## Teknik İmplementasyon

### CSS Framework
- **Tailwind CSS**: Hızlı ve tutarlı stillendirme
- **Custom CSS**: Özel animasyonlar ve efektler

### JavaScript Kütüphaneleri
- **Anime.js**: Animasyonlar
- **ECharts.js**: Veri görselleştirme
- **Pixi.js**: Parallax efektleri
- **Splitting.js**: Metin animasyonları
- **Typed.js**: Yazı efektleri
- **html2pdf.js**: PDF dışa aktarma

### Responsive Tasarım
- **Mobile-first**: Öncelikli mobil tasarım
- **Breakpoint'ler**: 320px, 768px, 1024px, 1440px
- **Touch-friendly**: Mobil etkileşimler

## Optimizasyonlar

### Performans
- **Resim Optimizasyonu**: WebP formatı, lazy loading
- **CSS/JS Minification**: Küçültülmüş dosyalar
- **CDN Kullanımı**: Kütüphaneler için CDN

### Erişilebilirlik
- **WCAG 2.1 AA**: Uyumlu renk kontrastları
- **Keyboard Navigation**: Klavye ile gezinme
- **Screen Reader**: Ekran okuyucu uyumlu
- **Alt Text**: Görsel açıklamaları

### SEO
- **Meta Tag'lar**: Açıklama ve anahtar kelimeler
- **Semantic HTML**: Anlamlı HTML yapısı
- **Open Graph**: Sosyal medya paylaşımı