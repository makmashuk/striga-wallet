import { IAccount, IValidAccount } from "@/types/wallet.type";

enum SmallestDivisibleUnit {
  SATOSHI = 100000000,
  CENTS = 100,
  WEI = 1000000000000000000,
}
enum CurrencyRateToMin {
  BTC = 0.001,
  EURO = 10,
  USD = 10,
  USDT = 10,
  USDC = 10,
  BUSD = 10,
  ETH = 0.01,
  BNB = 0.01,
}

// finding the minimum trede value and returning in source currency smallest unit
const getMinTradeValue = (
  rateFromTheSource: any,
  selectedDestination: IValidAccount
) => {
  console.log(rateFromTheSource);
  const direction = rateFromTheSource?.type?.direction;
  const rateforExchange =
    rateFromTheSource?.type?.direction === "buy"
      ? rateFromTheSource?.rate?.buy
      : rateFromTheSource?.rate?.sell;
  switch (selectedDestination?.currencyType) {
    case "BTC":
      // From : EUR USDT USDC -> BUY
      const minBTC = rateforExchange * CurrencyRateToMin.BTC;
      const minBTCinCents = minBTC * SmallestDivisibleUnit.CENTS;
      return minBTCinCents;
    case "ETH":
      // From : EUR -> BUY
      const minETH = rateforExchange * CurrencyRateToMin.ETH;
      const minETHinCents = minETH * SmallestDivisibleUnit.CENTS;
      return minETHinCents;
    case "BNB":
      // From : EUR -> BUY
      const minBNB = rateforExchange * CurrencyRateToMin.BNB;
      const minBNBinCents = minBNB * SmallestDivisibleUnit.CENTS;
      return minBNBinCents;
    case "BUSD":
      // From : EUR -> SELL
      const minBUSD = (1 / rateforExchange) * CurrencyRateToMin.BUSD;
      const minBUSDinCents = minBUSD * SmallestDivisibleUnit.CENTS;
      return minBUSDinCents;
    case "EUR":
      // From : USDT USDC BTC ETH BNB -> SELL : BUSD -> BUY
      if (rateFromTheSource?.currency === "BUSD") {
        const minBUSDFloat = rateforExchange * CurrencyRateToMin.EURO;
        const minInCents = minBUSDFloat * SmallestDivisibleUnit.CENTS;
        return minInCents;
      }
      if (rateFromTheSource?.currency === "BTC") {
        const minBTCFloat = (1 / rateforExchange) * CurrencyRateToMin.EURO;
        const minInSAT = minBTCFloat * SmallestDivisibleUnit.SATOSHI;
        return minInSAT;
      }
      if (
        rateFromTheSource?.currency === "ETH" ||
        rateFromTheSource?.currency === "BNB"
      ) {
        const minETHFloat = (1 / rateforExchange) * CurrencyRateToMin.EURO;
        const minInWIE = minETHFloat * SmallestDivisibleUnit.WEI;
        return minInWIE;
      }
      if (
        rateFromTheSource?.currency === "USDT" ||
        rateFromTheSource?.currency === "USDC"
      ) {
        const minUSDFloat = (1 / rateforExchange) * CurrencyRateToMin.EURO;
        const minInCents = minUSDFloat * SmallestDivisibleUnit.CENTS;
        return minInCents;
      }
    case "USDT":
      // From : USDC BTC  -> SELL : EUR -> BUY
      if (rateFromTheSource?.currency === "EUR") {
        const minEURFloat = rateforExchange * CurrencyRateToMin.EURO;
        const minInCents = minEURFloat * SmallestDivisibleUnit.CENTS;
        return minInCents;
      }
      if (rateFromTheSource?.currency === "BTC") {
        const minBTCFloat = (1 / rateforExchange) * CurrencyRateToMin.EURO;
        const minInSAT = minBTCFloat * SmallestDivisibleUnit.SATOSHI;
        return minInSAT;
      }
      if (rateFromTheSource?.currency === "USDC") {
        const minUSDFloat = (1 / rateforExchange) * CurrencyRateToMin.EURO;
        const minInCents = minUSDFloat * SmallestDivisibleUnit.CENTS;
        return minInCents;
      }
    case "USDC":
      // From :  BTC -> SELL : USDT EUR -> BUY
      if (rateFromTheSource?.currency === "EUR") {
        const minEURFloat = rateforExchange * CurrencyRateToMin.EURO;
        const minInCents = minEURFloat * SmallestDivisibleUnit.CENTS;
        return minInCents;
      }
      if (rateFromTheSource?.currency === "BTC") {
        const minBTCFloat = (1 / rateforExchange) * CurrencyRateToMin.EURO;
        const minInSAT = minBTCFloat * SmallestDivisibleUnit.SATOSHI;
        return minInSAT;
      }
      if (rateFromTheSource?.currency === "USDT") {
        const minUSDFloat = rateforExchange * CurrencyRateToMin.EURO;
        const minInCents = minUSDFloat * SmallestDivisibleUnit.CENTS;
        return minInCents;
      }
  }
};

//filtering accounts by checking the permission array
const filterCryptocurrenciesAccount = (accounts: IAccount[]) => {
  const filteredAccounts: any = [];
  for (const [currencyType, details] of Object.entries(accounts)) {
    const permissions = details.permissions;
    if (!permissions?.includes("CUSTODY") || permissions?.length > 1) {
      const accountObj = {
        currencyType: currencyType,
        ...details,
      };
      filteredAccounts.push(accountObj);
    }
  }

  return filteredAccounts;
};

// geting the valid source account from the TICKER TRADE Map
const getValidSources = (account: IValidAccount, rates: any) => {
  const tickerFilter: any =
    currencyExchangeRates?.toCurrency[account?.currencyType];
  const validSources = [];
  for (const currency in tickerFilter?.fromCurrency) {
    const rateOfticker = rates[tickerFilter?.fromCurrency[currency]?.ticker];
    const type = tickerFilter?.fromCurrency[currency];
    const obj = {
      rate: rateOfticker,
      type: type,
      currency,
    };
    validSources.push(obj);
  }
  return validSources;
};

// finding the rate of selected source account
function getSourceRate(rates: any, account: IValidAccount) {
  console.log(rates);
  for (let acc of rates) {
    if (acc?.currency === account?.currencyType) {
      return acc;
    }
  }
}

const currencyExchangeRates: any = {
  toCurrency: {
    BTC: {
      fromCurrency: {
        EUR: {
          direction: "buy",
          ticker: "BTCEUR",
        },
        USDT: {
          direction: "buy",
          ticker: "BTCUSDT",
        },
        USDC: {
          direction: "buy",
          ticker: "BTCUSDC",
        },
      },
    },
    EUR: {
      fromCurrency: {
        USDT: {
          direction: "sell",
          ticker: "USDTEUR",
        },
        USDC: {
          direction: "sell",
          ticker: "USDCEUR",
        },
        BTC: {
          direction: "sell",
          ticker: "BTCEUR",
        },
        ETH: {
          direction: "sell",
          ticker: "ETHEUR",
        },
        BUSD: {
          direction: "buy",
          ticker: "BUSDEUR",
        },
        BNB: {
          direction: "sell",
          ticker: "BNBEUR",
        },
      },
    },
    USDT: {
      fromCurrency: {
        EUR: {
          direction: "buy",
          ticker: "USDTEUR",
        },
        USDC: {
          direction: "sell",
          ticker: "USDCUSDT",
        },
        BTC: {
          direction: "sell",
          ticker: "BTCUSDT",
        },
      },
    },
    USDC: {
      fromCurrency: {
        USDT: {
          direction: "buy",
          ticker: "USDCUSDT",
        },
        EUR: {
          direction: "buy",
          ticker: "USDCEUR",
        },
        BTC: {
          direction: "sell",
          ticker: "BTCUSDC",
        },
      },
    },
    ETH: {
      fromCurrency: {
        EUR: {
          direction: "buy",
          ticker: "ETHEUR",
        },
      },
    },
    BUSD: {
      fromCurrency: {
        EUR: {
          direction: "sell",
          ticker: "BUSDEUR",
        },
      },
    },
    BNB: {
      fromCurrency: {
        EUR: {
          direction: "buy",
          ticker: "BNBEUR",
        },
      },
    },
  },
};
export {
  getMinTradeValue,
  filterCryptocurrenciesAccount,
  getValidSources,
  getSourceRate,
};
