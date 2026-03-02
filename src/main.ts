import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <html>
    <div class="main_ui">
      <h1 class="h1"> Cubic Solver </h1>
      <body>
        <form>
          <input type="text"> a-value: </input>
          <input type="text"> b-value: </input>
          <input type="text"> c-value: </input>
          <input type="text"> d-value: </input>
          <br>
          <input type="submit" value="Solve that cubic!"></input>
          <input type="reset" value="Clear"></input>
        <form>
      </body>
    </div>
    <div class="main_ui">
      <body>
        <p>(Display cubic written out here)</p>
        <table>
          <tr>
            <td>p</td>
            <td>p val</td>
          </tr>
          <tr>
            <td>q</td>
            <td>q val</td>
          </tr>
        </table>
        <table>
          <tr>
            <td>Value</td>
            <td>x</td>
            <td>y</td>
          </tr>
          <tr>
            <td>Root 1</td>
            <td>x val</td>
            <td>0</td>
          </tr>          
          <tr>
            <td>Root 2</td>
            <td>x val</td>
            <td>0</td>
          </tr>
          <tr>
            <td>Root 3</td>
            <td>x val</td>
            <td>zero</td>
          </tr>
        </table>
      </body>
    </div>
  </html>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)