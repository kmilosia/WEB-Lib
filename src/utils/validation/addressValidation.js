export const addressValidate = (address) => {
    let errors = {}
    if (!address.street) {
      errors.street = "Ulica jest obowiązkowa!"
    }
    if (!address.streetNumber) {
        errors.streetNumber = "Numer ulicy jest obowiązkowy!"
    }
    if (!address.houseNumber) {
        errors.houseNumber = "Numer domu jest obowiązkowy!"
    }
    if (!address.postcode) {
        errors.postcode = "Kod pocztowy jest obowiązkowy!"
    }
    return errors
}
export const addressesValidate = (address, mailingAddress) => {
    let errors = {}
    if (!address.street) {
      errors.street = "Ulica jest obowiązkowa!"
    }
    if (!address.streetNumber) {
        errors.streetNumber = "Numer ulicy jest obowiązkowy!"
    }
    if (!address.houseNumber) {
        errors.houseNumber = "Numer domu jest obowiązkowy!"
    }
    if (!address.postcode) {
        errors.postcode = "Kod pocztowy jest obowiązkowy!"
    }
    if (!mailingAddress.mailingStreet) {
        errors.mailingStreet = "Ulica jest obowiązkowa!"
      }
      if (!mailingAddress.mailingStreetNumber) {
          errors.mailingStreetNumber = "Numer ulicy jest obowiązkowy!"
      }
      if (!mailingAddress.mailingHouseNumber) {
          errors.mailingHouseNumber = "Numer domu jest obowiązkowy!"
      }
      if (!mailingAddress.mailingPostcode) {
          errors.mailingPostcode = "Kod pocztowy jest obowiązkowy!"
      }
    return errors
}