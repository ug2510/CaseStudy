using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace STU_SecurityMaster
{
    public class Equity_csv
    {
        [Column("Bloomberg Unique Id")]
        public int BBGUniqueId { get; set; }
        [Column("Security Name")]
        public string SecurityName { get; set; }
        [Column("Security Description")]
        public string SecurityDescription { get; set; }
        [Column("Has Position")]
        public bool? HasPosition { get; set; }
        [Column("Is Active Security")]
        public bool? IsActiveSecurity { get; set; }
        [Column("Lot Size")]
        public int? LotSize { get; set; }
        [Column("Bloomberg Unique Name")]
        public string BBGUniqueName { get; set; }
        public string? CUSIP { get; set; }
        public string? ISIN { get; set; }
        public string? SEDOL { get; set; }
        [Column("Bloomberg Ticker")]
        public string? BloombergTicker { get; set; }
        public string? BBGGlobalID { get; set; }
        [Column("Bloomberg Ticker and Exchange")]
        public string? TickerAndExchange { get; set; }
        [Column("Is ADR Flag")]
        public bool? IsADRFlag { get; set; }
        [Column("ADR Underlying Ticker")]
        public string ADRUnderlyingTicker { get; set; }
        [Column("ADR Underlying Currency")]
        public string ADRUnderlyingCurrency { get; set; }
        [Column("Shares Per ADR")]
        public decimal? SharesPerADR { get; set; }
        [Column("IPO Date")]
        public DateTime? IPODate { get; set; }
        [Column("Price Currency")]
        public string PricingCurrency { get; set; }
        [Column("Settle Days")]
        public int? SettleDays { get; set; }
        [Column("Shares Outstanding")]
        public decimal? TotalSharesOutstanding { get; set; }
        [Column("Voting Rights Per Share")]
        public decimal? VotingRightsPerShare { get; set; }
        [Column("20 Day Average Volume")]
        public decimal? AverageVolume20D { get; set; }
        public decimal? Beta { get; set; }
        [Column("Short Interest")]
        public decimal? ShortInterest { get; set; }
        [Column("YTD Return")]
        public decimal? ReturnYTD { get; set; }
        [Column("90 Day Price Volatility")]
        public decimal? Volatility90D { get; set; }
        [Column("PF Asset Class")]
        public string PFAssetClass { get; set; }
        [Column("PF Country")]
        public string PFCountry { get; set; }
        [Column("PF Credit Rating")]
        public string PFCreditRating { get; set; }
        [Column("PF Currency")]
        public string PFCurrency { get; set; }
        [Column("PF Instrument")]
        public string PFInstrument { get; set; }
        [Column("PF Liquidity Profile")]
        public string PFLiquidityProfile { get; set; }
        [Column("PF Maturity")]
        public string PFMaturity { get; set; }
        [Column("PF NAIC Code")]
        public string PFNAICCode { get; set; }
        [Column("PF Region")]
        public string PFRegion { get; set; }
        [Column("PF Region")]
        public string PFSector { get; set; }
        [Column("PF Sector")]
        public string PFSubAssetClass { get; set; }
        [Column("PF SubAsset Class")]
        public string CountryOfIssuance { get; set; }
        [Column("Issue Country")]
        public string Exchange { get; set; }
        public string Issuer { get; set; }
        [Column("Issue Currency")]
        public string IssueCurrency { get; set; }
        [Column("Trading Currency")]
        public string TradingCurrency { get; set; }
        [Column("Bloomberg Industry Sub Group")]
        public string BBGIndustrySubGroup { get; set; }
        [Column("Bloomberg Industry Group")]
        public string BloombergIndustryGroup { get; set; }
        [Column("Bloomberg Sector")]
        public string BloombergSector { get; set; }
        [Column("Country Of Incorporation")]
        public string CountryOfIncorporation { get; set; }
        [Column("Risk Currency")]
        public string RiskCurrency { get; set; }
        [Column("Open Price")]
        public decimal? OpenPrice { get; set; }
        [Column("Close Price")]
        public decimal? ClosePrice { get; set; }
        public decimal? Volume { get; set; }
        [Column("Last Price")]
        public decimal? LastPrice { get; set; }
        [Column("Ask Price")]
        public decimal? AskPrice { get; set; }
        [Column("Bid Price")]
        public decimal? BidPrice { get; set; }
        [Column("PE Ratio")]
        public decimal? PERatio { get; set; }
        [Column("Declared Date")]
        public DateTime? DividendDeclaredDate { get; set; }
        [Column("Ex Date")]
        public DateTime? DividendExDate { get; set; }
        [Column("Record Date")]
        public DateTime? DividendRecordDate { get; set; }
        [Column("Pay Date")]
        public DateTime? DividendPayDate { get; set; }
        [Column("Dividend Amount")]
        public decimal? DividendAmount { get; set; }
        public string Frequency { get; set; }
        [Column("Dividend Type")]
        public string DividendType { get; set; }
    }
}
