const walkthroughTabs = [...document.querySelectorAll('[role="tab"]')];

function selectWalkthrough(tab) {
  for (const candidate of walkthroughTabs) {
    const selected = candidate === tab;
    candidate.setAttribute('aria-selected', String(selected));
    candidate.tabIndex = selected ? 0 : -1;
    document.getElementById(candidate.getAttribute('aria-controls')).hidden = !selected;
  }
}

for (const [index, tab] of walkthroughTabs.entries()) {
  tab.addEventListener('click', () => selectWalkthrough(tab));
  tab.addEventListener('keydown', event => {
    const next = {ArrowRight: (index + 1) % walkthroughTabs.length, ArrowLeft: (index + walkthroughTabs.length - 1) % walkthroughTabs.length, Home: 0, End: walkthroughTabs.length - 1}[event.key];
    if (next === undefined) return;
    event.preventDefault();
    selectWalkthrough(walkthroughTabs[next]);
    walkthroughTabs[next].focus();
  });
}
