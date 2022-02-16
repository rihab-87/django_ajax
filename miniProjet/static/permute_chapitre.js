container = document.getElementById("tbody_formation");
document
  .getElementById("tbody_formation")
  .addEventListener("dragstart", function (e) {
    if (e.target && e.target.nodeName == "TR") {
      var classes = e.target.className.split(" ");
      if (classes) {
        for (var x = 0; x < classes.length; x++) {
          if (classes[x] == "draggable") {
            console.log(e.target.id);
            const draggable = document.getElementById(`${e.target.id}`);
            console.log(draggable);
            e.target.classList.add("dragging");
            e.target.addEventListener("dragend", () => {
              e.target.classList.remove("dragging");
            });
            container.addEventListener("dragover", (e) => {
              e.preventDefault();
              const afterElements = getDragAfterElement(container, e.clientY);
              console.log(afterElements)
              if (afterElements == null) {
                container.appendChild(draggable);
              } else {
                container.insertBefore(draggable, afterElements);
              }
            });
          }
        }
      }
    }
  });

function getDragAfterElement(container, Y) {
  const elementsDraggable = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];
  return elementsDraggable.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = Y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
