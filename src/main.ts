import './style.css'
import './calculation.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <html>
    <div class="input-ui">
      <h1 class="h1"> Cubic Solver </h1>
      <div>
        <form class="form font" id="cubic"> 
          <div>
            <div class="input-item">
              a-value: <br>
              <input type="number" class="form-input" name="a-val" step="any" required>
            </div>
            <div class="input-item">
              b-value: <br>
              <input type="number" class="form-input" name="b-val" step="any" required>
            </div>
            <div class="input-item">
              c-value: <br>
              <input type="number" class="form-input" name="c-val" step="any" required>
            </div>
            <div class="input-item">
              d-value: <br>
              <input type="number" class="form-input" name="d-val" step="any" required>
            </div>
          </div>
          <div>
            <input type="submit" class="button font" value="Solve that cubic!">
          </div>
        </form>
      </div>
    </div>
    <div class="output-ui">
    <p id="equation" class="equation"></p>
      <body>
        <div class="full-table">
          <table class="font">
            <tr class="table-row">
              <td class="half-col">p</td>
              <td class="half-col">
                <label id="p-result"></label>
              </td>
            </tr>
            <tr class="table-row">
              <td>q</td>
              <td>
                <label id="q-result"></label>
              </td>
            </tr>
            <tr class="table-row">
              <td>Discriminant</td>
              <td>
                <label id="discriminant-result"></label>
              </td>
            </tr>
          </table>
          <table class="font">
            <tr class="table-row colored-row" >
              <td class="half-col">Value</td>
              <td class="quarter-col">x</td>
              <td class="quarter-col">y</td>
            </tr>
            <tr class="table-row">
              <td>Root 1</td>
              <td>
                <label id="x1-result"></label>
              </td>
              <td>0</td>
            </tr>          
            <tr class="table-row">
              <td>Root 2</td>
              <td>
                <label id="x2-result"></label>
              </td>
              <td>0</td>
            </tr>
            <tr class="table-row">
              <td>Root 3</td>
              <td>
                <label id="x3-result"></label>
              </td>
              <td>0</td>
            </tr>
          </table>
        </div>
        <div class="graph">
          <canvas id="graph" width="600" height="600"></canvas>
        </div>
      </body>
    </div>
  </html>
`
const form = document.getElementById("cubic") as HTMLFormElement; /* First identify form by id ("cubic") */

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form); /* Create object from FormData class that allows you to use it */

  const a = Number(formData.get("a-val"));
  const b = Number(formData.get("b-val"));
  const c = Number(formData.get("c-val"));
  const d = Number(formData.get("d-val"));

  if (a == 0) {
    return;
  }

  const p = (3 * a * c - b * b) / (3 * a * a);
  const q = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);
  let delta = Math.pow((q / 2), 2) + Math.pow((p / 3), 3);

  let x1 = 0;
  let x2 = 0;
  let x3 = 0;
  
  function truncate(num: number, places: number) { // To truncate to 5 decimal places because the example does so

    const multiplied = num * Math.pow(10, places); // ex. 1.1234, 2 becomes 112.34
    const result = Math.trunc(multiplied) / Math.pow(10, places); // Cut off decimal, divide by power of 10 ex. 112.34 becomes 112 becomes 1.12
    return result;

  }

  function cardano(a: number, b: number, p: number, q: number) { // Calculates a single root
    return truncate(Math.cbrt(-q / 2 + Math.sqrt(Math.pow((q / 2), 2) + Math.pow((p / 3), 3))) + Math.cbrt(-q / 2 - Math.sqrt(Math.pow((q / 2), 2) + Math.pow((p / 3), 3))) - b / (3 * a), 2); // Truncated to 2 decimal places like on the example
  }

  if (Math.abs(delta) < 1e-15) { // Case C: Delta equals 0, but sometimes the computer can't actually get the zero so it becomes very close to zero, which we detect under the threshold (between 0 and 1e-15)
  
    delta = 0; // Turns delta to zero
    
    if (Math.abs(p) < 1e-15 && Math.abs(q) < 1e-15) { // Case C1: Triple root when p = q = 0
      x1 = cardano(a, b, p, q);
      x2 = x1;
      x3 = x1;
    } else { // Case C2: Double root
      x1 = cardano(a, b, p, q); // Double
      x2 = truncate(Math.cbrt(q / 2) - b / (3 * a), 2); // Single
      x3 = x2;
    }

  } else if (delta < 0) { // Case A: 3 real roots

    const theta = (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-Math.pow((p / 3), 3))));
    x1 = truncate(2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a), 2);
    x2 = truncate(2 * Math.sqrt(-p / 3) * Math.cos(theta + 2 * Math.PI / 3) - b / (3 * a), 2);
    x3 = truncate(2 * Math.sqrt(-p / 3) * Math.cos(theta + 4 * Math.PI / 3) - b / (3 * a), 2);

  } else { // Case B: Delta > 0, 1 real root and 2 complex roots

    x1 = cardano(a, b, p, q);
    x2 = NaN;
    x3 = NaN;

  }

(document.getElementById("p-result") as HTMLLabelElement).textContent = `${(truncate(p, 5).toFixed(5))}`; // toFixed will add zeros to specified amount if missing (ex. 6.7 with 5 becomes 6.70000)
(document.getElementById("q-result") as HTMLLabelElement).textContent = `${(truncate(q, 5).toFixed(5))}`;
(document.getElementById("discriminant-result") as HTMLLabelElement).textContent = `${(truncate(delta, 5)).toFixed(5)}`;
(document.getElementById("x1-result") as HTMLLabelElement).textContent = `${(x1).toFixed(2)}`;
(document.getElementById("x2-result") as HTMLLabelElement).textContent = Number.isNaN(x2) ? "Complex Number" : `${(x2).toFixed(2)}`;
(document.getElementById("x3-result") as HTMLLabelElement).textContent = Number.isNaN(x3) ? "Complex Number" : `${(x3).toFixed(2)}`;

function term(coefficient: number, power: number) { // Returns terms so you can put them in an equation

  let result = ""; 

  if (coefficient > 0) { // Positive term
    
    if (power == 0) { // For x^0, or last term
      result += "+ " + ((coefficient == 1 && power != 0) ? "" : coefficient) + " ";
    } else {
      result += "+ " + ((coefficient == 1 && power != 0) ? "" : coefficient) + "x<sup>" + ((power > 1) ? power + " " : " ") + "</sup>"; // Doesn't put power if it's x^1
    }

  } else if (coefficient < 0) { // Negative term

    if (power == 0) {
      result += "- " + ((Math.abs(coefficient) == 1 && power != 0) ? "" : Math.abs(coefficient)) + " ";
    } else {
      result += "- " + ((Math.abs(coefficient) == 1 && power != 0) ? "" : Math.abs(coefficient)) + "x<sup>" + ((power > 1) ? power + " " : " ") + "</sup>";
    }

  } 
  
  return result; // Returns nothing if the coefficient was 0

}

const eqn = ((a > 0) ? (term(a, 3)).substring(2) : "-" + (term(a, 3)).substring(2)) + term(b, 2) + term(c, 1) + term (d, 0) + "= 0";

(document.getElementById("equation") as HTMLLabelElement).innerHTML = eqn;

const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");
const xMin = -12; // Determine how many units it extends for relative to axis origin, ideally square
const xMax = 12;
const yMin = -12;
const yMax = 12;

function coordToPixelX(x: number) { // Converts x/y-vals from the function into coords used by Canvas
// Because Canvas's grid starts with index (0, 0) at top left corner, we must find the corresponding Canvas coords
  const width = canvas.width; // From width and height defined in HTML part

  const pixelPerGridX = width / (xMax - xMin); // Determine how many Canvas pixels per
// Origin on normal graph corresponds to 24/2 
  const px = (x - xMin) * pixelPerGridX; // First get Canvas x-coord (the one with origin at top left corner...) that corresponds to og x val, then multiply it by the no. pixels per grid to get the correct no. pixels

  return px; // Returns as an object

}

function coordToPixelY(y: number) {

  const height = canvas.height;

  const pixelPerGridY = height / (yMax - yMin);

  const py = (yMax - y) * pixelPerGridY; 

  return py; 

}

function calculateCubic(x: number) { // Simply to get x-y input-output
  return a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;
}

function drawGrid() { // Draws the grid

  ctx.lineWidth = 1;

   for (let i = xMin; i <= xMax; i++) { // Draw all VERTICAL lines, including edges
      ctx.beginPath();
      ctx.strokeStyle = '#67a095';
      ctx.moveTo(coordToPixelX(i), coordToPixelY(yMax));
      ctx.lineTo(coordToPixelX(i), coordToPixelY(yMin));
      ctx.stroke();
    }

    for (let i = yMin; i <= yMax; i++) { // Draw all HORIZONTAL lines, including edges
      ctx.beginPath();
      ctx.strokeStyle = '#67a095';
      ctx.moveTo(coordToPixelX(xMin), coordToPixelY(i));
      ctx.lineTo(coordToPixelX(xMax), coordToPixelY(i));
      ctx.stroke();
    }

}

function drawAxis() {
  
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(9, 69, 74, 0.87)';

  const pxMin = coordToPixelX(xMin); // The leftmost edge of the grid
  const pxMax = coordToPixelX(xMax); // and rightmost
  ctx.moveTo(pxMin, coordToPixelY(0)); // Start line at leftmost
  ctx.lineTo(pxMax, coordToPixelY(0)); // End line at rightmost
  ctx.stroke(); // This draws the line

  ctx.beginPath();
  const pyMin = coordToPixelY(yMin); // The bottommost edge of the grid
  const pyMax = coordToPixelY(yMax); // and topmost
  ctx.moveTo(coordToPixelX(0), pyMin); // Start line at bottommost
  ctx.lineTo(coordToPixelX(0), pyMax); // End line at topmost
  ctx.stroke(); // Draws the line

}

function drawCurve() { // For actually drawing the curve

  let isFirstPoint = true;
  ctx.beginPath();
  ctx.strokeStyle = '#910B21';
  ctx.lineWidth = 3;

  for (let i = xMin; i <= xMax; i += 0.001) {
    const x = i;
    const y = calculateCubic(x);
    
    if (y < yMin || y > yMax) { // Make sure y is in range (x always in range)
      isFirstPoint = true;
      continue;
    }

    if (isFirstPoint) { // Only reaches this for first point, then locks it to false
      ctx.moveTo(coordToPixelX(x), coordToPixelY(y));
      isFirstPoint = false;
      continue;
    }

    ctx.lineTo(coordToPixelX(x), coordToPixelY(y));
    
  }

  ctx.stroke(); // Draws once all lineTo are marked

}

function drawDot(x: number, y: number) {

  ctx.beginPath();
  ctx.strokeStyle = '#081681';
  ctx.arc(x, y, 3, 0, 2 * Math.PI)
  ctx.fillStyle = '#081681'; // Circle fill color
  ctx.fill(); // Fills the circle so it's not just a circle
  ctx.stroke();

}

function drawRoots() {

  drawDot(coordToPixelX(x1), coordToPixelY(0)); // x1 will always be a root

  if (delta == 0) { // Case C

    if (p != 0) { // Case C2: Double root (x2 and x3 are the same so just draw one)

      drawDot(coordToPixelX(x2), coordToPixelY(0));
      
    } // Else, p = q = 0 and it's a triple root (no need to draw)

  } else if (delta < 0) { // Case A, three real roots

    drawDot(coordToPixelX(x2), coordToPixelY(0));
    drawDot(coordToPixelX(x3), coordToPixelY(0));

  } // Case B, 1 real and 2 complex roots, no need to draw
}

ctx.clearRect(0, 0, canvas.width, canvas.height);
drawGrid();
drawAxis();
drawCurve();
drawRoots();

})
