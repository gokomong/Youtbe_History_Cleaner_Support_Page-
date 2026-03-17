(function () {
  function formatInstallBanner(language, version) {
    if (language === "ko") {
      return `설치가 완료되었습니다. 버전 ${version || "현재"} 기준 사용 흐름을 여기서 바로 확인할 수 있습니다.`;
    }
    return `Installation complete. Start here with the ${version || "current"} flow overview.`;
  }

  function formatUpdateBanner(language, fromVersion, toVersion) {
    if (language === "ko") {
      if (fromVersion && toVersion) {
        return `업데이트가 완료되었습니다. ${fromVersion}에서 ${toVersion}로 바뀐 핵심 사항을 확인하세요.`;
      }
      return "업데이트가 완료되었습니다. 이번 변경사항을 아래 릴리즈노트에서 확인하세요.";
    }

    if (fromVersion && toVersion) {
      return `Update complete. Review what changed from ${fromVersion} to ${toVersion}.`;
    }
    return "Update complete. Review the latest release notes below.";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const banner = document.querySelector("[data-page-context-banner]");
    if (!banner) {
      return;
    }

    const pageContext = String(document.body?.dataset?.pageContext || "").trim().toLowerCase();
    const currentVersion = String(document.body?.dataset?.currentVersion || "").trim();
    const params = new URLSearchParams(window.location.search);
    const source = String(params.get("source") || "").trim().toLowerCase();
    const version = String(params.get("version") || currentVersion).trim();
    const fromVersion = String(params.get("from") || "").trim();
    const toVersion = String(params.get("to") || currentVersion).trim();

    let englishText = "";
    let koreanText = "";

    if (pageContext === "guide" && source === "install") {
      englishText = formatInstallBanner("en", version);
      koreanText = formatInstallBanner("ko", version);
    } else if (pageContext === "updates" && source === "update") {
      englishText = formatUpdateBanner("en", fromVersion, toVersion);
      koreanText = formatUpdateBanner("ko", fromVersion, toVersion);
    }

    if (!englishText && !koreanText) {
      return;
    }

    const englishNode = banner.querySelector('[data-page-context-banner-content="en"]');
    const koreanNode = banner.querySelector('[data-page-context-banner-content="ko"]');
    if (englishNode) {
      englishNode.textContent = englishText;
    }
    if (koreanNode) {
      koreanNode.textContent = koreanText;
    }
    banner.hidden = false;
  });
})();
