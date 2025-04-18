<div align="center">
  <h1>UTS EAI - Service to Service Communication</h1>
  <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWpod2FscDljYmxyN2p2dWF1czU5aTh6dXdwOGt0Z2lrYXV3NmowZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4EoR2uvw5dVeCNZC/giphy.gif" alt="Coding Enthusiasm" height="200"/>
</div>

Proyek ini merupakan implementasi sistem komunikasi antar service (**Service-to-Service Communication**) dalam konteks Ujian Tengah Semester (UTS) mata kuliah **Enterprise Application Integration (EAI)**.

Terdapat 4 service utama yang saling berkomunikasi:

- **User Service** – Mengelola data pengguna
- **Menu Service** – Menyediakan informasi menu makanan/minuman
- **Order Service** – Mencatat dan mengelola pesanan
- **Review Service** – Mengelola ulasan/review terhadap menu atau layanan

---

## Struktur Folder

```
.
├── user-service/
├── menu-service/
├── order-service/
└── review-service/
```

---

## Cara Menjalankan

### 1. Clone Repository

```bash
git clone https://github.com/FatihZee/service-to-service-communication.git
cd service-to-service-communication
```

### 2. Jalankan Tiap Service

Masuk ke folder masing-masing service lalu jalankan:

```bash
cd user-service
npm install
npm run dev
```

Lakukan hal yang sama untuk:
- `menu-service`
- `order-service`
- `review-service`

---

## Penjelasan Masing-Masing Service



## 📘 User Service API Documentation

### Base URL: `/users`

---

### POST `/users/login`

**Deskripsi:**  
Login user berdasarkan email dan password.

**Request Body:**
```json
{
  "email": "fatih@example.com",
  "password": "fatih123"
}
```

**Response:**
```json
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJmYXRpaEBleGFtcGxlLmNvbSIsIm5hbWUiOiJGYXRpaCBGaWtyeSBPa3RhdmlhbnRvIiwiaWF0IjoxNzQ0OTc4NDA3LCJleHAiOjE3NDQ5ODIwMDd9.4mEJYpyl9FnPqisKeQAO54VhhNjO6Uv0EZrSB1DEgoo",
    "user": {
        "id": 2,
        "name": "Fatih Fikry Oktavianto",
        "email": "fatih@example.com",
        "phone": "085713309551"
    }
}
```

---

### POST `/users/register`

**Deskripsi:**  
Register / daftar user baru.

**Request Body:**
```json
{
  "name": "Fatih Fikry Oktavianto",
  "email": "fatih@example.com",
  "password": "fatih123",
  "phone": "085713309551"
}
```

**Response:**
```json
{
    "id": 2,
    "name": "Fatih Fikry Oktavianto",
    "email": "fatih@example.com",
    "phone": "085713309551"
}
```

---

### GET `/users/`

**Deskripsi:**  
Mengambil seluruh data user.

**Response:**
```json
[
    {
        "id": 2,
        "name": "Fatih Fikry Oktavianto",
        "email": "fatih@example.com",
        "password": "$2b$10$krH5lrMrKi5NBd6jKMDI1eIcm/wEJibBuvJaQJDlghvixnyhpIB1O",
        "phone": "085713309551",
        "created_at": "2025-04-18T11:10:51.000Z",
        "updated_at": "2025-04-18T11:10:51.000Z"
    }
]
```

---

### GET `/users/:id`

**Deskripsi:**  
Mengambil data user berdasarkan ID.

**Params:**
- `id` – ID user (integer)

**Response:**
```json
{
    "id": 2,
    "name": "Fatih Fikry Oktavianto",
    "email": "fatih@example.com",
    "password": "$2b$10$krH5lrMrKi5NBd6jKMDI1eIcm/wEJibBuvJaQJDlghvixnyhpIB1O",
    "phone": "085713309551",
    "created_at": "2025-04-18T11:10:51.000Z",
    "updated_at": "2025-04-18T11:10:51.000Z"
}
```

---

### PUT `/users/:id`

**Deskripsi:**  
Mengupdate data user berdasarkan ID.  
**(Protected route - butuh token)**

**Headers:**
```http
Authorization: Bearer <token>
```

**Params:**
- `id` – ID user (integer)

**Request Body:**
```json
{
  "name": "Fatih Fikry Oktavianto",
  "email": "fatih@example.com",
  "password": "fatih123",
  "phone": "081234567890"
}
```

**Response:**
```json
{
  "message": "User updated successfully"
}
```

---

### DELETE `/users/:id`

**Deskripsi:**  
Menghapus user berdasarkan ID.  
**(Protected route - butuh token)**

**Headers:**
```http
Authorization: Bearer <token>
```

**Params:**
- `id` – ID user (integer)

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

---

### GET `/users/:id/with-orders-reviews`

**Deskripsi:**  
Mengambil data lengkap user beserta daftar order dan review yang pernah dibuat.

**Params:**
- `id` – ID user (integer)

**Response:**
```json
{
    "user": {
        "id": 2,
        "name": "Fatih Fikry Oktavianto",
        "email": "fatih@example.com",
        "phone": "085713309551"
    },
    "orders": [
        {
            "order_id": 4,
            "menu_name": "Nasi Goreng Jawa",
            "quantity": 10,
            "total_price": "250000.00",
            "reviews": [
                {
                    "review_id": 2,
                    "rating": 5,
                    "comment": "Makanan enak dan porsi cukup besar. Pelayanan ramah."
                },
                {
                    "review_id": 3,
                    "rating": 2,
                    "comment": "Biasa Aja"
                }
            ]
        }
    ]
}
```

---

### 🍔 Menu Service
Berikut dokumentasi lengkap untuk **Menu Service** berdasarkan route yang kamu kasih:

---

## 📘 Menu Service API Documentation

### Base URL: `/menus`

---

### POST `/menus/`

**Deskripsi:**  
Menambahkan menu baru ke dalam sistem.  
**(Protected route - butuh token)**

**Headers:**
```http
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Nasi Goreng Jawa",
  "description": "Nasi goreng dengan topping ayam, telur, dan kerupuk",
  "price": 25000
}
```

**Response:**
```json
{
    "message": "Menu created successfully",
    "menuId": 3,
    "createdBy": {
        "id": 2,
        "name": "Fatih Fikry Oktavianto",
        "email": "fatih@example.com",
        "password": "$2b$10$krH5lrMrKi5NBd6jKMDI1eIcm/wEJibBuvJaQJDlghvixnyhpIB1O",
        "phone": "085713309551",
        "created_at": "2025-04-18T11:10:51.000Z",
        "updated_at": "2025-04-18T11:10:51.000Z"
    }
}
```

---

### PUT `/menus/:id`

**Deskripsi:**  
Mengupdate data menu berdasarkan ID.  
**(Protected route - butuh token)**

**Headers:**
```http
Authorization: Bearer <token>
```

**Params:**
- `id` – ID menu (integer)

**Request Body:**
```json
{
  "name": "Nasi Goreng Spesial Gila",
  "description": "Nasi goreng dengan topping ayam, telur, dan kerupuk",
  "price": 25000
}
```

**Response:**
```json
{
  "message": "Menu updated successfully"
}
```

---

### DELETE `/menus/:id`

**Deskripsi:**  
Menghapus menu berdasarkan ID.  
**(Protected route - butuh token)**

**Headers:**
```http
Authorization: Bearer <token>
```

**Params:**
- `id` – ID menu (integer)

**Response:**
```json
{
  "message": "Menu deleted successfully"
}
```

---

### GET `/menus/`

**Deskripsi:**  
Mengambil seluruh daftar menu.

**Response:**
```json
[
    {
        "id": 3,
        "name": "Nasi Goreng Jawa",
        "description": "Nasi goreng dengan topping ayam, telur, dan kerupuk",
        "price": "25000.00",
        "user_id": 2,
        "created_at": "2025-04-18T11:14:40.000Z",
        "updated_at": "2025-04-18T11:14:40.000Z",
        "orderCount": 0
    }
]
```

---

### GET `/menus/:id`

**Deskripsi:**  
Mengambil informasi menu berdasarkan ID.

**Params:**
- `id` – ID menu (integer)

**Response:**
```json
{
    "id": 3,
    "name": "Nasi Goreng Jawa",
    "description": "Nasi goreng dengan topping ayam, telur, dan kerupuk",
    "price": "25000.00",
    "user_id": 2,
    "created_at": "2025-04-18T11:14:40.000Z",
    "updated_at": "2025-04-18T11:14:40.000Z"
}
```

---

### 📦 Order Service
Berikut dokumentasi lengkap untuk **Order Service** berdasarkan route yang kamu kasih:

---

## 📘 Order Service API Documentation

### Base URL: `/orders`

---

### GET `/orders/`

**Deskripsi:**  
Mengambil seluruh data pesanan.

**Response:**
```json
[
    {
        "id": 4,
        "user_id": 2,
        "menu_id": 3,
        "quantity": 10,
        "total_price": "250000.00",
        "created_at": "2025-04-18T11:15:43.000Z"
    }
    ...
]
```

---

### GET `/orders/:id`

**Deskripsi:**  
Mengambil data pesanan berdasarkan ID pesanan.

**Params:**
- `id` – ID pesanan (integer)

**Response:**
```json
{
    "id": 4,
    "user_id": 2,
    "menu_id": 3,
    "quantity": 10,
    "total_price": "250000.00",
    "created_at": "2025-04-18T11:15:43.000Z"
}
```

---

### POST `/orders/`

**Deskripsi:**  
Membuat pesanan baru.  
**(Protected route - butuh token)**

**Headers:**
```http
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "menuId": 3,
  "quantity": 10
}
```

**Response:**
```json
{
    "message": "Order created successfully",
    "order": {
        "id": 4,
        "user_id": 2,
        "menu_id": 3,
        "quantity": 10,
        "total_price": 250000,
        "user": {
            "id": 2,
            "name": "Fatih Fikry Oktavianto",
            "email": "fatih@example.com",
            "phone": "085713309551",
            "created_at": "2025-04-18T11:10:51.000Z",
            "updated_at": "2025-04-18T11:10:51.000Z"
        },
        "menu": {
            "id": 3,
            "name": "Nasi Goreng Jawa",
            "description": "Nasi goreng dengan topping ayam, telur, dan kerupuk",
            "price": "25000.00",
            "user_id": 2,
            "created_at": "2025-04-18T11:14:40.000Z",
            "updated_at": "2025-04-18T11:14:40.000Z"
        }
    }
}
```

---

### PUT `/orders/:id`

**Deskripsi:**  
Mengupdate data pesanan berdasarkan ID.  
**(Protected route - butuh token)**

**Headers:**
```http
Authorization: Bearer <token>
```

**Params:**
- `id` – ID pesanan (integer)

**Request Body:**
```json
{
  "menuId": 1,
  "quantity": 15
}
```

**Response:**
```json
{
    "message": "Order updated successfully",
    "order": {
        "id": "3",
        "user_id": 1,
        "menu_id": 1,
        "quantity": 15,
        "total_price": 375000,
        "user": {
            "id": 1,
            "name": "Fatih Fikry Oktavianto",
            "email": "fatih@example.com",
            "phone": "081234567890",
            "created_at": "2025-04-18T03:51:18.000Z",
            "updated_at": "2025-04-18T03:56:23.000Z"
        },
        "menu": {
            "id": 1,
            "name": "Nasi Goreng Spesial Gila",
            "description": "Nasi goreng dengan topping ayam, telur, dan kerupuk",
            "price": "25000.00",
            "user_id": null,
            "created_at": "2025-04-18T03:59:41.000Z",
            "updated_at": "2025-04-18T04:00:24.000Z"
        }
    }
}
```

---

### DELETE `/orders/:id`

**Deskripsi:**  
Menghapus pesanan berdasarkan ID.  
**(Protected route - butuh token)**

**Headers:**
```http
Authorization: Bearer <token>
```

**Params:**
- `id` – ID pesanan (integer)

**Response:**
```json
{
  "message": "Order deleted successfully"
}
```

---

### GET `/orders/user/:userId`

**Deskripsi:**  
Mengambil semua pesanan berdasarkan ID pengguna.

**Params:**
- `userId` – ID user (integer)

**Response:**
```json
[
    {
        "id": 4,
        "user_id": 2,
        "menu_id": 3,
        "quantity": 10,
        "total_price": "250000.00",
        "created_at": "2025-04-18T11:15:43.000Z"
    }
    ...
]
```

---

### GET `/orders/menu/:menuId`

**Deskripsi:**  
Mengambil jumlah pesanan untuk menu tertentu.

**Params:**
- `menuId` – ID menu (integer)

**Response:**
```json
{
    "count": 1
}
```

---

### ⭐ Review Service
Berikut dokumentasi lengkap untuk **Review Service** berdasarkan route yang kamu kasih:

---

## 📘 Review Service API Documentation

### Base URL: `/reviews`

---

### GET `/reviews/`

**Deskripsi:**  
Mengambil seluruh ulasan (review).

**Response:**
```json
[
    {
        "id": 2,
        "user_id": 2,
        "menu_id": 3,
        "order_id": 4,
        "rating": 5,
        "comment": "Makanan enak dan porsi cukup besar. Pelayanan ramah.",
        "created_at": "2025-04-18T11:19:49.000Z",
        "updated_at": "2025-04-18T11:19:48.000Z",
        "user": {
            "id": 2,
            "name": "Fatih Fikry Oktavianto",
            "email": "fatih@example.com",
            "phone": "085713309551",
            "created_at": "2025-04-18T11:10:51.000Z",
            "updated_at": "2025-04-18T11:10:51.000Z"
        },
        "menu": {
            "id": 3,
            "name": "Nasi Goreng Jawa",
            "description": "Nasi goreng dengan topping ayam, telur, dan kerupuk",
            "price": "25000.00",
            "user_id": 2,
            "created_at": "2025-04-18T11:14:40.000Z",
            "updated_at": "2025-04-18T11:14:40.000Z"
        }
    },
    {
        "id": 3,
        "user_id": 2,
        "menu_id": 3,
        "order_id": 4,
        "rating": 2,
        "comment": "Biasa Aja",
        "created_at": "2025-04-18T12:10:59.000Z",
        "updated_at": "2025-04-18T12:16:08.000Z",
        "user": {
            "id": 2,
            "name": "Fatih Fikry Oktavianto",
            "email": "fatih@example.com",
            "phone": "085713309551",
            "created_at": "2025-04-18T11:10:51.000Z",
            "updated_at": "2025-04-18T11:10:51.000Z"
        },
        "menu": {
            "id": 3,
            "name": "Nasi Goreng Jawa",
            "description": "Nasi goreng dengan topping ayam, telur, dan kerupuk",
            "price": "25000.00",
            "user_id": 2,
            "created_at": "2025-04-18T11:14:40.000Z",
            "updated_at": "2025-04-18T11:14:40.000Z"
        }
    },
    ...
]
```

---

### GET `/reviews/:id`

**Deskripsi:**  
Mengambil review berdasarkan ID.

**Params:**
- `id` – ID review (integer)

**Response:**
```json
{
    "id": 3,
    "user_id": 2,
    "menu_id": 3,
    "order_id": 4,
    "rating": 4,
    "comment": "Makanan enak dan porsi cukup besar. Pelayanan ramah banget pastinya",
    "created_at": "2025-04-18T12:10:59.000Z",
    "updated_at": "2025-04-18T12:10:58.000Z",
    "user": {
        "id": 2,
        "name": "Fatih Fikry Oktavianto",
        "email": "fatih@example.com",
        "phone": "085713309551",
        "created_at": "2025-04-18T11:10:51.000Z",
        "updated_at": "2025-04-18T11:10:51.000Z"
    },
    "menu": {
        "id": 3,
        "name": "Nasi Goreng Jawa",
        "description": "Nasi goreng dengan topping ayam, telur, dan kerupuk",
        "price": "25000.00",
        "user_id": 2,
        "created_at": "2025-04-18T11:14:40.000Z",
        "updated_at": "2025-04-18T11:14:40.000Z"
    },
    "order": {
        "id": 4,
        "user_id": 2,
        "menu_id": 3,
        "quantity": 10,
        "total_price": "250000.00",
        "created_at": "2025-04-18T11:15:43.000Z"
    }
}
```

---

### GET `/reviews/menu/:menuId`

**Deskripsi:**  
Mengambil seluruh review untuk menu tertentu.

**Params:**
- `menuId` – ID menu (integer)

**Response:**
```json
{
    "menu": {
        "id": 3,
        "name": "Nasi Goreng Jawa",
        "description": "Nasi goreng dengan topping ayam, telur, dan kerupuk",
        "price": "25000.00",
        "user_id": 2,
        "created_at": "2025-04-18T11:14:40.000Z",
        "updated_at": "2025-04-18T11:14:40.000Z"
    },
    "averageRating": "5.0000",
    "reviewCount": 1,
    "reviews": [
        {
            "id": 2,
            "user_id": 2,
            "menu_id": 3,
            "order_id": 4,
            "rating": 5,
            "comment": "Makanan enak dan porsi cukup besar. Pelayanan ramah.",
            "created_at": "2025-04-18T11:19:49.000Z",
            "updated_at": "2025-04-18T11:19:48.000Z",
            "user": {
                "id": 2,
                "name": "Fatih Fikry Oktavianto",
                "email": "fatih@example.com",
                "phone": "085713309551",
                "created_at": "2025-04-18T11:10:51.000Z",
                "updated_at": "2025-04-18T11:10:51.000Z"
            }
        }
    ]
}
```

---

### GET `/reviews/user/:userId`

**Deskripsi:**  
Mengambil semua review yang dibuat oleh user tertentu.

**Params:**
- `userId` – ID user (integer)

**Response:**
```json
{
    "user": {
        "id": 2,
        "name": "Fatih Fikry Oktavianto",
        "email": "fatih@example.com",
        "phone": "085713309551",
        "created_at": "2025-04-18T11:10:51.000Z",
        "updated_at": "2025-04-18T11:10:51.000Z"
    },
    "reviews": [
        {
            "id": 2,
            "user_id": 2,
            "menu_id": 3,
            "order_id": 4,
            "rating": 5,
            "comment": "Makanan enak dan porsi cukup besar. Pelayanan ramah.",
            "created_at": "2025-04-18T11:19:49.000Z",
            "updated_at": "2025-04-18T11:19:48.000Z",
            "menu": {
                "id": 3,
                "name": "Nasi Goreng Jawa",
                "description": "Nasi goreng dengan topping ayam, telur, dan kerupuk",
                "price": "25000.00",
                "user_id": 2,
                "created_at": "2025-04-18T11:14:40.000Z",
                "updated_at": "2025-04-18T11:14:40.000Z"
            }
        }
    ]
}
```

---

### GET `/reviews/stats/menu/:menuId`

**Deskripsi:**  
Mengambil statistik review (misalnya rata-rata rating) untuk sebuah menu.

**Params:**
- `menuId` – ID menu (integer)

**Response:**
```json
{
    "menuId": "3",
    "averageRating": "3.5000",
    "reviewCount": 2
}
```

---

### POST `/reviews/`

**Deskripsi:**  
Menambahkan review baru.  
**(Protected route - butuh token)**

**Headers:**
```http
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "orderId": 4,
  "rating": 4,
  "comment": "Makanan enak dan porsi cukup besar. Pelayanan ramah banget pastinya"
}
```

**Response:**
```json
{
    "message": "Review created successfully",
    "review": {
        "id": 3,
        "user_id": 2,
        "menu_id": 3,
        "order_id": 4,
        "rating": 4,
        "comment": "Makanan enak dan porsi cukup besar. Pelayanan ramah banget pastinya",
        "created_at": "2025-04-18T12:10:58.765Z"
    }
}
```

---

### PUT `/reviews/:id`

**Deskripsi:**  
Mengupdate review berdasarkan ID.  
**(Protected route - butuh token)**

**Headers:**
```http
Authorization: Bearer <token>
```

**Params:**
- `id` – ID review (integer)

**Request Body:**
```json
{
  "orderId": 4,
  "rating": 2,
  "comment": "Biasa Aja"
}
```

**Response:**
```json
{
    "message": "Review updated successfully"
}
```

---

### DELETE `/reviews/:id`

**Deskripsi:**  
Menghapus review berdasarkan ID.  
**(Protected route - butuh token)**

**Headers:**
```http
Authorization: Bearer <token>
```

**Params:**
- `id` – ID review (integer)

**Response:**
```json
{
  "message": "Review deleted successfully"
}
```

---

## Komunikasi Antar Service

Semua service berkomunikasi via HTTP REST API. Contoh:

- Order Service akan:
  - Memanggil User Service untuk cek `user_id`
  - Memanggil Menu Service untuk cek `menu_id`
- Review Service akan:
  - Ambil info dari User dan Menu Service sebelum simpan review
- Dan lain-lain

---

## Port yang Digunakan di dalam Kode

| Service         | Port |
|-----------------|------|
| User Service     | 3001 |
| Menu Service     | 3002 |
| Order Service    | 3003 |
| Review Service   | 3004 |

---

## Teknologi yang Digunakan

- Node.js / Express
- JSON format
- Bcrypt
- Jsonwebtoken

---

## Author

UTS EAI - Team 2
- Fatih Fikry Oktavianto
- Viriya Sandi Moggallana Wijaya
- Siti Aqila Ghaisani Akmal
- Dhivi Cagardimika Sumardiyono
