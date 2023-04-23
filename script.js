const parent = document.querySelector(".parent");
const child = document.querySelector(".child");
const timeline = document.querySelector(".timeline");
const table = document.querySelector("table");

const thObs = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    // const { width } = entry.contentRect;
    const { width: timelineWidth } = timeline.getBoundingClientRect();
    const { right: timelineOffset } =
      timeline.previousElementSibling.getBoundingClientRect();
    const { width: tableWidth } = table.getBoundingClientRect();
    parent.style.setProperty("--timeline-offset", `${timelineOffset}px`);
    parent.style.setProperty("--timeline-width", `${timelineWidth}px`);
    parent.style.setProperty("--table-width", `${tableWidth}px`);
  });
});

document.querySelectorAll("table, table thead tr > *").forEach((node) => {
  thObs.observe(node);
});

new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const { width } = entry.contentRect;
    parent.style.setProperty("--parent-width", `${width}px`);
  });
}).observe(parent);

new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const { width } = entry.contentRect;
    parent.style.setProperty("--child-width", `${width}px`);
  });
}).observe(child);

parent.addEventListener("scroll", (e) => {
  foo();
});

function foo() {
  parent.style.setProperty("--scroll-x", `${parent.scrollLeft}px`);

  // Hide labels that are outside of the viewport.
  parent.querySelectorAll(":scope .bar").forEach((bar) => {
    const { right } = bar.getBoundingClientRect();
    const boundRight = parseFloat(
      parent.style.getPropertyValue("--timeline-offset")
    );
    const barWrapper = bar.closest(".bar-wrapper");
    barWrapper.style.setProperty(
      "--label-opacity",
      right < boundRight ? "0" : "1"
    );
  });
}

foo();

const intersectionObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      console.log(entry);
    });
  },
  {
    root: parent,
    threshold: [0, 1],
  }
);

parent.querySelectorAll(":scope .bar").forEach((bar) => {
  intersectionObs.observe(bar);
});
