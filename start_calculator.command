#!/bin/bash
cd "$(dirname "$0")"
echo "🧮 Starting Shlok's Awesome Calculator..."
echo "📂 Working directory: $(pwd)"

# Create virtual environment if it doesn't exist
if [ ! -d "calculator_env" ]; then
    echo "🔧 Creating virtual environment..."
    python3 -m venv calculator_env
fi

# Activate virtual environment
echo "🚀 Activating virtual environment..."
source calculator_env/bin/activate

# Install dependencies
echo "📦 Installing dependencies..."
pip install -r requirements.txt

# Start the calculator
echo "🌟 Starting the calculator server..."
echo "✅ Your calculator will be available at:"
echo "   🔗 http://localhost:5000/advanced-calc"
echo "   🔗 http://localhost:5000/my-calculator"
echo "   🔗 http://localhost:5000/"
echo ""
echo "💡 Press Ctrl+C to stop the server"
echo "🎉 Enjoy your awesome calculator!"
echo ""

python app.py










