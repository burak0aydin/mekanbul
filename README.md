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
- ✅ URL-encoded form desteği

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
| 1 | Yeni mekan ekle | `POST` | `/api/venues` |
| 2 | Tüm mekanları listele | `GET` | `/api/venues` |
| 3 | Mekan detayını getir | `GET` | `/api/venues/:venueid` |
| 4 | Mekanı güncelle | `PUT` | `/api/venues/:venueid` |
| 5 | Yorum ekle | `POST` | `/api/venues/:venueid/comments` |
| 6 | Yorum getir | `GET` | `/api/venues/:venueid/comments/:commentid` |
| 7 | Yorum güncelle | `PUT` | `/api/venues/:venueid/comments/:commentid` |
| 8 | Yorum sil | `DELETE` | `/api/venues/:venueid/comments/:commentid` |
| 9 | Mekanı sil | `DELETE` | `/api/venues/:venueid` |

---

## 🧪 Postman Test Sonuçları

### 1️⃣ Yeni Mekan Ekle (Add Venue)

**Endpoint:** `POST /api/venues`

**Body (x-www-form-urlencoded):**
| Key | Value |
|-----|-------|
| name | Bilgisayar Mühendisliği |
| address | Süleyman Demirel Üniversitesi |
| foodanddrink | Web |
| lat | 37 |
| long | 35 |
| days1 | Pazartesi-Cuma |
| open1 | 9 |
| close1 | 11 |
| isClosed1 | false |
| days2 | Cumartesi |
| open2 | 9 |
| close2 | 11 |
| isClosed2 | false |

**Başarılı Yanıt:** `201 Created`

![Add Venue](tests/AddVenue.png)

---

### 2️⃣ Mekanları Listele (List Nearby Venues)

**Endpoint:** `GET /api/venues?lat=37&long=35`

**Açıklama:** Veritabanındaki tüm mekanları listeler.

**Başarılı Yanıt:** `200 OK`

![List Nearby Venues](tests/ListNearbyVenues.png)

---

### 3️⃣ Mekan Detayını Getir (Get Venue)

**Endpoint:** `GET /api/venues/:venueid`

**Açıklama:** Belirtilen ID'ye sahip mekanın detaylarını getirir.

**Başarılı Yanıt:** `200 OK`

![Get Venue](tests/GetVenue.png)

---

### 4️⃣ Mekanı Güncelle (Update Venue)

**Endpoint:** `PUT /api/venues/:venueid`

**Body (x-www-form-urlencoded):**
| Key | Value |
|-----|-------|
| name | Güncellenmiş Mekan |
| address | Yeni Adres |
| foodanddrink | Kahve |
| lat | 37 |
| long | 35 |
| days1 | Pazartesi-Cuma |
| open1 | 9-11 |
| close1 | 9-11 |
| isClosed1 | false |
| days2 | Cumartesi |
| open2 | 9-11 |
| close2 | 9-11 |
| isClosed2 | false |

**Başarılı Yanıt:** `201 Created`

![Update Venue](tests/UpdateVenue.png)

---

### 5️⃣ Yorum Ekle (Add Comment)

**Endpoint:** `POST /api/venues/:venueid/comments`

**Body (x-www-form-urlencoded):**
| Key | Value |
|-----|-------|
| author | Burak |
| rating | 5 |
| text | Harika bir mekan! |

**Başarılı Yanıt:** `201 Created`

**Not:** Yorum eklendiğinde mekanın rating değeri otomatik olarak güncellenir.

![Add Comment](tests/AddComment.png)

---

### 6️⃣ Yorum Getir (Get Comment)

**Endpoint:** `GET /api/venues/:venueid/comments/:commentid`

**Açıklama:** Belirtilen mekan ve yorum ID'sine sahip yorumu getirir.

**Başarılı Yanıt:** `200 OK`

![Get Comment](tests/GetComment.png)

---

### 7️⃣ Yorum Güncelle (Update Comment)

**Endpoint:** `PUT /api/venues/:venueid/comments/:commentid`

**Body (x-www-form-urlencoded):**
| Key | Value |
|-----|-------|
| author | Burak |
| rating | 4 |
| text | Güzel ama biraz kalabalık |

**Başarılı Yanıt:** `201 Created`

**Not:** Yorum güncellendiğinde mekanın rating değeri otomatik olarak yeniden hesaplanır.

![Update Comment](tests/UpdateComment.png)

---

### 8️⃣ Yorum Sil (Delete Comment)

**Endpoint:** `DELETE /api/venues/:venueid/comments/:commentid`

**Açıklama:** Belirtilen yorumu siler ve mekanın rating değerini yeniden hesaplar.

**Başarılı Yanıt:** `200 OK`

```json
{
  "status": "Yorum silindi"
}
```

![Delete Comment](tests/DeleteComment.png)

---

### 9️⃣ Mekanı Sil (Delete Venue)

**Endpoint:** `DELETE /api/venues/:venueid`

**Açıklama:** Belirtilen ID'ye sahip mekanı siler.

**Başarılı Yanıt:** `200 OK`

```json
{
  "status": "Mekan adı isimli mekan silindi"
}
```

![Delete Venue](tests/DeleteVenue.png)

---

## 📥 Postman Koleksiyonu

Proje klasöründeki `postman_collection.json` dosyasını Postman'e import ederek tüm testleri otomatik olarak çalıştırabilirsiniz.

### Import Adımları:
1. Postman'i açın
2. **Import** butonuna tıklayın
3. `postman_collection.json` dosyasını seçin
4. Koleksiyonu sağ tıklayıp **Run collection** seçin

---

## 📁 Proje Yapısı

```
mekanbul/
├── app.js                        # Ana uygulama dosyası
├── package.json                  # Bağımlılıklar
├── vercel.json                   # Vercel deployment ayarları
├── postman_collection.json       # Postman test koleksiyonu
├── .env                          # Ortam değişkenleri (git'e dahil değil)
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
    ├── AddVenue.png
    ├── ListNearbyVenues.png
    ├── GetVenue.png
    ├── UpdateVenue.png
    ├── AddComment.png
    ├── GetComment.png
    ├── UpdateComment.png
    ├── DeleteComment.png
    └── DeleteVenue.png
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

## 🌐 Web Üzerinden Test

### Tarayıcıda Test Edilebilir Linkler (GET İstekleri)

Aşağıdaki linkler doğrudan tarayıcıda açılarak test edilebilir:

| # | İşlem | Link |
|---|-------|------|
| 1 | Tüm Mekanları Listele | [https://mekanbul-henna.vercel.app/api/venues](https://mekanbul-henna.vercel.app/api/venues) |
| 2 | Mekan Detayı Getir | [https://mekanbul-henna.vercel.app/api/venues/692784065bd4e5e4c3567d54](https://mekanbul-henna.vercel.app/api/venues/692784065bd4e5e4c3567d54) |
| 3 | Yorum Detayı Getir | [https://mekanbul-henna.vercel.app/api/venues/692784065bd4e5e4c3567d54/comments/6927844b5bd4e5e4c3567d77](https://mekanbul-henna.vercel.app/api/venues/692784065bd4e5e4c3567d54/comments/6927844b5bd4e5e4c3567d77) |

### Postman ile Test Edilmesi Gereken İşlemler (POST, PUT, DELETE)

Aşağıdaki işlemler `POST`, `PUT` veya `DELETE` metodu gerektirdiği için **Postman** veya benzeri bir araç ile test edilmelidir:

| # | İşlem | Method | Endpoint |
|---|-------|--------|----------|
| 1 | Yeni Mekan Ekle | `POST` | `/api/venues` |
| 2 | Mekanı Güncelle | `PUT` | `/api/venues/:venueid` |
| 3 | Yorum Ekle | `POST` | `/api/venues/:venueid/comments` |
| 4 | Yorum Güncelle | `PUT` | `/api/venues/:venueid/comments/:commentid` |
| 5 | Yorum Sil | `DELETE` | `/api/venues/:venueid/comments/:commentid` |
| 6 | Mekanı Sil | `DELETE` | `/api/venues/:venueid` |

> 📥 **Postman Collection:** Proje klasöründeki `postman_collection.json` dosyasını Postman'e import ederek tüm testleri kolayca yapabilirsiniz.

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
