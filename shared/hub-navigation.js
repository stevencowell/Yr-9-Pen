(function () {
  "use strict";

  const HUB_URL = "https://stevencowell.github.io/Main-Page/";
  const BUSY_WORK_URL = "https://stevencowell.github.io/busy-worksheets/?library=timber";
  const PEN_RESOURCE_URL = "https://docs.google.com/presentation/d/1UJVPYocKy_sRtzlE1PBCmOyAVNXlfgnB7DSfXkej2-4/edit";
  const CHANGE_REQUEST_URL = "https://docs.google.com/document/d/1E6rJTa34n_yv9kkZstta99LEAjwbbUIZnhtyYI3x19U/edit";
  const script = document.currentScript;
  const courseRoot = script ? new URL("../", script.src) : new URL("/Yr-9-Pen/", location.origin);
  const navStylesheetUrl = script
    ? new URL("../course-family-navigation.css?v=20260814a", script.src).href
    : new URL("course-family-navigation.css?v=20260814a", courseRoot).href;

  if (!document.querySelector("link[data-course-family-navigation-styles]")) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = navStylesheetUrl;
    stylesheet.dataset.courseFamilyNavigationStyles = "";
    document.head.append(stylesheet);
  }

  if (!document.querySelector(".course-family-nav")) {
    const path = location.pathname.toLowerCase();
    const rootPath = courseRoot.pathname.replace(/\/$/, "").toLowerCase();
    const isCourseHome = path === rootPath + "/" || path === rootPath + "/index.html";
    const isTeacherResources = path.endsWith("/teacher-resources.html");

    const nav = document.createElement("nav");
    nav.className = "course-family-nav screen-only";
    nav.setAttribute("aria-label", "Pen course navigation");

    const inner = document.createElement("div");
    inner.className = "course-family-nav__inner";

    const brand = document.createElement("a");
    brand.className = "course-family-nav__brand";
    brand.href = new URL("index.html", courseRoot).href;
    brand.innerHTML = '<span class="course-family-nav__mark" aria-hidden="true">PEN</span><span>Timber Pen</span>';

    const links = document.createElement("div");
    links.className = "course-family-nav__links";

    const items = [
      { label: "Course", href: "index.html", current: isCourseHome && !isTeacherResources },
      { label: "Modules", href: "index.html#course-map", current: path.includes("/weeks") },
      { label: "Video learning", href: "youtube-library/video-library.html", current: path.includes("/youtube-library/") },
      { label: "Puzzles", href: BUSY_WORK_URL, external: true },
      { label: "My folio", href: "pen-folio.html", current: path.endsWith("/pen-folio.html") },
      { label: "Pen resource", href: PEN_RESOURCE_URL, external: true, newTab: true },
      { label: "Teacher resources", href: "teacher-resources.html", current: isTeacherResources },
      { label: "Main Menu", href: HUB_URL, external: true }
    ];

    items.forEach(function (item) {
      const link = document.createElement("a");
      link.href = item.external ? item.href : new URL(item.href, courseRoot).href;
      link.textContent = item.label;
      if (item.current) link.setAttribute("aria-current", "page");
      if (item.newTab) {
        link.target = "_blank";
        link.rel = "noopener";
      }
      links.append(link);
    });

    inner.append(brand, links);
    nav.append(inner);
    document.body.prepend(nav);
    document.documentElement.classList.add("has-course-family-nav");
  }

  const copyPageAddress = async function () {
    const pageAddress = window.location.href;

    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(pageAddress);
      return true;
    }

    const helper = document.createElement("textarea");
    helper.value = pageAddress;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.append(helper);
    helper.select();
    const copied = document.execCommand("copy");
    helper.remove();
    return copied;
  };

  document.querySelectorAll("[data-site-change-request]").forEach(function (changeLink) {
    changeLink.addEventListener("click", function (event) {
      copyPageAddress()
        .then(function (copied) {
          document.querySelectorAll("[data-change-request-status]").forEach(function (status) {
            status.textContent = copied
              ? "Page link copied. Paste it into PAGE in the staff document."
              : "Copy this page's address from the browser, then paste it into PAGE in the staff document.";
          });
        })
        .catch(function () {
          document.querySelectorAll("[data-change-request-status]").forEach(function (status) {
            status.textContent = "Copy this page's address from the browser, then paste it into PAGE in the staff document.";
          });
        });

      const requestWindow = window.open(CHANGE_REQUEST_URL, "pen-site-change-request", "popup,width=760,height=900");
      if (requestWindow) {
        event.preventDefault();
        requestWindow.focus();
      }
    });
  });
})();
