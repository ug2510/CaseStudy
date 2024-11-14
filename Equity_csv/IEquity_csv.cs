using System.Xml.Serialization;

using Model;

namespace STU_SecurityMaster.Equity_csv
{
    public interface IEquity_csv
    {
       List<List<string>>  FetchDataFromCSV(string path);
    }
}
