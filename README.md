# Data Dashboard Project

## 🎯 Goals
- Fetch API data with the `useEffect` React hook and `async/await` syntax.
- Respond to events triggered by user interaction and handle user input.
- Use `.map()` to dynamically render a group of elements.
- Use `.filter()` to filter data based on user input.

## Required Features

### List of Data
- The site displays a list of data fetched using an API call.
- Use the `useEffect` React hook and `async/await` syntax.

### 3 Summary Data Statistics
- The app dashboard includes at least three summary statistics about the data, such as:
  - The total number of items in the dataset or which meet certain criteria in the dataset.
  - The mean, median, mode, or other statistic of a certain aspect of the data.
  - Quartiles, quintiles, or ranges of the data.

### Search Data
- A search bar allows the user to search for an item in the fetched data.

### Filter Data
- Multiple different filters (2+) allow the user to filter items in the database by specified categories.

## Project Structure
```plaintext
|-- src
|   |-- routes
|   |   |-- Dashboard.jsx
|   |
|   |-- App.js
|   |-- index.js
|
|-- public
|   |-- index.html
|
|-- README.md
|-- .gitignore
