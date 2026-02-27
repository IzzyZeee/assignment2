// import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <html>
    <div>
      <head>
        <h1> Cubic Solver </h1>
      </head>
      <body>
          <input> a-value: </input>
          <input> b-value: </input>
          <input> c-value: </input>
          <input> d-value: </input>
          <br>
          <button type="submit"> Solve that cubic! </button>
          <button type="reset"> Clear </button>
          <output> 3 </output>
      </body>
    </div>
    
    <div>
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
            <td>0</td>
          </tr>
        </table>
      </body>
    </div>
  </html>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)