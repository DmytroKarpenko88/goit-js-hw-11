export const listItemTemplate = ({ name, flags }) => {
  return `
  <li class="country-list__item">
    <img class="country-list__img" src="${flags}" alt="Country flag of ${name}" width="40"/>
    ${name}
  </li>
`;
};
