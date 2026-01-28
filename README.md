# 📦 Invoice Management App

A modern **Invoice Management Application** built with **React and Redux Toolkit** to manage invoices efficiently using centralized state management.

This project demonstrates real-world usage of **Redux Toolkit** for handling shared application state in a clean and scalable way.

<img width="1848" height="857" alt="image" src="https://github.com/user-attachments/assets/9f8fd50c-ae65-4b08-bc6b-817a91aaf2c8" />

<img width="1688" height="871" alt="image" src="https://github.com/user-attachments/assets/391727bb-76e1-471f-b426-db4941f62671" />

<img width="1671" height="883" alt="image" src="https://github.com/user-attachments/assets/8f231919-a32b-4f29-8f02-653bb1b2a4a6" />


<img width="1852" height="907" alt="image" src="https://github.com/user-attachments/assets/2be747db-e81a-42aa-9a43-7a97ce89158d" />




---

## 🚀 Features

- ➕ Create invoices  
- 📄 View invoice details  
- 🔄 Update invoice status (Paid / Pending / Draft)  
- 🧾 Manage invoices globally  
- 🧠 Centralized state management with Redux Toolkit  

---

## 🛠 Tech Stack

### ⚛️ React
- Used to build the user interface
- Component-based architecture for reusable and maintainable UI

---

### 🧠 Redux Toolkit
- Manages **global application state**
- Stores invoice data, selected invoice, and UI-related state
- Reduces boilerplate compared to traditional Redux
- Ensures predictable and debuggable state updates

- 🔮 Future Enhancements

=> Backend integration for data persistence

=> User authentication and authorization

=> Generated Invoice Directly Send to Client's Email

**State managed by Redux Toolkit:**
```js
{
  invoices: [],
  selectedInvoice: null,
  isFormOpen: false,
  filter: "all"
}





