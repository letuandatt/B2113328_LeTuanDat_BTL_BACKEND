# 📚 Library Management System

![Node.js](https://img.shields.io/badge/Node.js-v18.17.0-green)
![MongoDB](https://img.shields.io/badge/MongoDB-v6.0-brightgreen)
![Vue.js](https://img.shields.io/badge/Vue.js-3.2.47-blue)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🌟 Giới thiệu

Hệ thống quản lý thư viện giúp bạn quản lý thông tin sách, độc giả, và các lượt mượn trả sách một cách hiệu quả. Dự án này được xây dựng với **Node.js**, **MongoDB** ở Backend và **Vue.js** ở Frontend.

## 🏗️ Cấu trúc dự án
```bash
├── app
│ ├── config
│ ├── controllers
│ ├── middlewares
│ ├── models
│ ├── routes
│ ├── utils
│ └── api-error.js
├── .eslintrc.js
├── .gitignore
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## 🚀 Bắt đầu

### Yêu cầu

- [Node.js](https://nodejs.org/) >= 18.17.0
- [MongoDB](https://www.mongodb.com/) >= 6.0

### Cài đặt

1. **Clone repo**

```bash
git clone https://github.com/letuandatt/B2113328_LeTuanDat_BTL_BACKEND.git
cd your-repo
```

2. **Cài đặt các dependency**

```bash
npm install

```

3. **Cấu hình biến môi trường**: Tạo file .env và điền các thông tin
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/library
```
4. **Chạy server**
```bash
npm start
```

### **Các API chính**

| Method | Endpoint | Mô tả | Tham số yêu cầu |
| ------ | -------- | ----- | --------------- |

## 🛠️ Công nghệ sử dụng
- Node.js: Nền tảng server
- Express.js: Framework cho API
- MongoDB: Cơ sở dữ liệu NoSQL
- Mongoose: Thư viện ODM cho MongoDB
- Vue.js: Framework frontend

## 📄 License
Dự án này được cấp phép dưới MIT License.

## 📧 Liên hệ
- Facebook: <a href="https://www.facebook.com/letuandattt/" target="_blank" rel="noopener noreferrer">Le Tuan Dat</a>
- Email: datb2113328@student.ctu.edu.vn