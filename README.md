# My Awesome Calculator by Shlok Shrivastava

A fully functional, beautiful web-based calculator built with Python Flask, featuring advanced mathematical operations, memory functions, and calculation history. The most amazing calculator you'll ever use!

## 🌟 Features

### 🧮 Basic Calculator Operations
- Addition, subtraction, multiplication, division
- Decimal point support
- Parentheses for complex expressions
- Clear (C) and Clear Entry (CE) functions
- Backspace functionality

### 🔬 Scientific Functions
- Trigonometric functions (sin, cos, tan)
- Logarithmic functions (log, ln)
- Square root (√)
- Power functions (x², x³, custom powers)
- Mathematical constants (π, e)
- Factorial (n!)
- Percentage calculations

### 💾 Memory Functions
- Memory Clear (MC)
- Memory Recall (MR)
- Memory Add (M+)
- Memory Subtract (M-)
- Memory Store (MS)

### 📊 Additional Features
- Calculation history (last 50 calculations)
- Local storage persistence
- Keyboard support
- Responsive design for mobile devices
- Beautiful modern UI with animations
- Error handling and validation

## 🚀 Quick Start

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Installation Steps

1. **Open Terminal/Command Prompt**

2. **Navigate to this folder**
   ```bash
   cd /Users/sshr32/Desktop/ShlokCalculator
   ```

3. **Create a virtual environment (recommended)**
   ```bash
   python3 -m venv calculator_env
   
   # On macOS/Linux:
   source calculator_env/bin/activate
   
   # On Windows:
   calculator_env\Scripts\activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Open your browser**
   Navigate to: `http://localhost:5000/advanced-calc`

## 🌐 Public Access Options

### Option 1: Local Network Access
- Use your computer's IP address: `http://[YOUR-IP]:5000/advanced-calc`
- Works for devices on the same Wi-Fi network

### Option 2: Public Tunnel (localtunnel)
```bash
# Install localtunnel
npm install -g localtunnel

# Run your calculator
python app.py

# In another terminal, create public tunnel
lt --port 5000 --subdomain your-custom-name
```

### Option 3: Deploy to Replit
1. Go to replit.com
2. Upload the `shlok-calculator-replit.zip` file
3. Click "Run"
4. Get instant public URL

## 📱 Mobile Access

Your calculator is fully mobile-optimized with:
- ✅ Touch-friendly buttons
- ✅ Responsive design
- ✅ Works on any mobile browser
- ✅ All features available on mobile

## 🎨 URLs Available

- **Main Calculator:** `http://localhost:5000/`
- **Advanced Calculator:** `http://localhost:5000/advanced-calc`
- **Alternative URL:** `http://localhost:5000/my-calculator`

## 📂 File Structure

```
ShlokCalculator/
├── app.py                    # Main Flask application (local)
├── main.py                   # Replit-optimized version
├── requirements.txt          # Python dependencies
├── shlok-calculator-replit.zip  # Ready-to-deploy package
├── templates/
│   └── index.html           # Calculator interface
└── static/
    ├── css/
    │   └── style.css        # Beautiful styling
    └── js/
        └── calculator.js    # Interactive functionality
```

## 🛠️ Usage

### Basic Operations
- Click number buttons (0-9) to input numbers
- Use operator buttons (+, -, ×, ÷) for basic arithmetic
- Press "=" or Enter key to calculate
- Use "C" to clear everything, "CE" to clear current entry

### Scientific Functions
- Click function buttons (sin, cos, tan, log, ln, √)
- Use π and e buttons for mathematical constants
- Use x² and x³ for square and cube operations
- Use n! for factorial calculations

### Memory Operations
- **MC**: Clear memory
- **MR**: Recall value from memory
- **M+**: Add current result to memory
- **M-**: Subtract current result from memory
- **MS**: Store current result in memory

### Keyboard Shortcuts
- **Numbers (0-9)**: Input numbers
- **+, -, *, /**: Basic operations
- **(, )**: Parentheses
- **.**: Decimal point
- **Enter or =**: Calculate
- **Escape**: Clear all
- **Backspace**: Delete last character

## 🎯 Example Calculations

- **Basic:** `2 + 3 * 4` = `14`
- **Scientific:** `sin(π/2)` = `1`
- **Complex:** `sqrt(16) + log(100)` = `6`
- **Advanced:** `(5!)/(3! * 2!)` = `10`

## 🔧 Customization

### Change Port
Edit `app.py` line 107:
```python
app.run(debug=True, host='0.0.0.0', port=8080)  # Change 5000 to 8080
```

### Add Custom Routes
Add new routes in `app.py`:
```python
@app.route('/your-custom-url')
def custom_calculator():
    return render_template('index.html')
```

### Modify Styling
Edit `static/css/style.css` to change colors, fonts, or layout.

## 🌐 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Kill existing process
lsof -ti:5000 | xargs kill -9

# Or change port in app.py
```

### Module Not Found
```bash
# Make sure virtual environment is activated
source calculator_env/bin/activate
pip install -r requirements.txt
```

### Mobile Not Working
1. Ensure same Wi-Fi network
2. Use computer's IP address instead of localhost
3. Try public tunnel with localtunnel or ngrok

## 📝 License

This project is open source and free to use.

## 👨‍💻 Creator

**Built with ❤️ by Shlok Shrivastava**

Enjoy the most amazing calculator you'll ever use! 🧮✨

---

## 🚀 Quick Commands

```bash
# Setup and run
cd /Users/sshr32/Desktop/ShlokCalculator
python3 -m venv calculator_env
source calculator_env/bin/activate
pip install -r requirements.txt
python app.py

# Open browser to: http://localhost:5000/advanced-calc
```
















