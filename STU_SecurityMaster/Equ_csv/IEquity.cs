using Model;

namespace STU_SecurityMaster.Equ_csv
{
    public interface IEquity
    {
        string FetchDataFromCSV(string path);
        public dynamic FetchEquityDataFromDbbyID(int sid);
        public dynamic FetchEquityDataFromDb();
        public void UpdateEquityData(int sid,EquityWithUpdateProps equity);
    }
}
