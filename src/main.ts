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
                <input type="number" class="form-input" name="a-val" required>
              </div>
              <div class="input-item">
                b-value: <br>
                <input type="number" class="form-input" name="b-val" required>
              </div>
              <div class="input-item">
                c-value: <br>
                <input type="number" class="form-input" name="c-val" required>
              </div>
              <div class="input-item">
                d-value: <br>
                <input type="number" class="form-input" name="d-val" required>
              </div>
            </div>
            <div>
              <input type="submit" class="button font" value="Solve that cubic!">
              <input type="reset" class="button font" value="Clear">
            </div>     
          <form>
        </div>
    </div>
    <div>
      <canvas0 id="graph" width="600" height="400"></canvas>
    </div>
    <div class="output-ui">
    <p id="equation"></p>
      <body>
        <table class="font">
          <tr class="table-row">
            <td class="half-col">p</td>
            <td class="half-col">
              <label id="p-result">
            </td>
          </tr>
          <tr class="table-row">
            <td>q</td>
            <td>
              <label id="q-result">
            </td>
          </tr>
          <tr class="table-row">
            <td>Discriminant</td>
            <td>
              <label id="discriminant-result">
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
              <label id="x1-result">
            </td>
            <td>0</td>
          </tr>          
          <tr class="table-row">
            <td>Root 2</td>
            <td>
              <label id="x2-result">
            </td>
            <td>0</td>
          </tr>
          <tr class="table-row">
            <td>Root 3</td>
            <td>
              <label id="x3-result">
            </td>
            <td>0</td>
          </tr>
        </table>
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

  let x1 = null;
  let x2 = null;
  let x3 = null;
  
  function truncate(num: number, places: number) { /* To truncate to 5 decimal places because the example does so */

    const multiplied = num * Math.pow(10, places); /* ex. 1.1234, 2 becomes 112.34*/
    const result = Math.trunc(multiplied) / Math.pow(10, places); /* Cut off decimal, divide by power of 10 ex. 112.34 becomes 112 becomes 1.12 */
    return result;

  }

  function cardano(a: number, b: number, p: number, q: number) { /* Calculates a single root */
    return truncate(Math.cbrt(-q / 2 + Math.sqrt(Math.pow((q / 2), 2) + Math.pow((p / 3), 3))) + Math.cbrt(-q / 2 - Math.sqrt(Math.pow((q / 2), 2) + Math.pow((p / 3), 3))) - b / (3 * a), 2); /* Truncated to 2 decimal places like on the example */
  }

  if (Math.abs(delta) < 1e-15) { /* Case C: Delta equals 0, but sometimes the computer can't actually get the zero so it becomes very close to zero, which we detect under the threshold (between 0 and 1e-15) */
  
    delta = 0;
    
    if (p == 0 && q == 0) { /* Case C1: Triple root when p = q = 0 */
      x1 = cardano(a, b, p, q);      
      x2 = x1;
      x3 = x1;
    } else { /* Case C2: Double root */
      x1 = cardano(a, b, p, q), 2; /* Double */
      x2 = truncate(Math.cbrt(q / 2) - b / (3 * a), 2); /* Single */
      x3 = x2;
    }

  } else if (delta < 0) { /* Case A: 3 real roots */

    const theta = (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-Math.pow((p / 3), 3))));
    x1 = truncate(2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a), 2);
    x2 = truncate(2 * Math.sqrt(-p / 3) * Math.cos(theta + 2 * Math.PI / 3) - b / (3 * a), 2);
    x3 = truncate(2 * Math.sqrt(-p / 3) * Math.cos(theta + 4 * Math.PI / 3) - b / (3 * a), 2);
  
  } else { /* Case B: Delta > 0, 1 real root and 2 complex roots */

    x1 = cardano(a, b, p, q), 2;
    x2 = "Complex Number";
    x3 = "Complex Number";

  } 

(document.getElementById("p-result") as HTMLInputElement).textContent = `${truncate(p, 5)}`;
(document.getElementById("q-result") as HTMLInputElement).textContent = `${truncate(q, 5)}`;
(document.getElementById("discriminant-result") as HTMLInputElement).textContent = `${truncate(p, 5)}`;
(document.getElementById("x1-result") as HTMLInputElement).textContent = `${x1}`;
(document.getElementById("x2-result") as HTMLInputElement).textContent = `${x2}`;
(document.getElementById("x3-result") as HTMLInputElement).textContent = `${x3}`;

function term(coefficient: number, power: number) { /* Returns terms so you can put them in an equation */

  let result = ""; 

  if (coefficient > 0) { /* Positive term */
    
    if (power == 0) { /* For x^0, or last term */
      result += "+ " + coefficient + " ";
    } else {
      result += "+ " + coefficient + "x<sup>" + ((power > 1) ? power + " " : " ") + "</sup>"; /* Doesn't put power if it's x^1 */
    }

  } else if (coefficient < 0) { /* Negative term */

    if (power == 0) {
      result += "- " + Math.abs(coefficient) + " ";
    } else {
      result += "- " + Math.abs(coefficient) + "x<sup>" + ((power > 1) ? power + " " : " ") + "</sup>";
    }

  } 
  
  return result; /* Returns nothing if the coefficient was 0 */

}

const eqn = ((a > 0) ? (term(a, 3)).substring(2) : "-" + (term(a, 3)).substring(2)) + term(b, 2) + term(c, 1) + term (d, 0) + "= 0";

(document.getElementById("equation") as HTMLInputElement).innerHTML = eqn;

})