document.getElementById('operation-select-btn').addEventListener('click', () => {
    const operation = document.getElementById('operation-select').value;
    const inputContainer = document.getElementById('input-container');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultContainer = document.getElementById('result-container');
  
    inputContainer.innerHTML = ''; 
    resultContainer.innerHTML = ''; 
    if (['addition', 'subtraction', 'multiplication', 'division', 'power'].includes(operation)) {
      inputContainer.innerHTML = `
        <input type="number" id="num1" placeholder="Enter first number">
        <input type="number" id="num2" placeholder="Enter second number">
      `;
    } else if (['square', 'squareRoot', 'factorial'].includes(operation)) {
      inputContainer.innerHTML = `
        <input type="number" id="num1" placeholder="Enter number">
      `;
    } else if (operation === 'logarithm') {
      inputContainer.innerHTML = `
        <input type="number" id="base" placeholder="Enter base">
        <input type="number" id="value" placeholder="Enter value">
      `;
    } else if (operation === 'trigonometric') {
      inputContainer.innerHTML = `
        <input type="number" id="angle" placeholder="Enter angle in degrees">
      `;
    } else if (['matrixAddition', 'matrixSubtraction', 'matrixMultiplication'].includes(operation)) {
      inputContainer.innerHTML = `
        <textarea id="matrix1" placeholder="Enter first matrix (comma-separated rows)"></textarea>
        <textarea id="matrix2" placeholder="Enter second matrix (comma-separated rows)"></textarea>
      `;
    } else if (operation === 'area') {
      inputContainer.innerHTML = `
        <select id="shape">
          <option value="circle">Circle</option>
          <option value="rectangle">Rectangle</option>
          <option value="triangle">Triangle</option>
        </select>
        <div id="area-inputs"></div>
      `;
      document.getElementById('shape').addEventListener('change', updateAreaInputs);
      updateAreaInputs(); 
    }
  
    calculateBtn.style.display = 'block';
    calculateBtn.onclick = () => calculateResult(operation);
  });
  
  function updateAreaInputs() {
    const shape = document.getElementById('shape').value;
    const areaInputs = document.getElementById('area-inputs');
  
    if (shape === 'circle') {
      areaInputs.innerHTML = `<input type="number" id="radius" placeholder="Enter radius">`;
    } else if (shape === 'rectangle') {
      areaInputs.innerHTML = `
        <input type="number" id="length" placeholder="Enter length">
        <input type="number" id="width" placeholder="Enter width">
      `;
    } else if (shape === 'triangle') {
      areaInputs.innerHTML = `
        <input type="number" id="base" placeholder="Enter base">
        <input type="number" id="height" placeholder="Enter height">
      `;
    }
  }
  
  function calculateResult(operation) {
    const num1 = parseFloat(document.getElementById('num1')?.value);
    const num2 = parseFloat(document.getElementById('num2')?.value);
    const base = parseFloat(document.getElementById('base')?.value);
    const value = parseFloat(document.getElementById('value')?.value);
    const angle = parseFloat(document.getElementById('angle')?.value);
    const radius = parseFloat(document.getElementById('radius')?.value);
    const length = parseFloat(document.getElementById('length')?.value);
    const width = parseFloat(document.getElementById('width')?.value);
    const height = parseFloat(document.getElementById('height')?.value);
    const matrix1Input = document.getElementById('matrix1')?.value;
    const matrix2Input = document.getElementById('matrix2')?.value;
    const resultContainer = document.getElementById('result-container');
    let result;
  
    switch (operation) {
      case 'addition':
        result = num1 + num2;
        break;
      case 'subtraction':
        result = num1 - num2;
        break;
      case 'multiplication':
        result = num1 * num2;
        break;
      case 'division':
        result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero';
        break;
      case 'power':
        result = Math.pow(num1, num2);
        break;
      case 'square':
        result = num1 * num1;
        break;
      case 'squareRoot':
        result = num1 >= 0 ? Math.sqrt(num1) : 'Invalid number';
        break;
      case 'logarithm':
        result = base > 0 && base !== 1 && value > 0 ? Math.log(value) / Math.log(base) : 'Invalid input';
        break;
      case 'trigonometric':
        const radians = (Math.PI / 180) * angle;
        result = `
          sin(${angle}) = ${Math.sin(radians)}<br>
          cos(${angle}) = ${Math.cos(radians)}<br>
          tan(${angle}) = ${Math.tan(radians)}
        `;
        break;
      case 'factorial':
        result = factorial(num1);
        break;
      case 'matrixAddition':
        result = matrixOperation(matrix1Input, matrix2Input, (a, b) => a + b);
        break;
      case 'matrixSubtraction':
        result = matrixOperation(matrix1Input, matrix2Input, (a, b) => a - b);
        break;
      case 'matrixMultiplication':
        result = matrixMultiplication(matrix1Input, matrix2Input);
        break;
      case 'area':
        const shape = document.getElementById('shape').value;
        if (shape === 'circle') {
          result = Math.PI * Math.pow(radius, 2);
        } else if (shape === 'rectangle') {
          result = length * width;
        } else if (shape === 'triangle') {
          result = 0.5 * base * height;
        }
        break;
      default:
        result = 'Invalid operation';
    }
  
    resultContainer.innerHTML = `<b>Result:</b> ${result}`;
  }
  
  function factorial(n) {
    if (n < 0) return 'Factorial not defined for negative numbers';
    if (n === 0 || n === 1) return 1;
    let fact = 1;
    for (let i = 2; i <= n; i++) {
      fact *= i;
    }
    return fact;
  }
  
  function matrixOperation(matrix1Input, matrix2Input, operation) {
    const matrix1 = parseMatrix(matrix1Input);
    const matrix2 = parseMatrix(matrix2Input);
  
    if (!matrix1 || !matrix2 || !areMatricesSameSize(matrix1, matrix2)) {
      return 'Matrices must be the same size';
    }
  
    const result = matrix1.map((row, i) =>
      row.map((value, j) => operation(value, matrix2[i][j]))
    );
    return formatMatrix(result);
  }
  
  function matrixMultiplication(matrix1Input, matrix2Input) {
    const matrix1 = parseMatrix(matrix1Input);
    const matrix2 = parseMatrix(matrix2Input);
  
    if (!matrix1 || !matrix2 || matrix1[0].length !== matrix2.length) {
      return 'Invalid matrix sizes for multiplication';
    }
  
    const result = matrix1.map((row, i) =>
      matrix2[0].map((_, j) =>
        row.reduce((sum, value, k) => sum + value * matrix2[k][j], 0)
      )
    );
    return formatMatrix(result);
  }
  
  function parseMatrix(input) {
    try {
      return input
        .split('\n')
        .map(row => row.split(',').map(Number));
    } catch {
      return null;
    }
  }
  
  function areMatricesSameSize(matrix1, matrix2) {
    return (
      matrix1.length === matrix2.length &&
      matrix1.every((row, i) => row.length === matrix2[i].length)
    );
  }
  
  function formatMatrix(matrix) {
    return matrix.map(row => row.join(', ')).join('<br>');
  }
  