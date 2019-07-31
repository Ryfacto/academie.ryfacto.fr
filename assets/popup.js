(() => {
  let showPopupElements = document.querySelectorAll(".show-popup");
  showPopupElements.forEach(showPopupOnClick)

  let closePopupElements = document.querySelectorAll(".close-popup");
  closePopupElements.forEach(hidePopupOnClick)

  let scrollBackTo = null

  function showPopupOnClick(element) {
    element.addEventListener('click', () => {
      scrollBackTo = element;
      showPopup();
    })
  }

  function hidePopupOnClick(element) {
    element.addEventListener('click', hidePopup)
  }

  function showPopup() {
    getPopup().style.display = 'inherit';
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
  }

  function hidePopup() {
    document.body.style = "";
    if (scrollBackTo) {
      scrollBackTo.scrollIntoView({block: "center"});
    }
    getPopup().style.display = 'none';
  }

  function getPopup() {
    return document.getElementById("popup");
  }
})()
