export const closeByEsc = (e) => {
  if (e.code === "Escape") {
    closeModalWindow(e);
    closeModalForm(e);
  }
};

export function openModalWindow(e) {
  e.preventDefault();
  document.querySelector("#popup-root").classList.remove("is-hide");
  window.addEventListener("keydown", closeByEsc);
  document.querySelector("body").style.overflow = "hidden";
}

export function closeModalWindow() {
  document.querySelector("#popup-root").classList.add("is-hide");
  window.removeEventListener("keydown", closeByEsc);
  document.querySelector("body").style.overflow = "visible";
}

export function openModalForm(e) {
  e.preventDefault();
  document.querySelector("#popup-register-root").classList.remove("is-hide");
  window.addEventListener("keydown", closeByEsc);
  document.querySelector("body").style.overflow = "hidden";
}

export function closeModalForm() {
  document.querySelector("#popup-register-root").classList.add("is-hide");
  window.removeEventListener("keydown", closeByEsc);
  document.querySelector("body").style.overflow = "visible";
}
