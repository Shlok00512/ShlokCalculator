from flask import Flask, render_template, request, jsonify
import math
import re

app = Flask(__name__)

class Calculator:
    """Calculator class to handle all mathematical operations"""
    
    @staticmethod
    def evaluate_expression(expression):
        """Safely evaluate mathematical expressions"""
        try:
            # Remove any whitespace
            expression = expression.replace(' ', '')
            
            # Replace common mathematical functions
            expression = expression.replace('√', 'sqrt')
            expression = expression.replace('π', str(math.pi))
            expression = expression.replace('e', str(math.e))
            
            # Handle percentage calculations
            expression = re.sub(r'(\d+)%', r'(\1/100)', expression)
            
            # Define allowed operations and functions
            allowed_names = {
                k: v for k, v in math.__dict__.items() if not k.startswith("__")
            }
            allowed_names.update({
                "abs": abs,
                "round": round,
                "min": min,
                "max": max,
                "sum": sum,
            })
            
            # Evaluate the expression safely
            result = eval(expression, {"__builtins__": {}}, allowed_names)
            
            # Handle division by zero and other math errors
            if math.isnan(result) or math.isinf(result):
                return "Error: Invalid operation"
            
            # Format the result nicely
            if isinstance(result, float):
                if result.is_integer():
                    return str(int(result))
                else:
                    return f"{result:.10g}"  # Remove trailing zeros
            
            return str(result)
            
        except ZeroDivisionError:
            return "Error: Division by zero"
        except ValueError as e:
            return f"Error: {str(e)}"
        except SyntaxError:
            return "Error: Invalid expression"
        except Exception as e:
            return f"Error: {str(e)}"

# Routes
@app.route('/')
def index():
    """Main calculator page"""
    return render_template('index.html')

@app.route('/my-calculator')
def my_calculator():
    """Alternative URL for calculator"""
    return render_template('index.html')

@app.route('/advanced-calc')
def advanced_calc():
    """Another alternative URL"""
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    """API endpoint for calculations"""
    try:
        data = request.get_json()
        expression = data.get('expression', '')
        
        if not expression:
            return jsonify({'error': 'No expression provided'}), 400
        
        result = Calculator.evaluate_expression(expression)
        
        return jsonify({
            'expression': expression,
            'result': result
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/history')
def history():
    """Calculator history page (future enhancement)"""
    return render_template('history.html')

# This is required for Vercel
if __name__ == '__main__':
    app.run()


