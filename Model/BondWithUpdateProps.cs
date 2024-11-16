using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class BondWithUpdateProps
    {
        public string Description { get; set; }
        public decimal CouponRate { get; set; }
        public bool IsCallable { get; set; }
        public DateTime PenultimateCouponDate { get; set; }
        public string PfCreditRating { get; set; }
        public decimal AskPrice { get; set; }
        public decimal BidPrice { get; set; }
    }
}
