using System;

namespace STU_SecurityMaster
{
    public class Equity_csv
    {
        public string SecurityName { get; set; }
        public string SecurityDescription { get; set; }
        public bool? HasPosition { get; set; }
        public bool? IsActiveSecurity { get; set; }
        public int? LotSize { get; set; }
        public string BBGUniqueName { get; set; }
        public string CUSIP { get; set; }
        public string ISIN { get; set; }
        public string SEDOL { get; set; }
        public string BloombergTicker { get; set; }
        public string BloombergUniqueID { get; set; }
        public string BBGGlobalID { get; set; }
        public string TickerAndExchange { get; set; }
        public bool? IsADRFlag { get; set; }
        public string ADRUnderlyingTicker { get; set; }
        public string ADRUnderlyingCurrency { get; set; }
        public decimal? SharesPerADR { get; set; }
        public DateTime? IPODate { get; set; }
        public string PricingCurrency { get; set; }
        public int? SettleDays { get; set; }
        public decimal? TotalSharesOutstanding { get; set; }
        public decimal? VotingRightsPerShare { get; set; }
        public decimal? AverageVolume20D { get; set; }
        public decimal? Beta { get; set; }
        public decimal? ShortInterest { get; set; }
        public decimal? ReturnYTD { get; set; }
        public decimal? Volatility90D { get; set; }
        public string PFAssetClass { get; set; }
        public string PFCountry { get; set; }
        public string PFCreditRating { get; set; }
        public string PFCurrency { get; set; }
        public string PFInstrument { get; set; }
        public string PFLiquidityProfile { get; set; }
        public string PFMaturity { get; set; }
        public string PFNAICCode { get; set; }
        public string PFRegion { get; set; }
        public string PFSector { get; set; }
        public string PFSubAssetClass { get; set; }
        public string CountryOfIssuance { get; set; }
        public string Exchange { get; set; }
        public string Issuer { get; set; }
        public string IssueCurrency { get; set; }
        public string TradingCurrency { get; set; }
        public string BBGIndustrySubGroup { get; set; }
        public string BloombergIndustryGroup { get; set; }
        public string BloombergSector { get; set; }
        public string CountryOfIncorporation { get; set; }
        public string RiskCurrency { get; set; }
        public decimal? OpenPrice { get; set; }
        public decimal? ClosePrice { get; set; }
        public decimal? Volume { get; set; }
        public decimal? LastPrice { get; set; }
        public decimal? AskPrice { get; set; }
        public decimal? BidPrice { get; set; }
        public decimal? PERatio { get; set; }
        public DateTime? DividendDeclaredDate { get; set; }
        public DateTime? DividendExDate { get; set; }
        public DateTime? DividendRecordDate { get; set; }
        public DateTime? DividendPayDate { get; set; }
        public decimal? DividendAmount { get; set; }
        public string Frequency { get; set; }
        public string DividendType { get; set; }
    }
}
