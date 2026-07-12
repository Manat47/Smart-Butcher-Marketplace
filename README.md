# Smart Butcher Marketplace

**Smart Butcher Marketplace** แพลตฟอร์มมาร์เก็ตเพลสสำหรับการซื้อขายเนื้อสัตว์คุณภาพพรีเมียมแบบครบวงจร
โปรเจกต์นี้เป็นระบบแบบ Full-Stack โดยแยกส่วนการพัฒนาออกเป็น **Frontend** (หน้าบ้าน) และ **Backend** (หลังบ้าน) เพื่อให้ง่ายต่อการดูแลและต่อยอดในอนาคต

---

## 🛠 เทคโนโลยีที่ใช้ (Tech Stack)

### 💻 Frontend (ฝั่งหน้าบ้าน)

- **Framework:** Next.js 16 (React 19)
- **ภาษาที่ใช้:** TypeScript
- **การจัดการ CSS/UI:** Tailwind CSS, shadcn/ui, Radix UI
- **การจัดการ State:** Zustand
- **เครื่องมืออื่นๆ:** Recharts, Sweetalert2 & Sonner

### ⚙️ Backend (ฝั่งหลังบ้าน)

- **Framework:** NestJS 11
- **ภาษาที่ใช้:** TypeScript
- **ฐานข้อมูล & ORM:** PostgreSQL + Prisma ORM
- **การยืนยันตัวตน (Authentication):** JWT & Passport.js
- **เครื่องมืออื่นๆ:** Groq SDK, Multer

### 🐳 Infrastructure (โครงสร้างพื้นฐาน)

- **Database Container:** มีไฟล์ `docker-compose.yaml` สำหรับรัน PostgreSQL 16 ผ่าน Docker (พอร์ต 5433)

---

## 🚀 วิธีการติดตั้งและรันโปรเจกต์ (Getting Started)

### 1. การเตรียมฐานข้อมูล (Database)

ต้องมีโปรแกรม Docker ติดตั้งอยู่ในเครื่องก่อน จากนั้นรันคำสั่งที่โฟลเดอร์หลัก:

```bash
docker-compose up -d
```

> คำสั่งนี้จะทำการสร้างฐานข้อมูล PostgreSQL จำลองชื่อ `butcher_postgres`

### 2. การตั้งค่าและรัน Backend

เข้าไปที่โฟลเดอร์ Backend:

```bash
cd Backend
```

1. ติดตั้งแพ็กเกจ: `npm install`
2. คัดลอกไฟล์ `.env.example` เป็น `.env` และตั้งค่าค่าตัวแปรต่างๆ (เช่น URL ฐานข้อมูล)
3. รัน Prisma เพื่อสร้างตารางฐานข้อมูล: `npx prisma db push` หรือ `npx prisma migrate dev`
4. รันเซิร์ฟเวอร์: `npm run start:dev`

### 3. การตั้งค่าและรัน Frontend

เปิด Terminal ใหม่แล้วเข้าไปที่โฟลเดอร์ frontend:

```bash
cd frontend
```

1. ติดตั้งแพ็กเกจ: `npm install`
2. คัดลอกไฟล์ `.env.example` เป็น `.env` (ปรับแก้ค่า API URL ให้ชี้ไปที่ Backend)
3. รันเซิร์ฟเวอร์หน้าบ้าน: `npm run dev`

---

## 📂 โครงสร้างโฟลเดอร์ (Folder Structure)

```text
Smart-Butcher-Marketplace/
├── Backend/                # โค้ดฝั่ง Server-side (NestJS API)
│   ├── prisma/             # ไฟล์ตั้งค่า Schema ของฐานข้อมูล
│   ├── src/                # โค้ดหลักของ Backend (Controllers, Services, Modules)
│   └── package.json
├── frontend/               # โค้ดฝั่ง Client-side (Next.js)
│   ├── app/                # โค้ดหน้าจอต่างๆ ของ Next.js (App Router)
│   ├── components/         # UI Components ที่ใช้งานร่วมกัน
│   ├── lib/                # ไฟล์ตั้งค่า/เครื่องมือเสริม
│   ├── store/              # ไฟล์จัดการ Global State (Zustand)
│   └── package.json
└── docker-compose.yaml     # ไฟล์สร้างฐานข้อมูลจำลอง (PostgreSQL)
```

---
