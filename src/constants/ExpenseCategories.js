// export const ExpenseCategories = {
//   categories: {
//     Food: {
//       'Online Food Delivery': ['Zomato', 'Swiggy', 'Uber Eats'],
//       'Dining Out': ['Restaurants', 'Cafes', 'Street Food'],
//       'Snacks and Beverages': ['Snacks Shops', 'Juice Centers'],
//     },
//     Groceries: {
//       'Retail Stores': ['Big Bazaar', 'DMart', 'Reliance Fresh'],
//       'Online Stores': ['Amazon Pantry', 'BigBasket', 'Blinkit'],
//       'Local Stores': ['Kiranas', 'Vegetable Markets', 'Fruit Vendors'],
//     },
//     Utilities: {
//       'Electricity Bill': ['State Power Utilities'],
//       'Water Bill': ['Municipal Corporation'],
//       'Gas Services': ['Indane', 'Bharat Gas', 'HP Gas'],
//     },
//     Telecom: {
//       'Mobile Recharge': ['Jio', 'Airtel', 'Vodafone Idea'],
//       'Internet Services': ['ACT Fibernet', 'BSNL', 'Hathway'],
//       'Cable/DTH': ['Tata Sky', 'Airtel DTH', 'Dish TV'],
//     },
//     Housing: {
//       Rent: ['Monthly Rent Payments'],
//       'Home Loan': ['HDFC Bank', 'SBI', 'ICICI Bank'],
//       Maintenance: ['Society Charges', 'Repair Services'],
//     },
//     Transport: {
//       Fuel: ['Petrol', 'Diesel', 'CNG'],
//       'Public Transport': ['Metro', 'State Buses', 'Railways'],
//       'Cab Services': ['Ola', 'Uber', 'Rapido'],
//       'Toll and Parking': ['FASTag', 'Parking Fees'],
//     },
//     Health: {
//       'Medical Services': ['Doctor Consultations', 'Hospital Bills'],
//       Pharmacy: ['Apollo Pharmacy', 'MedPlus', 'NetMeds'],
//       'Health Insurance': ['Star Health', 'ICICI Lombard', 'Max Bupa'],
//     },
//     Education: {
//       'Tuition Fees': ['Schools', 'Colleges', 'Universities'],
//       'Online Learning': ["Byju's", 'Unacademy', 'Coursera'],
//       'Books and Supplies': ['Bookstores', 'Stationery Shops'],
//     },
//     Shopping: {
//       Clothing: ['Myntra', 'AJIO', 'Lifestyle'],
//       Electronics: ['Flipkart', 'Amazon', 'Croma'],
//       Jewelry: ['Tanishq', 'Kalyan Jewelers', 'Malabar Gold'],
//       'Festive Shopping': ['Gifts', 'Decorations'],
//     },
//     Entertainment: {
//       'Streaming Services': ['Netflix', 'Amazon Prime', 'Disney+ Hotstar'],
//       Movies: ['PVR', 'INOX', 'Local Theaters'],
//       Gaming: ['PlayStation Store', 'Xbox Store', 'Steam'],
//       Music: ['Spotify', 'Apple Music', 'Gaana'],
//     },
//     Travel: {
//       Airfare: ['IndiGo', 'Air India', 'SpiceJet'],
//       Hotels: ['OYO', 'MakeMyTrip', 'Goibibo'],
//       'Train Tickets': ['IRCTC'],
//       'Holiday Packages': ['Thomas Cook', 'Yatra', 'SOTC'],
//     },
//     Investments: {
//       Stocks: ['Zerodha', 'Upstox', 'Groww'],
//       'Mutual Funds': ['SBI Mutual Fund', 'HDFC Mutual Fund'],
//       Cryptocurrency: ['WazirX', 'CoinDCX', 'CoinSwitch'],
//     },
//     Insurance: {
//       'Life Insurance': ['LIC', 'HDFC Life', 'ICICI Prudential'],
//       'Health Insurance': ['Star Health', 'Religare'],
//       'Car Insurance': ['Bajaj Allianz', 'Tata AIG'],
//     },
//     PersonalCare: {
//       'Salons and Spas': ['Naturals', 'Lakme Salon'],
//       'Beauty Products': ['Nykaa', 'Purplle'],
//       Fitness: ['Gym Memberships', 'Yoga Classes'],
//     },
//     Household: {
//       'Cleaning Services': ['Urban Company', 'Local Agencies'],
//       'Pest Control': ['HiCare', 'Pepcopp'],
//       'Plumbing and Repairs': ['Local Services'],
//     },
//     Charity: {
//       Donations: ['Temples', 'NGOs', 'Online Fundraising'],
//     },
//     Consulting: {
//       'Tax and Accounting': ['Chartered Accountants', 'Tax Consultants'],
//       'Legal Services': ['Advocates', 'Notaries'],
//     },
//   },
// };


export const ExpenseCategories = {
  Food: {
    merchants: ['Zomato', 'Swiggy', 'Uber Eats', 'Restaurants', 'Cafes', 'Street Food'],
    icon: 'food'
  },
  Groceries: {
    merchants: ['Big Bazaar', 'DMart', 'Reliance Fresh', 'Amazon Pantry', 'BigBasket', 'Blinkit'],
    icon: 'cart-outline'
  },
  Utilities: {
    merchants: ['State Power Utilities', 'Municipal Corporation', 'Indane', 'Bharat Gas', 'HP Gas'],
    icon: 'lightning-bolt-outline'
  },
  Telecom: {
    merchants: ['Jio', 'Airtel', 'Vodafone Idea', 'ACT Fibernet', 'BSNL', 'Hathway'],
    icon: 'cellphone'
  },
  Housing: {
    merchants: ['Monthly Rent Payments', 'HDFC Bank', 'SBI', 'ICICI Bank', 'Society Charges', 'Repair Services'],
    icon: 'home-outline'
  },
  Transport: {
    merchants: ['Ola', 'Uber', 'Rapido', 'Petrol', 'Diesel', 'Metro'],
    icon: 'car'
  },
  Health: {
    merchants: ['Doctor Consultations', 'Hospital Bills', 'Apollo Pharmacy', 'MedPlus', 'NetMeds', 'Star Health'],
    icon: 'hospital-box-outline'
  },
  Education: {
    merchants: ['Schools', 'Colleges', 'Universities', "Byju's", 'Unacademy', 'Coursera'],
    icon: 'school-outline'
  },
  Shopping: {
    merchants: ['Myntra', 'AJIO', 'Lifestyle', 'Flipkart', 'Amazon', 'Croma'],
    icon: 'shopping-outline'
  },
  Entertainment: {
    merchants: ['Netflix', 'Amazon Prime', 'Disney+ Hotstar', 'PVR', 'INOX', 'PlayStation Store'],
    icon: 'movie-open-outline'
  },
  Travel: {
    merchants: ['IndiGo', 'Air India', 'SpiceJet', 'OYO', 'MakeMyTrip', 'IRCTC'],
    icon: 'airplane'
  },
  Investments: {
    merchants: ['Zerodha', 'Upstox', 'Groww', 'SBI Mutual Fund', 'HDFC Mutual Fund', 'WazirX'],
    icon: 'chart-line'
  },
  Insurance: {
    merchants: ['LIC', 'HDFC Life', 'ICICI Prudential', 'Star Health', 'Religare', 'Bajaj Allianz'],
    icon: 'shield-check-outline'
  },
  PersonalCare: {
    merchants: ['Naturals', 'Lakme Salon', 'Nykaa', 'Purplle', 'Gym Memberships', 'Yoga Classes'],
    icon: 'face-woman-outline'
  },
  Household: {
    merchants: ['Urban Company', 'HiCare', 'Pepcopp', 'Plumbing Services', 'Cleaning Services', 'Pest Control'],
    icon: 'home-heart'
  },
  Charity: {
    merchants: ['Temples', 'NGOs', 'Online Fundraising'],
    icon: 'hand-heart-outline'
  },
  Consulting: {
    merchants: ['Chartered Accountants', 'Tax Consultants', 'Advocates', 'Notaries'],
    icon: 'account-tie-outline'
  },
};


// export const CategoryColors = {
//   Food: '#FF6B6B', // Coral Red
//   Groceries: '#4ECDC4', // Tiffany Blue
//   Utilities: '#FFD93D', // Sunflower Yellow
//   Telecom: '#6C5CE7', // Soft Purple
//   Housing: '#FF9F43', // Orange
//   Transportation: '#00B894', // Mint Green
//   Health: '#F368E0', // Pink
//   Education: '#0984E3', // Royal Blue
//   Shopping: '#55EFC4', // Aquamarine
//   Entertainment: '#D63031', // Carmine Red
//   Travel: '#00CEC9', // Turquoise
//   Investments: '#FDCB6E', // Gold
//   Insurance: '#A29BFE', // Lavender
//   PersonalCare: '#81CEC6', // Seafoam Green
//   Wellness: '#FF7675', // Peach
//   Household: '#74B9FF', // Sky Blue
//   Charity: '#E84393', // Raspberry Pink
//   Consulting: '#2D3436', // Charcoal
//   Consulting: '#00B4D8', // Cerulean Blue
// };
// export const CategoryColors = {
//   Food: '#FF5733', // Reddish-Orange
//   Groceries: '#4CAF50', // Green
//   Utilities: '#3498DB', // Blue
//   Telecommunications: '#9B59B6', // Purple
//   Housing: '#E67E22', // Deep Orange
//   Transportation: '#E74C3C', // Red
//   Health: '#2ECC71', // Light Green
//   Education: '#F1C40F', // Yellow
//   Shopping: '#8E44AD', // Dark Purple
//   Entertainment: '#1ABC9C', // Teal
//   Travel: '#16A085', // Dark Teal
//   Investments: '#2980B9', // Deep Blue
//   Insurance: '#D35400', // Burnt Orange
//   PersonalCare: '#C0392B', // Dark Red
//   Household: '#27AE60', // Emerald Green
//   Charity: '#F39C12', // Bright Yellow-Orange
//   Consulting: '#34495E', // Dark Grayish Blue
// };

export const CategoryColors = {
  Food: '#FF5733',
  Groceries: '#4CAF50',
  Utilities: '#3498DB',
  Telecom: '#9B59B6',
  Housing: '#E67E22',
  Transport: '#E74C3C',
  Health: '#2ECC71',
  Education: '#F1C40F',
  Shopping: '#8E44AD',
  Entertainment: '#1ABC9C',
  Travel: '#16A085',
  Investments: '#2980B9',
  Insurance: '#D35400',
  PersonalCare: '#C0392B',
  Household: '#27AE60',
  Charity: '#F39C12',
  Consulting: '#34495E',
};

// MaterialCommunityIcons
export const CategoryIcons = {
  Food: 'food',
  Groceries: 'cart',
  Utilities: 'flash',
  Telecom: 'phone',
  Housing: 'home',
  Transport: 'car',
  Health: 'heart',
  Education: 'school',
  Shopping: 'shopping',
  Entertainment: 'movie',
  Travel: 'airplane',
  Investments: 'chart-line',
  Insurance: 'shield',
  PersonalCare: 'spa',
  Household: 'sofa',
  Charity: 'hand-heart',
  Consulting: 'account-tie',
};

const defaultData = [
  { value: 400, color: '#FF6384', label: 'Food', text: 32.7 },
  { value: 360, color: '#36A2EB', label: 'Transport', text: 29.4 },
  { value: 280, color: '#FFCE56', label: 'Shopping', text: 22.9 },
  { value: 184, color: '#4BC0C0', label: 'Health', text: 15.0 },
];
