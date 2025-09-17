// Calculator JavaScript Implementation
class Calculator {
    constructor() {
        this.expression = '';
        this.result = '0';
        this.history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
        this.memory = parseFloat(localStorage.getItem('calculatorMemory')) || 0;
        this.isNewCalculation = true;
        
        // Initialize display
        this.updateDisplay();
        this.updateHistory();
        
        // Add keyboard support
        this.addKeyboardSupport();
    }

    // Update the calculator display
    updateDisplay() {
        const expressionElement = document.getElementById('expression');
        const resultElement = document.getElementById('result');
        const historyElement = document.getElementById('history');

        expressionElement.textContent = this.expression || '0';
        resultElement.textContent = this.result;
        
        if (this.history.length > 0) {
            const lastCalculation = this.history[this.history.length - 1];
            historyElement.textContent = `${lastCalculation.expression} = ${lastCalculation.result}`;
        }
    }

    // Add to expression
    addToExpression(value) {
        if (this.isNewCalculation && !isNaN(value)) {
            this.expression = '';
            this.isNewCalculation = false;
        }

        // Handle special cases
        if (value === '.' && this.expression.includes('.')) {
            return; // Don't add multiple decimal points
        }

        this.expression += value;
        this.updateDisplay();
    }

    // Add function to expression (like sin, cos, etc.)
    addFunction(func) {
        if (this.isNewCalculation) {
            this.expression = '';
            this.isNewCalculation = false;
        }
        this.expression += func;
        this.updateDisplay();
    }

    // Clear all
    clearAll() {
        this.expression = '';
        this.result = '0';
        this.isNewCalculation = true;
        this.updateDisplay();
    }

    // Clear entry (last character)
    clearEntry() {
        this.expression = '';
        this.updateDisplay();
    }

    // Backspace
    backspace() {
        if (this.expression.length > 0) {
            this.expression = this.expression.slice(0, -1);
            this.updateDisplay();
        }
    }

    // Toggle sign
    toggleSign() {
        if (this.expression) {
            if (this.expression.startsWith('-')) {
                this.expression = this.expression.substring(1);
            } else {
                this.expression = '-' + this.expression;
            }
            this.updateDisplay();
        }
    }

    // Calculate factorial
    calculateFactorial() {
        if (this.expression && !isNaN(this.expression)) {
            const num = parseInt(this.expression);
            if (num >= 0 && num <= 170) { // Prevent overflow
                let factorial = 1;
                for (let i = 2; i <= num; i++) {
                    factorial *= i;
                }
                this.expression = factorial.toString();
                this.updateDisplay();
            } else {
                this.showError('Factorial limit exceeded');
            }
        }
    }

    // Main calculate function
    async calculate() {
        if (!this.expression) return;

        try {
            // Show loading state
            this.showLoading(true);

            const response = await fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ expression: this.expression })
            });

            const data = await response.json();

            if (response.ok) {
                // Add to history
                this.addToHistory(this.expression, data.result);
                
                // Update result
                this.result = data.result;
                this.isNewCalculation = true;
                
                // Update display
                this.updateDisplay();
                this.updateHistory();
            } else {
                this.showError(data.error);
            }
        } catch (error) {
            this.showError('Connection error: ' + error.message);
        } finally {
            this.showLoading(false);
        }
    }

    // Add calculation to history
    addToHistory(expression, result) {
        const calculation = {
            expression: expression,
            result: result,
            timestamp: new Date().toLocaleString()
        };
        
        this.history.push(calculation);
        
        // Keep only last 50 calculations
        if (this.history.length > 50) {
            this.history = this.history.slice(-50);
        }
        
        // Save to localStorage
        localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
    }

    // Update history display
    updateHistory() {
        const historyList = document.getElementById('historyList');
        
        if (this.history.length === 0) {
            historyList.innerHTML = '<p class="no-history">No calculations yet</p>';
            return;
        }

        const historyHTML = this.history
            .slice(-10) // Show last 10 calculations
            .reverse()
            .map(calc => `
                <div class="history-item" onclick="calculator.useHistoryCalculation('${calc.expression}', '${calc.result}')">
                    <div><strong>${calc.expression} = ${calc.result}</strong></div>
                    <div style="font-size: 0.8em; color: #666;">${calc.timestamp}</div>
                </div>
            `).join('');

        historyList.innerHTML = historyHTML;
    }

    // Use calculation from history
    useHistoryCalculation(expression, result) {
        this.expression = expression;
        this.result = result;
        this.updateDisplay();
    }

    // Clear history
    clearHistory() {
        this.history = [];
        localStorage.removeItem('calculatorHistory');
        this.updateHistory();
        document.getElementById('history').textContent = '';
    }

    // Memory functions
    clearMemory() {
        this.memory = 0;
        localStorage.setItem('calculatorMemory', '0');
        this.showMessage('Memory cleared');
    }

    recallMemory() {
        this.expression = this.memory.toString();
        this.updateDisplay();
        this.showMessage('Memory recalled: ' + this.memory);
    }

    addToMemory() {
        if (this.result && this.result !== '0' && !this.result.startsWith('Error')) {
            this.memory += parseFloat(this.result);
            localStorage.setItem('calculatorMemory', this.memory.toString());
            this.showMessage('Added to memory: ' + this.result);
        }
    }

    subtractFromMemory() {
        if (this.result && this.result !== '0' && !this.result.startsWith('Error')) {
            this.memory -= parseFloat(this.result);
            localStorage.setItem('calculatorMemory', this.memory.toString());
            this.showMessage('Subtracted from memory: ' + this.result);
        }
    }

    storeMemory() {
        if (this.result && this.result !== '0' && !this.result.startsWith('Error')) {
            this.memory = parseFloat(this.result);
            localStorage.setItem('calculatorMemory', this.memory.toString());
            this.showMessage('Stored in memory: ' + this.result);
        }
    }

    // Show error message
    showError(message) {
        const resultElement = document.getElementById('result');
        resultElement.textContent = message;
        resultElement.classList.add('error');
        
        setTimeout(() => {
            resultElement.classList.remove('error');
        }, 3000);
    }

    // Show loading state
    showLoading(isLoading) {
        const calculator = document.querySelector('.calculator');
        if (isLoading) {
            calculator.classList.add('loading');
        } else {
            calculator.classList.remove('loading');
        }
    }

    // Show temporary message
    showMessage(message) {
        const historyElement = document.getElementById('history');
        const originalText = historyElement.textContent;
        
        historyElement.textContent = message;
        historyElement.style.color = '#4CAF50';
        
        setTimeout(() => {
            historyElement.textContent = originalText;
            historyElement.style.color = '';
        }, 2000);
    }

    // Add keyboard support
    addKeyboardSupport() {
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            
            // Prevent default for handled keys
            if ('0123456789+-*/.=()'.includes(key) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
                event.preventDefault();
            }

            // Handle number and operator keys
            if ('0123456789'.includes(key)) {
                this.addToExpression(key);
            } else if (key === '+') {
                this.addToExpression('+');
            } else if (key === '-') {
                this.addToExpression('-');
            } else if (key === '*') {
                this.addToExpression('*');
            } else if (key === '/') {
                this.addToExpression('/');
            } else if (key === '.') {
                this.addToExpression('.');
            } else if (key === '(') {
                this.addToExpression('(');
            } else if (key === ')') {
                this.addToExpression(')');
            } else if (key === 'Enter' || key === '=') {
                this.calculate();
            } else if (key === 'Escape') {
                this.clearAll();
            } else if (key === 'Backspace') {
                this.backspace();
            }
        });
    }
}

// Global functions for HTML onclick events
let calculator;

function addToExpression(value) {
    calculator.addToExpression(value);
}

function addFunction(func) {
    calculator.addFunction(func);
}

function clearAll() {
    calculator.clearAll();
}

function clearEntry() {
    calculator.clearEntry();
}

function backspace() {
    calculator.backspace();
}

function toggleSign() {
    calculator.toggleSign();
}

function calculateFactorial() {
    calculator.calculateFactorial();
}

function calculate() {
    calculator.calculate();
}

function clearHistory() {
    calculator.clearHistory();
}

function clearMemory() {
    calculator.clearMemory();
}

function recallMemory() {
    calculator.recallMemory();
}

function addToMemory() {
    calculator.addToMemory();
}

function subtractFromMemory() {
    calculator.subtractFromMemory();
}

function storeMemory() {
    calculator.storeMemory();
}

// Initialize calculator when page loads
document.addEventListener('DOMContentLoaded', () => {
    calculator = new Calculator();
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/static/js/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

