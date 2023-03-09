export const countryCardTemplate = ({
  name,
  capital,
  population,
  flags,
  languages,
}) => {
  return `
      <p class="country-info__field country-info__field--title">
        <img class="country-info__img" src="${flags}" alt="Country flag of ${name}" width="40" height="40"/>
       ${name}
      </p>
      <p class="country-info__field">
        <b class="country-info__field-title">Capital:</b> ${capital.join(', ')}
      </p>
      <p class="country-info__field">
        <b class="country-info__field-title">Population:</b> ${population}
      </p>
      <p class="country-info__field">
        <b class="country-info__field-title">Languages:</b> ${Object.values(
          languages
        ).join(', ')}
      </p>
    `;
};
