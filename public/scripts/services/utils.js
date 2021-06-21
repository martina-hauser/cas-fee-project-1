Handlebars.registerHelper('option', function (importance) {
  let template = '';
  let selected = '';
  for (let i=1; i<=5; i++) {
    selected = i == importance ? 'selected' : '';
    template += `<option value="${i}" ${selected}>${i}</option>\n`;
  }
  return new Handlebars.SafeString(template);
})
