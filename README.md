# NextGen Academy Website

A responsive academy website built with plain HTML, CSS and JavaScript (no libraries or frameworks).

## Features

- **Responsive design:** works on desktop and mobile (hamburger menu on small screens, course cards reflow from 4 to 2 to 1 columns).
- **Student Admission Eligibility Checker:** takes name, marks and course.
  - 70% or more: Direct Admission
  - 50-69%: Eligible, counselling recommended
  - Below 50%: Contact admission counsellor
- **Fee Calculator:** shows Original Fee, Discount and Final Fee.
  - 3-5 months: 5% discount
  - 6+ months: 10% discount
- **Admission Form:** name, father's name, email, phone, course, marks and optional message, with a reference number shown on submit.
- **Contact Us section:** email, phone, WhatsApp link and a message form.
- **Form validation:** names (letters only, min 3 characters), marks (0-100), email format, phone (11 digits starting with 03), required fields.
- **Extra feature: Dark Mode.** The choice is saved in `localStorage`, so it is remembered after a refresh.

## Course Fees

| Course | Fee per month |
|---|---|
| Web Development | Rs. 5,000 |
| Graphic Design | Rs. 4,000 |
| AI Course | Rs. 7,000 |
| Freelancing | Rs. 3,500 |

## Project Structure

```
nextgen-academy/
├── index.html   - page structure and all sections
├── style.css    - styling, light/dark theme variables, responsive rules
├── script.js    - eligibility logic, fee calculation, validation, dark mode
└── README.md    - this file
```

## How to Run

1. Extract the zip (if you downloaded it as a zip).
2. Keep all files in the same folder.
3. Double-click `index.html` to open it in any browser. No installation or server needed.

## Quick Guide to the Code (for viva)

- **Fees:** the `courseFees` object at the top of `script.js` holds every course price. Changing a number there updates the dropdowns and the calculator.
- **Eligibility logic:** the `if / else if / else` block in the "ELIGIBILITY CHECKER" section compares `marks` with 70 and 50.
- **Discount logic:** the `discountPercent` block in the "FEE CALCULATOR" section sets 10% for 6+ months, 5% for 3-5 months, otherwise 0%.
- **Validation:** small helper functions (`isValidEmail`, `isValidPhone`, `isValidName`, `validateMarks`) use regular expressions and number checks; `setError` and `clearErrors` show and remove red error messages.
- **Dark mode:** `applyTheme()` adds or removes the `dark` class on `<body>`; `style.css` swaps the colour variables under `body.dark`.

## Contact

- Email: ashmankhan72@gmail.com
- Phone: 03057823176

## Note

The admission and contact forms validate input and show a confirmation on screen, but they do not send data to a server or email. A backend or a service such as EmailJS would be needed for that.
