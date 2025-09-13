# Database Schema

This document outlines the database schema for the AgriConnect application.

## Table of Contents

- [User](#user)
- [Product](#product)
- [Order](#order)
- [Cluster](#cluster)
- [Delivery](#delivery)

---

### User

Stores user information and their roles within the application.

| Column      | Type        | Constraints                | Description                                  |
|-------------|-------------|----------------------------|----------------------------------------------|
| `id`        | `UUID`      | `PRIMARY KEY`, `UNIQUE`    | Unique identifier for the user.              |
| `name`      | `VARCHAR(255)`| `NOT NULL`                 | The user's full name.                        |
| `email`     | `VARCHAR(255)`| `NOT NULL`, `UNIQUE`       | The user's email address.                    |
| `password`  | `VARCHAR(255)`| `NOT NULL`                 | Hashed password for the user.                |
| `role`      | `ENUM`      | `'user', 'dispatcher', 'admin'` | The user's role. Defaults to `'user'`.       |
| `phone`     | `VARCHAR(20)`| `NULLABLE`                 | The user's phone number.                     |
| `address`   | `TEXT`      | `NULLABLE`                 | The user's physical address.                 |
| `avatar`    | `VARCHAR(255)`| `NULLABLE`                 | URL to the user's profile picture.           |
| `created_at`| `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP`| Timestamp of when the user was created.      |
| `updated_at`| `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP`| Timestamp of when the user was last updated. |

---

### Product

Stores information about products available in the marketplace.

| Column      | Type        | Constraints                | Description                                  |
|-------------|-------------|----------------------------|----------------------------------------------|
| `id`        | `UUID`      | `PRIMARY KEY`, `UNIQUE`    | Unique identifier for the product.           |
| `name`      | `VARCHAR(255)`| `NOT NULL`                 | Name of the product.                         |
| `description`| `TEXT`      | `NOT NULL`                 | Detailed description of the product.         |
| `price`     | `DECIMAL(10, 2)`| `NOT NULL`               | Price of the product.                        |
| `quantity`  | `INTEGER`   | `NOT NULL`                 | Available quantity of the product.           |
| `seller_id` | `UUID`      | `FOREIGN KEY (User.id)`    | The user who is selling the product.         |
| `cluster_id`| `UUID`      | `FOREIGN KEY (Cluster.id)` | The cluster this product belongs to (optional).|
| `image_url` | `VARCHAR(255)`| `NULLABLE`                 | URL to the product's image.                  |
| `created_at`| `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP`| Timestamp of when the product was created.   |
| `updated_at`| `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP`| Timestamp of when the product was last updated.|

---

### Order

Stores information about orders placed by users.

| Column            | Type        | Constraints                | Description                                  |
|-------------------|-------------|----------------------------|----------------------------------------------|
| `id`              | `UUID`      | `PRIMARY KEY`, `UNIQUE`    | Unique identifier for the order.             |
| `user_id`         | `UUID`      | `FOREIGN KEY (User.id)`    | The user who placed the order.               |
| `product_id`      | `UUID`      | `FOREIGN KEY (Product.id)` | The product that was ordered.                |
| `quantity`        | `INTEGER`   | `NOT NULL`                 | The quantity of the product ordered.         |
| `total_price`     | `DECIMAL(10, 2)`| `NOT NULL`               | The total price of the order.                |
| `status`          | `ENUM`      | `'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'` | The current status of the order.             |
| `pickup_address`  | `TEXT`      | `NOT NULL`                 | The address for picking up the order.        |
| `delivery_address`| `TEXT`      | `NOT NULL`                 | The address for delivering the order.        |
| `created_at`      | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP`| Timestamp of when the order was created.     |
| `updated_at`      | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP`| Timestamp of when the order was last updated.|

---

### Cluster

Stores information about farmer clusters or groups.

| Column      | Type        | Constraints                | Description                                  |
|-------------|-------------|----------------------------|----------------------------------------------|
| `id`        | `UUID`      | `PRIMARY KEY`, `UNIQUE`    | Unique identifier for the cluster.           |
| `name`      | `VARCHAR(255)`| `NOT NULL`                 | Name of the cluster.                         |
| `description`| `TEXT`      | `NULLABLE`                 | A short description of the cluster.          |
| `location`  | `VARCHAR(255)`| `NULLABLE`                 | The geographical location of the cluster.    |
| `created_at`| `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP`| Timestamp of when the cluster was created.   |
| `updated_at`| `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP`| Timestamp of when the cluster was last updated.|

---

### Delivery

Stores information about the delivery of an order, handled by dispatchers.

| Column          | Type        | Constraints                | Description                                  |
|-----------------|-------------|----------------------------|----------------------------------------------|
| `id`            | `UUID`      | `PRIMARY KEY`, `UNIQUE`    | Unique identifier for the delivery.          |
| `order_id`      | `UUID`      | `FOREIGN KEY (Order.id)`   | The order associated with this delivery.     |
| `dispatcher_id` | `UUID`      | `FOREIGN KEY (User.id)`    | The dispatcher assigned to this delivery.    |
| `status`        | `ENUM`      | `'pending', 'in_transit', 'delivered', 'failed'` | The current status of the delivery.          |
| `notes`         | `TEXT`      | `NULLABLE`                 | Any notes or comments about the delivery.    |
| `created_at`    | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP`| Timestamp of when the delivery was created.  |
| `updated_at`    | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP`| Timestamp of when the delivery was last updated.|
