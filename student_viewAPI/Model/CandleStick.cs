﻿namespace Security_viewAPI.Model
{
    public class CandleStick
    {
        public DateTime? Date { get; set; }
        public decimal? Open { get; set; }
        public decimal? High { get; set; }
        public decimal? Low { get; set; }
        public decimal? Close { get; set; }
        public decimal? Adj_Close { get; set; }
        public decimal? Volume { get; set; }
        public string? Ticker { get; set; }
        public decimal? DTDChangePercentage { get; set; }
        public decimal? MTDChangePercentage { get; set; }
        public decimal? QTDChangePercentage { get; set; }
        public decimal? YTDChangePercentage { get; set; }
    }
}
