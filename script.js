const parent = document.querySelector('.parent');
const child = document.querySelector('.child');
const timeline = document.querySelector('.timeline');
const table = document.querySelector('table');

const thObs = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    // const { width } = entry.contentRect;
    const { width: timelineWidth } = timeline.getBoundingClientRect();
    const { right: timelineOffset } =
      timeline.previousElementSibling.getBoundingClientRect();
    const { width: tableWidth } = table.getBoundingClientRect();
    parent.style.setProperty('--timeline-offset', `${timelineOffset}px`);
    parent.style.setProperty('--timeline-width', `${timelineWidth}px`);
    parent.style.setProperty('--table-width', `${tableWidth}px`);
  });
});

document.querySelectorAll('table, table thead tr > *').forEach((node) => {
  thObs.observe(node);
});

new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const { width } = entry.contentRect;
    parent.style.setProperty('--parent-width', `${width}px`);
  });
}).observe(parent);

new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const { width } = entry.contentRect;
    parent.style.setProperty('--child-width', `${width}px`);
  });
}).observe(child);

parent.addEventListener('scroll', (e) => {
  foo();
});

function foo() {
  parent.style.setProperty('--scroll-x', `${parent.scrollLeft}px`);
  console.log(child.getBoundingClientRect());
}

foo();
