const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-section");


window.addEventListener("load", updatePaletteUi)
generateBtn.addEventListener("click", updatePaletteUi);


paletteContainer.addEventListener("click", (e) => {
  if ( e.target.classList.contains('copy-btn') ) {
    const hexValue = e.target.previousElementSibling.textContent;
    navigator.clipboard
      .writeText(hexValue)
      .then(
        () => showCopySuccess(
          e.target
        )
      )
      .catch(
        (e) => console.error("Error copying color code: ", e)
      )
  }
  else if ( e.target.classList.contains('color') ) {
    const hexValue = e.target
      .nextElementSibling
      .querySelector('.hex-value')
      .textContent;
    
    navigator.clipboard
      .writeText(hexValue)
      .then(
        () => showCopySuccess(
          e.target.nextElementSibling.querySelector('.copy-btn')
        )
      )
      .catch(
        (e) => console.error("Error copying color code: ", e)
      )
  }

})


function generatePalette () {
  const colors = [];

  for (let i = 0; i < 5; i++) {
    colors.push( generateRandomColorHex() )
  }

  return colors;
}

function generateRandomColorHex () {
  let chars = "0123456789ABCDEF";
  let colorHex = "#"

  for (let i = 0; i < 6; i++) {
    colorHex += chars[Math.floor(Math.random() * 16)];
  }

  return colorHex;
}


function updatePaletteUi () {
  const colorBoxes = document.querySelectorAll('.color-box');
  const colors = generatePalette()

  colorBoxes.forEach(
    (box, idx) => {
      const colorDiv = box.querySelector('.color');
      const hexValue = box.querySelector('.hex-value');

      const color = colors[idx]

      colorDiv.style.backgroundColor = color
      hexValue.textContent = color
    }
  )
}

function showCopySuccess (element) {
  element.classList.remove('far', 'fa-copy');
  element.classList.add('fas', 'fa-check');

  element.style.color = "#48bb78"
  
  setTimeout(() => {
    element.classList.remove("fas", "fa-check");
    element.classList.add("far", "fa-copy");

    element.style.color = ""
  }, 1500)
}