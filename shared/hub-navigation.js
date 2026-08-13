(function () {
  "use strict";

  const HUB_URL = "https://stevencowell.github.io/Main-Page/";
  const BUSY_WORK_URL = "https://stevencowell.github.io/busy-worksheets/?library=timber";
  const CHANGE_REQUEST_URL = "https://docs.google.com/document/d/1E6rJTa34n_yv9kkZstta99LEAjwbbUIZnhtyYI3x19U/edit";
  const script = document.currentScript;
  const stylesheetUrl = script ? new URL("sister-site.css", script.src).href : "";

  if (stylesheetUrl && !document.querySelector('link[data-sister-site-styles]')) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = stylesheetUrl;
    stylesheet.dataset.sisterSiteStyles = "";
    document.head.append(stylesheet);
  }

  if (document.querySelector(".hub-return-bar")) return;

  const heading = document.querySelector("h1");
  const courseLabel = heading && heading.textContent.trim() ? heading.textContent.trim() : document.title;
  const bar = document.createElement("nav");
  bar.className = "hub-return-bar screen-only";
  bar.setAttribute("aria-label", "Industrial Arts Learning Hub navigation");

  const inner = document.createElement("div");
  inner.className = "hub-return-inner";

  const link = document.createElement("a");
  link.className = "hub-return-link";
  link.href = HUB_URL;
  link.innerHTML = '<span aria-hidden="true">←</span><span>Main menu · Industrial Arts Learning Hub</span>';

  const label = document.createElement("span");
  label.className = "hub-course-label";
  label.textContent = courseLabel;

  const actions = document.createElement("div");
  actions.className = "hub-return-actions";

  const requestLink = document.createElement("a");
  requestLink.className = "hub-change-link";
  requestLink.href = CHANGE_REQUEST_URL;
  requestLink.target = "_blank";
  requestLink.rel = "noopener";
  requestLink.dataset.siteChangeRequest = "";
  requestLink.textContent = "Suggest a change";
  requestLink.setAttribute("aria-label", "Suggest a change to this Pen website page");

  const busyWork = document.createElement("a");
  busyWork.className = "hub-change-link";
  busyWork.href = BUSY_WORK_URL;
  busyWork.textContent = "Busy Work";

  actions.append(label, busyWork, requestLink);
  inner.append(link, actions);
  bar.append(inner);
  document.body.prepend(bar);

  const copyPageAddress = async () => {
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

  document.querySelectorAll("[data-site-change-request]").forEach((changeLink) => {
    changeLink.addEventListener("click", (event) => {
      copyPageAddress()
        .then((copied) => {
          document.querySelectorAll("[data-change-request-status]").forEach((status) => {
            status.textContent = copied
              ? "Page link copied. Paste it into PAGE in the staff document."
              : "Copy this page's address from the browser, then paste it into PAGE in the staff document.";
          });
        })
        .catch(() => {
          document.querySelectorAll("[data-change-request-status]").forEach((status) => {
            status.textContent = "Copy this page's address from the browser, then paste it into PAGE in the staff document.";
          });
        });

      const requestWindow = window.open(changeLink.href, "pen-site-change-request", "popup,width=760,height=900");
      if (requestWindow) {
        event.preventDefault();
        requestWindow.focus();
      }
    });
  });
})();
