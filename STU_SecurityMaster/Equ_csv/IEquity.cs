namespace STU_SecurityMaster.Equ_csv
{
    public interface IEquity
    {
        string FetchDataFromCSV(string path);
        public dynamic FetchEquityDataFromDb();
    }
}
