const brandName = "friopecas";
const cnpj = "09.316.105/0001-29";
const currentYear = new Date().getFullYear();

const brandData = {
  brandName,
  brandLogo: "https://friopecas.vtexassets.com/assets/vtex.file-manager-graphql/images/967b12b0-1ccb-4dcb-8dce-5f7403e5c033___39aeb19a84e80b8732f9a6d14a5af150.png",
  contactEmail: "contato@sualoja.com",
  cnpj,
  facebookUrl: "https://facebook.com/sualoja",
  instagramUrl: "https://instagram.com/sualoja",
  linkedinUrl: "https://linkedin.com/company/sualoja",
  twitterUrl: "https://twitter.com/sualoja",
  currentYear,
};

brandData.copyrightText = `Razão Social: ${brandData.brandName} Ltda CNPJ: ${brandData.cnpj}.
 Todos os direitos reservados © ${brandData.currentYear}. Preços e condições exclusivos para ${brandData.brandName}.com.br`;

export default brandData;
