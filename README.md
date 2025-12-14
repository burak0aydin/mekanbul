# MekanBul API

Node.js, Express ve MongoDB (Mongoose) kullanılarak geliştirilmiş REST API projesi.

## 🚀 Canlı Demo

**API URL:** https://mekanbul-henna.vercel.app

## 📋 Özellikler

- ✅ Mekan ekleme, güncelleme, silme
- ✅ Mekana yorum ekleme, güncelleme, silme
- ✅ Yorumlara göre mekan puanını otomatik güncelleme
- ✅ MongoDB Atlas ile bulut veritabanı
- ✅ Vercel ile canlı deployment

## 🛠️ Kurulum

### Gereksinimler
- Node.js (v18+)
- MongoDB Atlas hesabı

### Yerel Kurulum

```bash
# Repoyu klonla
git clone https://github.com/burak0aydin/mekanbul.git
cd mekanbul

# Bağımlılıkları yükle
npm install

# .env dosyası oluştur
echo "MONGODB_URI=mongodb+srv://KULLANICI:SIFRE@cluster.mongodb.net/mekanbul" > .env

# Sunucuyu başlat
npm start
```

Sunucu `http://localhost:3000` adresinde çalışacaktır.

---

## 📡 API Endpoints

| # | İşlem | Method | Endpoint |
|---|-------|--------|----------|
| 1 | Tüm mekanları listele | `GET` | `/api/venues` |
| 2 | Yeni mekan ekle | `POST` | `/api/venues` |
| 3 | Mekan detayını getir | `GET` | `/api/venues/:venueid` |
| 4 | Mekanı güncelle | `PUT` | `/api/venues/:venueid` |
| 5 | Mekanı sil | `DELETE` | `/api/venues/:venueid` |
| 6 | Yorum ekle | `POST` | `/api/venues/:venueid/comments` |
| 7 | Yorum getir | `GET` | `/api/venues/:venueid/comments/:commentid` |
| 8 | Yorum güncelle | `PUT` | `/api/venues/:venueid/comments/:commentid` |
| 9 | Yorum sil | `DELETE` | `/api/venues/:venueid/comments/:commentid` |

---

## 🧪 Postman Test Sonuçları

### 1️⃣ Tüm Mekanları Listele (GET)

**Endpoint:** `GET /api/venues`

**URL:** `https://mekanbul-henna.vercel.app/api/venues`

**Açıklama:** Veritabanındaki tüm mekanları listeler.

![List Nearby Venues](tests/ListNearbyVenues.png)

---

### 2️⃣ Yeni Mekan Ekle (POST)

**Endpoint:** `POST /api/venues`

**URL:** `https://mekanbul-henna.vercel.app/api/venues`

**Body:**
```json
{
  "name": "Test Kafe",
  "address": "Test Caddesi No:1",
  "lat": 41.0082,
  "long": 28.9784,
  "foodanddrink": ["Kahve", "Çay"],
  "hours": [
    {
      "day": "Pazartesi-Cuma",
      "open": "09:00",
      "close": "22:00",
      "isClosed": false
    }
  ]
}
```

**Başarılı Yanıt:** `201 Created`

![Add Venue](tests/AddVenue.png)

---

### 3️⃣ Mekan Detayını Getir (GET)

**Endpoint:** `GET /api/venues/:venueid`

**URL:** `https://mekanbul-henna.vercel.app/api/venues/693ee8de79811c6c5f9ec435`

**Açıklama:** Belirtilen ID'ye sahip mekanın detaylarını getirir.

![Get Venue](tests/GetVenue.png)

---

### 4️⃣ Mekanı Güncelle (PUT)

**Endpoint:** `PUT /api/venues/:venueid`

**URL:** `https://mekanbul-henna.vercel.app/api/venues/693ee8de79811c6c5f9ec435`

**Body:**
```json
{
  "name": "Güncellenmiş Kafe",
  "rating": 5
}
```

**Başarılı Yanıt:** `201 Created`

![Update Venue](tests/UpdateVenue.png)

---

### 5️⃣ Mekanı Sil (DELETE)

**Endpoint:** `DELETE /api/venues/:venueid`

**URL:** `https://mekanbul-henna.vercel.app/api/venues/693ee8de79811c6c5f9ec435`

**Açıklama:** Belirtilen ID'ye sahip mekanı siler.

**Başarılı Yanıt:** `200 OK`
```json
{
  "status": "Starbucks Kadıköy isimli mekan silindi"
}
```

![Delete Venue](tests/DeleteVenue.png)

---

### 6️⃣ Yorum Ekle (POST)

**Endpoint:** `POST /api/venues/:venueid/comments`

**URL:** `https://mekanbul-henna.vercel.app/api/venues/692784065bd4e5e4c3567d54/comments`

**Body:**
```json
{
  "author": "Burak",
  "rating": 5,
  "text": "Harika bir mekan!"
}
```

**Başarılı Yanıt:** `201 Created`

**Not:** Yorum eklendiğinde mekanın rating değeri otomatik olarak güncellenir.

![Add Comment](tests/AddComment.png)

---

### 7️⃣ Yorum Getir (GET)

**Endpoint:** `GET /api/venues/:venueid/comments/:commentid`

**URL:** `https://mekanbul-henna.vercel.app/api/venues/692784065bd4e5e4c3567d54/comments/YORUM_ID`

**Açıklama:** Belirtilen mekan ve yorum ID'sine sahip yorumu getirir.

![Get Comment](tests/GetComment.png)

---

### 8️⃣ Yorum Güncelle (PUT)

**Endpoint:** `PUT /api/venues/:venueid/comments/:commentid`

**URL:** `https://mekanbul-henna.vercel.app/api/venues/692784065bd4e5e4c3567d54/comments/YORUM_ID`

**Body:**
```json
{
  "author": "Burak",
  "rating": 4,
  "text": "Güzel ama biraz kalabalık"
}
```

**Başarılı Yanıt:** `201 Created`

**Not:** Yorum güncellendiğinde mekanın rating değeri otomatik olarak yeniden hesaplanır.

![Update Comment](tests/UpdateComment.png)

---

### 9️⃣ Yorum Sil (DELETE)

**Endpoint:** `DELETE /api/venues/:venueid/comments/:commentid`

**URL:** `https://mekanbul-henna.vercel.app/api/venues/692784065bd4e5e4c3567d54/comments/YORUM_ID`

**Açıklama:** Belirtilen yorumu siler ve mekanın rating değerini yeniden hesaplar.

**Başarılı Yanıt:** `200 OK`
```json
{
  "status": "Yorum silindi"
}
```

![Delete Comment](tests/DeleteComment.png)

---

## 📁 Proje Yapısı

```
mekanbul/
├── app.js                    # Ana uygulama dosyası
├── package.json              # Bağımlılıklar
├── vercel.json               # Vercel deployment ayarları
├── .env                      # Ortam değişkenleri (git'e dahil değil)
├── .gitignore
│
├── app_api/
│   ├── controller/
│   │   ├── VenueController.js    # Mekan CRUD işlemleri
│   │   └── CommentController.js  # Yorum CRUD işlemleri
│   │
│   ├── models/
│   │   ├── db.js                 # MongoDB bağlantısı
│   │   └── venue.js              # Venue ve Comment şemaları
│   │
│   └── routes/
│       └── index.js              # API route tanımları
│
├── bin/
│   └── www                       # Sunucu başlatma dosyası
│
├── public/
│   ├── index.html
│   └── stylesheets/
│       └── style.css
│
├── routes/
│   ├── index.js
│   └── users.js
│
└── tests/                        # Postman test ekran görüntüleri
    ├── ListNearbyVenues.png
    ├── AddVenue.png
    ├── GetVenue.png
    ├── UpdateVenue.png
    ├── DeleteVenue.png
    ├── AddComment.png
    ├── GetComment.png
    ├── UpdateComment.png
    └── DeleteComment.png
```

---

## 🗃️ Veritabanı Şeması

### Venue (Mekan)
```javascript
{
  name: String,           // Mekan adı
  address: String,        // Adres
  rating: Number,         // Ortalama puan (0-5)
  foodanddrink: [String], // Yiyecek/içecek listesi
  coordinates: [Number],  // [lat, long]
  hours: [{
    day: String,
    open: String,
    close: String,
    isClosed: Boolean
  }],
  comments: [Comment]     // Yorumlar
}
```

### Comment (Yorum)
```javascript
{
  author: String,         // Yazar adı
  rating: Number,         // Puan (0-5)
  text: String,           // Yorum metni
  date: Date              // Tarih (otomatik)
}
```

---

## 🔧 Teknolojiler

- **Backend:** Node.js, Express.js
- **Veritabanı:** MongoDB Atlas, Mongoose
- **Deployment:** Vercel
- **Test:** Postman

---

## 👤 Geliştirici

**Burak Aydın**

- GitHub: [@burak0aydin](https://github.com/burak0aydin)

---

## 📝 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.
