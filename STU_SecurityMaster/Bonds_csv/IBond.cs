using Model;

namespace STU_SecurityMaster.Bonds_csv
{
    public interface IBond
    {
        string FetchDataFromCSV(string path);
        //public dynamic FetchBondsDataFromDbbyID(int sid);
        public dynamic FetchBondsDataFromDb();
        public void UpdateBondData(int sid, BondWithUpdateProps bond);
        public void SoftDeleteBond(int sid);
    }
}
