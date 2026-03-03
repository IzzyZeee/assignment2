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