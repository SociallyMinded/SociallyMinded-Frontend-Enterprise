# SociallyMinded-Frontend-Enterprise

This repository contains code for the frontend social enterprise portal

## Demo Video
[insert demo video]

## Installation guide

1. Clone this repo

2. Navigate to the root directory and run `npm i`

3. After running `npm i`, run npm start 

## Frontend Tech Stack
<img width="616" alt="Screenshot 2023-04-14 at 2 47 02 PM" src="https://user-images.githubusercontent.com/97529863/231965201-9746f258-17b1-4e63-b5fa-b8f3511dfc97.png">

## Frontend Architecture
Component based architecture
- Common components (under common folder) : components that can be shared across different pages (ie Button, Headers)
- Page components (under respective page folder) : components that leverages on smaller sub-components to render a page (ie ShopPage)

Modularity 
- As far as possible, page components are split into smaller components so that the code is more modular and reusable (ie ShopPage is comprised of a SearchInput component, a PromptResults component, as well as a DataDisplay component)

Separation of Controller and View functions
- Controller : files (.js) containing hooks (useState, useEffect) to help perform data fetching (via axios), and CRUD operations
- View : files (.jsx) containing modular components that uses methods from controller (hooks) to determine data rendering logic 

React Hooks used
- useState : allow components to store state 
- useEffect : perform operations with side effects (ie data fetching)
- useMemo : cache the result of a expensive calculations between re-renders (ie sorting of data)

Other React packages used 
- React Router : handle client and server-side routing in React applications

## Key features
Authentication 
- Sign up for a new account
- Log in to account
- Log in / sign up via an existing gmail account
- Log out
- Reset password

Listings
- View all products currently sold
- View details of a product (ie price, customer ratings and reviews)
- Search for product by name
- Add a new product
- Update product details
- Delete a product (if product does not have any orders or all associated orders have been completed)

Shopfront
- View and manage all order records
- Search order records by Id
- Filter order records by order status
- Export order records as a CSV file 
- Update order statueses

Dashboard
- View analytics of sales and order records for each month (default is set to current month)

