# Trading Platform

Welcome to the Trading Platform! This application allows users to trade stocks in real-time, manage their investments, and keep track of their favorite stocks
<div>
  <img src="resources/Screenshot 2024-07-14 125137.png" alt="Homepage Screen" width="380px" height="220px">
  <img src="resources/Screenshot 2024-07-14 125153.png" alt="Homepage Screen" width="380px" height="220px">
</div>


## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Database Schema](#database-schema) (to be updated)
- [Architecture](#architecture) (to be updated)
- [Algorithm](#algorithm-components)

## Features
- **User Authentication**: Secure user sign-up and login using JWT.
- **Real-time Stock Trading**: Buy and sell stocks.
- **Investment Management**: Monitor and manage your portfolio.
- **Watchlist**: Keep an eye on your favorite stocks.
- **Fast Transactions**: Implemented in-memory order books management algorithms for efficient transactions.
<div>
  <img src="resources/Screenshot 2024-07-14 134048.png" alt="Homepage Screen" width="380px" height="220px">
  <img src="resources/Screenshot 2024-07-14 134102.png" alt="Homepage Screen" width="380px" height="220px">
</div>


## Technologies Used
- **Frontend**: JavaScript, React
- **Backend**: Node.js, Express
- **Database**: SQL
- **Authentication**: JSON Web Tokens (JWT)
- **Architecture**: Model-View-Controller (MVC) (as much as possible)

This document describes the working parts of the algorithm for managing the order book, filling orders, updating balances, and providing endpoints for depth and balance in a trading platform.


## Algorithm Components

## Key Functions

- **Check Order Fillability**: Determines if the incoming order can be filled immediately.
- **Match Remaining Quantity**: Matches and fills the remaining quantity of an order by iterating through sorted bids and asks.
- **Fill Orders**: Updates the order book, flips balances, and adjusts quantities and prices based on matched orders.
- **Balance Retrieval**: Fetches and returns the user's current balance details.


### 1. Order Matching and Filling
- **Check Order Fillability**: The algorithm starts by checking if incoming orders can be filled based on existing orders in the order book.
- **Match Remaining Quantity**: If an order is partially filled, the remaining quantity is matched by sorting the bids and asks arrays. Bids are sorted in descending order (highest price first), and asks are sorted in ascending order (lowest price first).
- **Fill Orders Function**: This function iterates through the bids and asks to match them based on price and quantity. It updates the user balances accordingly. If a bid matches an ask, the algorithm updates the quantities and prices, flips the balances between the involved users, and adjusts the stock and cash balances.

### 3. Balance Endpoint
- **Retrieve User Balance**: The balance endpoint retrieves a user's balance for USD and specific stocks (e.g., Google). It checks if the user exists based on their ID and returns the current balance.

### 4. Order Book Management
- **In-Memory Order Books**: The algorithm uses in-memory data structures to manage the order books for fast transaction processing.
- **Prevent Self-Trade**: It includes logic to prevent users from trading with themselves.

## Detailed Steps

<div>
  <img src="resources/Screenshot 2024-07-14 133920.png" alt="Homepage Screen"width="380px" height="220px">
  <img src="resources/Screenshot 2024-07-14 133940.png" alt="Homepage Screen"width="380px" height="220px">
</div>

### 1. Order Matching and Filling
- **Iterate and Match Orders**: The algorithm iterates over the bids array and tries to match each bid with an ask that has a price less than or equal to the bid price.
- **Balance Updates**: When a match is found, the function flips the balance between the user IDs. It decreases the quantity of the stock from the seller and increases it for the buyer. The cash balance is updated based on the stock's price and exchange rate.
- **Handle Partial Fills**: If an order cannot be completely filled, the remaining quantity is adjusted, and the partially filled order is updated in the order book.

### 2. Depth Endpoint
- **Calculate and Sort Depth**: The depth endpoint calculates the total quantity available at each price level by iterating through bids and asks, and sorts the results.
- **Generate Depth Graph**: The accumulated data is used to generate a depth graph, visualizing the market depth for the frontend users.

### 3. Balance Endpoint
- **Retrieve and Return Balance**: The endpoint fetches the user's balance details for USD and specific stocks based on their user ID, ensuring the user exists in the system.


By following these steps and using these functions, the algorithm efficiently manages the order book, processes trades in real-time, and provides necessary endpoints for frontend integration.
## Installation
1. **Clone the Repository**
   ```sh
   git clone https://github.com/avisharma444/StockBroker.git
   cd trading-platform
