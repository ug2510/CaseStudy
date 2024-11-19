using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Model;
using Moq;
using Newtonsoft.Json;
using STU_SecurityMaster;
using STU_SecurityMaster.Controllers;
using STU_SecurityMaster.Equ_csv;
using System.Data;
using System.Text;

namespace SecMaster_xUnitTests
{
    public class EquityTests  
    {
        //private readonly EquityWithUpdateProps equityWithUpdateProps;
        //private readonly List<Equity_csv> equities;
        private readonly Mock<IEquity> _mockEquity;
        private readonly EquityCsvController _controller;
        private readonly Equity_csv_ops _equity;
        private readonly ILogger<Equity_csv_ops> _loggerFactory;
        private readonly List<Equity_csv> _expectedEquities;
        private readonly EquityWithUpdateProps _toUpdateEquity;
        public EquityTests()
        {
            var mockConfSection = new Mock<IConfigurationSection>();
            mockConfSection.SetupGet(m => m[It.Is<string>(s => s == "IVPConn")]).Returns("Server = 192.168.0.13\\\\\\\\sqlexpress,49753 ;DataBase = STU_SecurityMaster ; User Id = sa;Password =sa@12345678;TrustServerCertificate = True");
            var mockConfiguration = new Mock<IConfiguration>();
            mockConfiguration.Setup(a => a.GetSection(It.Is<string>(s => s == "ConnectionStrings"))).Returns(mockConfSection.Object);

            _loggerFactory = new NullLogger<Equity_csv_ops>();
            _mockEquity = new Mock<IEquity>();
            _controller = new EquityCsvController(_loggerFactory, mockConfiguration.Object, _mockEquity.Object);

            _expectedEquities = new List<Equity_csv>
            {
            new Equity_csv
            {
                SecurityId = 1,
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
            new Equity_csv
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
            _toUpdateEquity = new EquityWithUpdateProps
            {
                Description = "Dummy Stock Description",
                SharesOutstanding = 1000000m,
                PriceCurrency = "USD",
                OpenPrice = 150.25m,
                ClosePrice = 155.75m,
                DividendDeclaredDate = new DateTime(2023, 12, 15),
                PFCreditRating = "AA"
            };
        }

        [Fact]
        public async Task GetAllEquityData_ReturnsExpectedResult()
        {
            _mockEquity.Setup(service =>
            service.FetchEquityDataFromDb()).Returns(_expectedEquities);

            var result = await _controller.GetEquityData() as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.Equal(_expectedEquities, result.Value);
        }

        [Theory]
        [InlineData(1, true)]
        public void UpdateEquityById(int id, bool exists)
        {
            EquityWithUpdateProps expectedEquityData = exists ? _toUpdateEquity:null ;
            _mockEquity.Setup(service =>
            service.UpdateEquityData(id,expectedEquityData));

            var result = _controller.UpdateEquity(id,expectedEquityData) as OkObjectResult;
            if (exists)
            {
                Assert.NotNull(result);
                Assert.Equal(expectedEquityData, ((EquityWithUpdateProps)result.Value));
                Assert.Equal(200, result.StatusCode);
            }
            else
            {
                Assert.Null(result);
            }
        }

        //[Theory]
        //[InlineData(1,true)]
        //public void GetEquityById(int id, bool exists)
        //{
        //    Equity_csv expectedEquityData = _expectedEquities[0] ;
        //    _mockEquity.Setup(service =>
        //    service.FetchEquityDataFromDbbyID(id)).Returns(expectedEquityData);

        //    var result = _controller.GetEquityDetailsBySID(id) as OkObjectResult;
        //    if (exists)
        //    {
        //        Assert.NotNull(result);
        //        Assert.Equal(expectedEquityData.SecurityId,((Equity_csv)result.Value).SecurityId);
        //    }
        //}
    }
}