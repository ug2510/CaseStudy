using System;

namespace Security_viewAPI.Model
{
    public class Security
    {
        public DateTime? AsOfDate { get; set; }
        public string Ticker { get; set; }
        public string SecurityName { get; set; }
        public string GICSSector { get; set; }
        public string GICSSubIndustry { get; set; }
        public string HeadquartersLocation { get; set; }
        public string Founded { get; set; }  // Stored as `nvarchar` in the database
        public decimal? OpenPrice { get; set; }
        public decimal? ClosePrice { get; set; }
        public decimal? DTDChangePercentage { get; set; }
        public decimal? MTDChangePercentage { get; set; }
        public decimal? QTDChangePercentage { get; set; }
        public decimal? YTDChangePercentage { get; set; }
    }
}
