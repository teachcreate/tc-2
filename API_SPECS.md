# TeachCreate.io API Specifications

## Base URL
`https://api.teachcreate.io/v1`

## Authentication
All endpoints require JWT authentication unless noted.

### Login
```
POST /auth/login
```
Request:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
Response:
```json
{
  "token": "jwt.token.here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "teacher"
  }
}
```

## Products

### Get Products
```
GET /products
```
Query Params:
- `type`: Filter by product type (tool|game|resource)
- `category`: Filter by category ID
- `search`: Search term
- `limit`: Pagination limit
- `offset`: Pagination offset

Response:
```json
{
  "products": [
    {
      "id": "uuid",
      "title": "Math Quiz Generator",
      "price": 4.99,
      "thumbnailUrl": "https://...",
      "creator": {
        "id": "uuid",
        "displayName": "Ms. Johnson"
      }
    }
  ],
  "total": 42
}
```

### Create Product (Teacher only)
```
POST /products
```
Request:
```json
{
  "title": "New Educational Game",
  "description": "Interactive math game...",
  "price": 7.99,
  "type": "game",
  "categoryIds": ["uuid1", "uuid2"]
}
```
Response:
```json
{
  "id": "new-product-uuid",
  "status": "draft"
}
```

## Orders

### Create Order
```
POST /orders
```
Request:
```json
{
  "productId": "uuid",
  "paymentMethodId": "stripe_pm_id"
}
```
Response:
```json
{
  "orderId": "uuid",
  "status": "completed",
  "receiptUrl": "https://stripe.com/receipt"
}
```

## Reviews

### Submit Review
```
POST /products/:id/reviews
```
Request:
```json
{
  "rating": 5,
  "comment": "Great resource!"
}
```
Response:
```json
{
  "reviewId": "uuid",
  "status": "created"
}