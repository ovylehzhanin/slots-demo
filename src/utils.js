export const formatMarkup = (elHTML, data) => {
  const tempDiv = document.createElement('div');
  const el = document.createElement('li');
  let result = elHTML.outerHTML;
  tempDiv.appendChild(el);

  Object.keys(data).forEach(key => {
    let entry = data[key];
    if (!entry) {
      console.warn(`
        utils.js -> fromatMarkup(elHTML: <HTML>, data: <Object>)
        Seems like missed prop-selector name: ${key} in template ${elHTML.firstElementChild.outerHTML}
      `)
    }

    result = result.replace(new RegExp(`{{${key}}}`), data[key])
  });

  tempDiv.innerHTML = result;
  return tempDiv.firstChild;
}