draggables = document.querySelectorAll(".draggable");
 console.log(draggables);
containers = document.querySelectorAll(".container_1");
console.log(containers);

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    // console.log("drogstart");

    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});
containers.forEach((container)=>{
container.addEventListener("dragover", (e) => {
  e.preventDefault();

  const draggable = document.querySelector(".dragging");
  const afterElements = getDragAfterElement(container, e.clientY);
//   console.log(afterElements);
  if (afterElements == null) {
    container.appendChild(draggable);
  } else {
    container.insertBefore(draggable, afterElements);
  }
});
})
function getDragAfterElement(container, Y) {
  const elementsDraggable = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];
//   console.log(elementsDraggable);

  return elementsDraggable.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      // console.log(box)
      // console.log(Y)
      const offset = Y - box.top - box.height / 2;
      // console.log(offset,child)
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
