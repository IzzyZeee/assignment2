import './style.css'
import './calculation.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <html>
    <div class="input_ui">
      <h1 class="h1"> Cubic Solver </h1>
        <div>
          <form class="form font" id="cubic"> 
            <div>
              <div class="input_item">
                a-value: <br>
                <input type="number" class="form_input" name="a_val" required>
              </div>
              <div class="input_item">
                b-value: <br>
                <input type="number" class="form_input" name="b_val" required>
              </div>
              <div class="input_item">
                c-value: <br>
                <input type="number" class="form_input" name="c_val" required>
              </div>
              <div class="input_item">
                d-value: <br>
                <input type="number" class="form_input" name="d_val" required>
              </div>
            </div>
            <div>
              <input type="submit" class="button font" value="Solve that cubic!">
              <input type="reset" class="button font" value="Clear">
            </div>     
          <form>
        </div>
    </div>
      <label for="result">Result:</label>
      <input type="text" id="result" name="result" />
    <div>
      <canvas0 id="graph" width="600" height="400"></canvas>
    </div>
    <div class="output_ui">
      <body>
        <table class="font">
          <tr class="table_row">
            <td class="top_col_1">p</td>
            <td class="top_col_2">pval</td>
          </tr>
          <tr class="table_row">
            <td>q</td>
            <td>qval</td>
          </tr>
          <tr class="table_row">
            <td>discriminant</td>
            <td>dval</td>
          </tr>
        </table>
        <table class="font">
          <tr class="table_row colored_row" >
            <td class="bottom_col_1">Value</td>
            <td class="bottom_col_2">x</td>
            <td class="bottom_col_3">y</td>
          </tr>
          <tr class="table_row">
            <td>Root 1</td>
            <td>x val</td>
            <td>0</td>
          </tr>          
          <tr class="table_row">
            <td>Root 2</td>
            <td>x val</td>
            <td>0</td>
          </tr>
          <tr class="table_row">
            <td>Root 3</td>
            <td>x val</td>
            <td>zero</td>
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

  const a = Number(formData.get("a_val"));
  const b = Number(formData.get("b_val"));
  const c = Number(formData.get("c_val"));
  const d = Number(formData.get("d_val"));

  const p = (3 * a * c - b * b) / (3 * a * a);
  const q = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);
  const delta = Math.pow((q / 2), 2) + Math.pow((p / 3), 3);

  let x1 = null;
  let x2 = null;
  let x3 = null;

  function cardano(a: number, b: number, p: number, q: number) { /* Calculates a single root */
    return Math.cbrt(-q / 2 + Math.sqrt(Math.pow((q / 2), 2) + Math.pow((p / 3), 3))) + Math.cbrt(-q / 2 - Math.sqrt(Math.pow((q / 2), 2) + Math.pow((p / 3), 3))) - b / (3 * a);
  }

  if (Math.abs(delta) < 1e-15) { /* Case C: Delta equals 0, but sometimes the computer can't actually get the zero so it becomes very close to zero, which we detect under the threshold (between 0 and 1e-15) */

    if (p == 0 && q == 0) { /* Case C1: Triple root when p = q = 0 */
      x1 = cardano(a, b, p, q);      
      x2 = x1;
      x3 = x1;
    } else { /* Case C2: Double root */
      x1 = cardano(a, b, p, q); /* Double */
      x2 = Math.cbrt(q / 2) - b / (3 * a); /* Single */
      x3 = x2;
    }

  } else if (delta < 0) { /* Case A: 3 real roots */

    const theta = (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-Math.pow((p / 3), 3))));
    x1 = 2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a);
    x2 = 2 * Math.sqrt(-p / 3) * Math.cos(theta + 2 * Math.PI / 3) - b / (3 * a);
    x3 = 2 * Math.sqrt(-p / 3) * Math.cos(theta + 4 * Math.PI / 3) - b / (3 * a);
  
  } else { /* Case B: Delta > 0, 1 real root and 2 complex roots */

    x1 = cardano(a, b, p, q);
    x2 = "Complex Number";
    x3 = "Complex Number";

  } 

// (document.getElementById("result") as HTMLInputElement).value = `x1 = ${x1}, x2 = ${x2}, x3 = ${x3}, delta = ${delta}`;
(document.getElementById("result") as HTMLInputElement).value = `x1 = ${x1}, x2 = ${x2}, x3 = ${x3}, delta = ${delta}`;

})