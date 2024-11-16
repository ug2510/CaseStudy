using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class EquityWithUpdateProps
    {
        public string Description { get; set; }
        public decimal SharesOutstanding { get; set; }
        public string PriceCurrency { get; set; }
        public decimal OpenPrice { get; set; }
        public decimal ClosePrice { get; set; }
        public DateTime DividendDeclaredDate { get; set; }
        public string PFCreditRating { get; set; }
    }
}