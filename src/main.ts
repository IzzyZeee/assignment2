import './style.css'
import './calculation.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <html>
    <div class="input_ui">
      <h1 class="h1"> Cubic Solver </h1>
        <div>
          <form class="form font" id="solve"> 
            <div class="input_item">
              a-value: <br>
              <input type="text" class="form_input" id="a_val">
            </div>
            <div class="input_item">
              b-value: <br>
              <input type="text" class="form_input" id="b_val">
            </div>
            <div class="input_item">
              c-value: <br>
              <input type="text" class="form_input" id="c_val">
            </div>
            <div class="input_item">
              d-value: <br>
              <input type="text" class="form_input" id="d_val">
            </div>
            <input type="submit" class="button font" value="Solve that cubic!">
            <input type="reset" class="button font" value="Clear">
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
const form = document.getElementById("solve") as HTMLFormElement;

form?.addEventListener("submit", (event) => {
  event.preventDefault();

    // const a: number = Number(FormData.get("a_val"));
    // const b: number = Number(formData.get("b"));
    // const c: number = Number(formData.get("c"));

  (document.getElementById("result") as HTMLInputElement).value = "No Roots";

  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");

  ctx.moveTo(50, 100); // starting point
  ctx.lineTo(300, 200); // ending point
  ctx.stroke(); // actually draw it

  ctx.beginPath();
  ctx.moveTo(50, 100);
  ctx.lineTo(150, 120);
  ctx.lineTo(250, 80);
  ctx.lineTo(350, 140);
  ctx.stroke();
    // const formData = new FormData(form);

    // const a: number = Number(formData.get("a"));
    // const b: number = Number(formData.get("b"));
    // const c: number = Number(formData.get("c"));

    // const discriminant = b * b - 4 * a * c;

    // if (discriminant < 0) {
    //     (document.getElementById("result") as HTMLInputElement).value = "No Roots";
    // } else if (discriminant > 0) {
    //     const rootOne = (-b + Math.sqrt(discriminant)) / (2 * a);
    //     const rootTwo = (-b - Math.sqrt(discriminant)) / (2 * a);
    //     (document.getElementById("result") as HTMLInputElement).value = `x1=${rootOne}, x2=${rootTwo}`;
    // } else {
    //     const rootOne = (-b + Math.sqrt(discriminant)) / (2 * a);
    //     (document.getElementById("result") as HTMLInputElement).value = `x=${rootOne}`;
    // }
})