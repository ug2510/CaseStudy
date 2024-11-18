using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Model;
using STU_SecurityMaster;
using STU_SecurityMaster.Equ_csv;

namespace SecMaster_xUnitTests
{
    public class EquityTests
    {
        private readonly EquityWithUpdateProps equityWithUpdateProps;
        private readonly List<Equity_csv> equities;
        private readonly Equity_csv_ops eps;
        private readonly IConfiguration _configuration;
        private readonly ILogger<Equity_csv_ops> _logger;
        public EquityTests()
        {
            equityWithUpdateProps = new EquityWithUpdateProps{
                Description = "Dummy Stock Description",
                SharesOutstanding = 1000000m, 
                PriceCurrency = "USD",
                OpenPrice = 150.25m,
                ClosePrice = 155.75m,
                DividendDeclaredDate = new DateTime(2023, 12, 15),
                PFCreditRating = "AA"
            };

            equities = new List<Equity_csv>
            {
                new ()
                {
                    SecurityId=1,
                    BBGUniqueId = "EQ0010080100001000",
                    SecurityName = "IBM US",
                    SecurityDescription = "string",
                    HasPosition = true,
                    IsActiveSecurity = true,
                    LotSize = 100,
                    BBGUniqueName = "IBM US",
                    CUSIP = "459200101",
                    ISIN = "US4592001014",
                    SEDOL = "2005973",
                    BloombergTicker = "IBM",
                    BBGGlobalID = null,
                    TickerAndExchange = null,
                    IsADRFlag = false,
                    ADRUnderlyingTicker = null,
                    ADRUnderlyingCurrency = null,
                    SharesPerADR = null,
                    IPODate = null,
                    PricingCurrency = "USD",
                    SettleDays = 2,
                    TotalSharesOutstanding = 989660472,
                    VotingRightsPerShare = 1,
                    AverageVolume20D = 5956690,
                    Beta = 0.73m,
                    ShortInterest = 21437944,
                    ReturnYTD = -10.36m,
                    Volatility90D = 18.68m,
                    PFAssetClass = "Equity",
                    PFCountry = "United States of America",
                    PFCreditRating = "string",
                    PFCurrency = "Unite",
                    PFInstrument = "Securities",
                    PFLiquidityProfile = "<7 Days",
                    PFMaturity = null,
                    PFNAICCode = "Computer &",
                    PFRegion = "North America",
                    PFSector = null,
                    PFSubAssetClass = "Other listed equity",
                    CountryOfIssuance = "UNITED STATES",
                    Exchange = "Multi-Listed US Exchanges",
                    Issuer = "IBM",
                    IssueCurrency = "USD",
                    TradingCurrency = "USD",
                    BBGIndustrySubGroup = "Computer Software",
                    BloombergIndustryGroup = "Computers",
                    BloombergSector = "Technology",
                    CountryOfIncorporation = "UNITED STATES",
                    RiskCurrency = "USD",
                    OpenPrice = 164.16m,
                    ClosePrice = 164.16m,
                    Volume = 3817529,
                    LastPrice = 164.16m,
                    AskPrice = 187.68m,
                    BidPrice = 187.67m,
                    PERatio = 9.76m,
                    DividendDeclaredDate = new DateTime(2015, 1, 1),
                    DividendExDate = new DateTime(2015, 1, 15),
                    DividendRecordDate = new DateTime(2015, 1, 20),
                    DividendPayDate = new DateTime(2015, 2, 1),
                    DividendAmount = 1.12m,
                    Frequency = null,
                    DividendType = "Cash"
                },
                new ()
                {
                    BBGUniqueId = "EQ0011792500001001",
                    SecurityName = "SAMSUNG C&T CORP",
                    SecurityDescription = "Samsung C&T Corp",
                    HasPosition = true,
                    IsActiveSecurity = true,
                    LotSize = 100,
                    BBGUniqueName = "SAMSUNG C&T CORP",
                    CUSIP = null,
                    ISIN = "KR7000830000",
                    SEDOL = "6771601",
                    BloombergTicker = "KS",
                    BBGGlobalID = null,
                    TickerAndExchange = null,
                    IsADRFlag = false,
                    ADRUnderlyingTicker = null,
                    ADRUnderlyingCurrency = null,
                    SharesPerADR = null,
                    IPODate = null,
                    PricingCurrency = "USD",
                    SettleDays = 2,
                    TotalSharesOutstanding = 1234553,
                    VotingRightsPerShare = 1,
                    AverageVolume20D = 0,
                    Beta = 1,
                    ShortInterest = 0,
                    ReturnYTD = 0m,
                    Volatility90D = null,
                    PFAssetClass = "Equity",
                    PFCountry = "South Korea",
                    PFCreditRating = "A-",
                    PFCurrency = "South",
                    PFInstrument = "Securities",
                    PFLiquidityProfile = "<7 Days",
                    PFMaturity = null,
                    PFNAICCode = null,
                    PFRegion = "Asia and Pacific (other than the middle east)",
                    PFSector = null,
                    PFSubAssetClass = "Other listed equity",
                    CountryOfIssuance = "SOUTH KOREA",
                    Exchange = "KOSPI",
                    Issuer = "Samsung C&T Corporation",
                    IssueCurrency = "KRW",
                    TradingCurrency = "KRW",
                    BBGIndustrySubGroup = "Distribution/Wholesale",
                    BloombergIndustryGroup = "Distribution/Wholesale",
                    BloombergSector = "Consumer, Cyclical",
                    CountryOfIncorporation = "SOUTH KOREA",
                    RiskCurrency = "KRW",
                    OpenPrice = 1378000m,
                    ClosePrice = 1377991m,
                    Volume = 0,
                    LastPrice = 1378000m,
                    AskPrice = 1381025m,
                    BidPrice = 1381000m,
                    PERatio = 19.77m,
                    DividendDeclaredDate = new DateTime(2024, 11, 16),
                    DividendExDate = new DateTime(2015, 1, 15),
                    DividendRecordDate = new DateTime(2015, 1, 20),
                    DividendPayDate = new DateTime(2015, 2, 2),
                    DividendAmount = 0.8m,
                    Frequency = null,
                    DividendType = "Cash"
                }
            };
            //eps = new Equity_csv_ops();
        }
        [Theory]
        [InlineData(1, true)]
        [InlineData(100, false)]
        public async Task GetSecurityById_ReturnsExpectedResult(int securityId, bool expected)
        {
            //Act
            //var result = await eps.FetchEquityDataFromDbbyID(securityId);
            //if(expected)
            //{
            //    Assert.NotNull(result);
            //    Assert.Equal(expected, result);
            //}
            //else
            //{
            //    Assert.Null(result);
            //}
        }
    }
}