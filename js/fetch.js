(async () => {
  try {
    const res = await fetch('content/labels.json');
    const labels = await res.json();

    document.querySelectorAll('[lbl]').forEach(el => {
      const key = el.getAttribute('lbl');
      const text = labels[key];
      if (text != null) {
        if (el.tagName.toLowerCase() === 'title') {
          document.title = text; // special case for <title>
        } else {
          el.textContent = text;
        }
      }
    });
  } catch (err) {
    console.error('Error loading labels:', err);
  }
})();