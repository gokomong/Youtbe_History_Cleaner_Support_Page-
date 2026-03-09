(function () {
  const STORAGE_KEY = "ythc-pages-language";
  const SUPPORTED = new Set(["en", "ko"]);

  function getInitialLanguage() {
    try {
      const saved = String(window.localStorage.getItem(STORAGE_KEY) || "").trim().toLowerCase();
      if (SUPPORTED.has(saved)) {
        return saved;
      }
    } catch (_error) {
      // Ignore localStorage access issues and fall back to browser language.
    }

    const browserLanguage = String(navigator.language || "").toLowerCase();
    return browserLanguage.startsWith("ko") ? "ko" : "en";
  }

  function applyLanguage(lang) {
    const nextLang = SUPPORTED.has(lang) ? lang : "en";
    document.documentElement.lang = nextLang;
    document.body.dataset.currentLanguage = nextLang;

    document.querySelectorAll("[data-lang-content]").forEach((node) => {
      node.hidden = node.getAttribute("data-lang-content") !== nextLang;
    });

    document.querySelectorAll("[data-lang-button]").forEach((button) => {
      const isActive = button.getAttribute("data-lang-button") === nextLang;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    const title = document.body.getAttribute(`data-title-${nextLang}`);
    if (title) {
      document.title = title;
    }

    const description = document.body.getAttribute(`data-description-${nextLang}`);
    const meta = document.querySelector('meta[name="description"]');
    if (description && meta) {
      meta.setAttribute("content", description);
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, nextLang);
    } catch (_error) {
      // Ignore localStorage access issues.
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-lang-button]").forEach((button) => {
      button.addEventListener("click", () => {
        applyLanguage(button.getAttribute("data-lang-button") || "en");
      });
    });

    applyLanguage(getInitialLanguage());
  });
})();
