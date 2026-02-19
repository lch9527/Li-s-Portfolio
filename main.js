// Small enhancements: year, project search, and a tiny toast for placeholder links.
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toast = document.getElementById("toast");
  let toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-toast]");
    if (!a) return;
    e.preventDefault();
    showToast(a.getAttribute("data-toast") || "Coming soon");
  });

  const search = document.getElementById("projectSearch");
  const projects = Array.from(document.querySelectorAll(".project"));

  function applyFilter(q) {
    const needle = q.trim().toLowerCase();
    projects.forEach((card) => {
      const tags = (card.getAttribute("data-tags") || "").toLowerCase();
      const text = card.innerText.toLowerCase();
      const hit = !needle || tags.includes(needle) || text.includes(needle);
      card.style.display = hit ? "" : "none";
    });
  }

  if (search) {
    search.addEventListener("input", () => applyFilter(search.value));
  }
})();
