import { IAccount, IValidAccount } from "@/types/wallet.type";
import { getTradeRates } from "./wallet.service";

function generateRandomName() {
  const consonants = "bcdfghjklmnpqrstvwxyz";
  const vowels = "aeiou";
  let name = "";

  // Add the first letter (a random consonant)
  name += consonants.charAt(Math.floor(Math.random() * consonants.length));

  // Add the remaining letters (alternating between consonants and vowels)
  for (let i = 1; i < 5; i++) {
    const type = i % 2 === 0 ? vowels : consonants;
    name += type.charAt(Math.floor(Math.random() * type.length));
  }

  return name;
}
function generateRandomEmail() {
  const randomString = Math.random().toString(36).substring(2, 10);
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `${randomString}@${randomDomain}`;
}
function generateRandomNumber() {
  const prefixes = ["17", "19", "15"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const remainingDigits = Math.floor(Math.random() * 100000000);
  const number = prefix + remainingDigits.toString().padStart(8, "0");
  return number;
}

function getPermissionColor(item: string) {
  switch (item) {
    case "CUSTODY":
      return "info";
      break;
    case "TRADE":
      return "success";
      break;
    case "INTER":
      return "warning";
      break;
    default:
      return "primary";
  }
}

// async function getValidDestinations(account: any) {
//   const filteredCurrencies = [];
//   const currencyTYpe = account?.currencyType;
//   for (const currency in currencyExchangeRates?.toCurrency) {
//     const fromCurrency: any =
//       currencyExchangeRates?.toCurrency[currency]?.fromCurrency;
//     if (fromCurrency[currencyTYpe]) {
//       const rates = await getTradeRates();

//       console.log(fromCurrency);
//       const rateOfTicker = rates[fromCurrency[currencyTYpe]?.ticker];
//       const payload = {
//         ...fromCurrency[currencyTYpe],
//         ...rateOfTicker,
//       };
//       filteredCurrencies.push(payload);
//     }
//   }
//   return filteredCurrencies;
// }

export {
  generateRandomName,
  generateRandomEmail,
  generateRandomNumber,
  getPermissionColor,
  // getValidDestinations,
};
