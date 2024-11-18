using CsvHelper.Configuration;
using CsvHelper;
using System.Globalization;
using ChoETL;
using System.Data.SqlClient;
using STU_SecurityMaster.Bonds_csv;
using System.Data;
using Model;
using STU_SecurityMaster.Equ_csv;
using System.Configuration;

namespace STU_SecurityMaster.Bonds_csv
{
    public class Bond_csv_ops : IBond
    {
        private readonly ILogger<Bond_csv_ops> _logger;
        private readonly string _connectionString;


        public Bond_csv_ops(ILogger<Bond_csv_ops> logger, IConfiguration configuration)
        {
            _logger = logger;
            _connectionString = configuration.GetConnectionString("IVPConn");
        }

       

        public dynamic FetchBondsDataFromDb()
        {
            SqlConnection conn;
            SqlCommand cmd;
            SqlDataAdapter da;
            try
            {
                conn = new SqlConnection(_connectionString);
                cmd = new SqlCommand("GetAllBondsData", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                da = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                DataTable dt = ds.Tables[0];
                _logger.LogInformation("All Bonds were Fetched");
                return dt;
            }
            catch (SqlException sqlerror)
            {
                Console.WriteLine("Cannot get Bond details " + sqlerror.Message);
                _logger.LogError(sqlerror.Message);
                return sqlerror.Message;
            }
        }
        public dynamic FetchBondDataFromDbbyID(int sid)
        {
            SqlConnection conn;
            SqlCommand cmd;
            SqlDataAdapter da;
        
            try
            {
                conn = new SqlConnection(_connectionString);
                cmd = new SqlCommand("GetBondDetailsBySID", conn);
                cmd.CommandType = CommandType.StoredProcedure;
        
                cmd.Parameters.Add(new SqlParameter("@SID", SqlDbType.Int));
                cmd.Parameters["@SID"].Value = sid;
        
                da = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
        
                DataTable dt = ds.Tables[0];
                _logger.LogInformation($"Bond Data with SID {sid} was fetched");
                return dt;
            }
            catch (SqlException sqlerror)
            {
                Console.WriteLine("Cannot get Equity details " + sqlerror.Message);
                _logger.LogError(sqlerror.Message);
                return sqlerror.Message;
            }
        }
        
        public string FetchDataFromCSV(string path)
        {

            string dateFormat = "MMM-dd-yyyy"; 

            DateTime parsedDate;
         
            try
            {
                using (var reader = new ChoCSVReader(path).WithFirstLineHeader())
                {
                    using (SqlConnection conn = new SqlConnection(_connectionString))
                    {
                        conn.Open();

                        foreach (dynamic item in reader)
                        {
                            using (SqlCommand cmd = new SqlCommand("InsertBondsCsvData", conn))
                            {
                                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                                
                                cmd.Parameters.AddWithValue("@SecurityDescription", item["Security Description"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@SecurityName", item["Security Name"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@AssetType", item["Asset Type"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@InvestmentType", item["Investment Type"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@TradingFactor", item["Trading Factor"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PricingFactor", item["Pricing Factor"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@ISIN", item["ISIN"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@BBGTicker", item["BBG Ticker"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@BBGUniqueID", item["BBG Unique ID"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@CUSIP", item["CUSIP"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@SEDOL", item["SEDOL"] ?? DBNull.Value);
                                
                                cmd.Parameters.AddWithValue("@FirstCouponDate",DateTime.TryParseExact(item["First Coupon Date"]?.ToString(), dateFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate) ? (object)parsedDate : DBNull.Value);
                                cmd.Parameters.AddWithValue("@Cap", item["Cap"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@Floor", item["Floor"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@CouponFrequency", item["Coupon Frequency"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@Coupon", item["Coupon"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@CouponType", item["Coupon Type"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@Spread", item["Spread"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@CallableFlag", item["Callable Flag"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@FixToFloatFlag", item["Fix to Float Flag"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PutableFlag", item["Putable Flag"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@IssueDate",
                                        DateTime.TryParseExact(item["Issue Date"]?.ToString(), dateFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate) ? (object)parsedDate : DBNull.Value);
                                cmd.Parameters.AddWithValue("@LastResetDate",
                                        DateTime.TryParseExact(item["Last Reset Date"]?.ToString(), dateFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate) ? (object)parsedDate : DBNull.Value); 
                                cmd.Parameters.AddWithValue("@Maturity",
                                        DateTime.TryParseExact(item["Maturity"]?.ToString(), dateFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate) ? (object)parsedDate : DBNull.Value);
                               
                                int callNotificationMaxDaysInt;
                                var callNotificationMaxDaysValue = item["Call Notification Max Days"]?.ToString();

                                if (callNotificationMaxDaysValue != null  )
                                {
                                    double a = double.Parse(callNotificationMaxDaysValue);
                                    
                                    callNotificationMaxDaysInt = (int)a;
                                    cmd.Parameters.AddWithValue("@CallNotificationMaxDays", callNotificationMaxDaysInt);
                                }
                                else
                                {
                                    cmd.Parameters.AddWithValue("@CallNotificationMaxDays", DBNull.Value);
                                }
                                int putNotificationMaxDaysInt;
                                var putNotificationMaxDaysValue = item["Put Notification Max Days"]?.ToString();

                                if (putNotificationMaxDaysValue != null)
                                {
                                    double b = double.Parse(putNotificationMaxDaysValue);
                                    
                                    putNotificationMaxDaysInt = (int)b;
                                    cmd.Parameters.AddWithValue("@PutNotificationMaxDays", putNotificationMaxDaysInt);
                                }
                                else
                                {
                                    cmd.Parameters.AddWithValue("@PutNotificationMaxDays", DBNull.Value);
                                }
                                cmd.Parameters.AddWithValue("@PenultimateCouponDate",
                                        DateTime.TryParseExact(item["Penultimate Coupon Date"]?.ToString(), dateFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate) ? (object)parsedDate : DBNull.Value); cmd.Parameters.AddWithValue("@ResetFrequency", item["Reset Frequency"] ?? DBNull.Value);
                                bool hasPosition;
                                cmd.Parameters.AddWithValue("@HasPosition",
                                    bool.TryParse(item["Has Position"]?.ToString() ?? "false", out hasPosition) ? (object)hasPosition : DBNull.Value);

                                cmd.Parameters.AddWithValue("@MacaulayDuration", item["Macaulay Duration"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@Volatility30D", item["30D Volatility"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@Volatility90D", item["90D Volatility"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@Convexity", item["Convexity"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@AverageVolume30D", item["30Day Average Volume"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFAssetClass", item["PF Asset Class"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFCountry", item["PF Country"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFCreditRating", item["PF Credit Rating"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFCurrency", item["PF Currency"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFInstrument", item["PF Instrument"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFLiquidityProfile", item["PF Liquidity Profile"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFMaturity", item["PF Maturity"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFNAICSCode", item["PF NAICS Code"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFRegion", item["PF Region"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFSector", item["PF Sector"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFSubAssetClass", item["PF Sub Asset Class"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@BloombergIndustryGroup", item["Bloomberg Industry Group"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@BloombergIndustrySubGroup", item["Bloomberg Industry Sub Group"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@BloombergIndustrySector", item["Bloomberg Industry Sector"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@CountryOfIssuance", item["Country of Issuance"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@IssueCurrency", item["Issue Currency"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@Issuer", item["Issuer"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@RiskCurrency", item["Risk Currency"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PutDate",
                                        DateTime.TryParseExact(item["Put Date"]?.ToString(), dateFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate) ? (object)parsedDate : DBNull.Value); 
                                cmd.Parameters.AddWithValue("@PutPrice", item["Put Price"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@AskPrice", item["Ask Price"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@HighPrice", item["High Price"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@LowPrice", item["Low Price"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@OpenPrice", item["Open Price"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@Volume", item["Volume"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@BidPrice", item["Bid Price"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@LastPrice", item["Last Price"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@CallDate",
                                       DateTime.TryParseExact(item["Call Date"]?.ToString(), dateFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate) ? (object)parsedDate : DBNull.Value); 
                                cmd.Parameters.AddWithValue("@CallPrice", item["Call Price"] ?? DBNull.Value);

                                
                                cmd.ExecuteNonQuery();
                            }


                          
                          
                        }
                    }
                }
                _logger.LogInformation("Bond Data Transferred from CSV to SQL SERVER");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return $"Error: {ex.Message}";
            }

            return "Success";

           
        }
        public object CountActiveSecurities()
        {
            int activeCount = 0;
            int inActiveCount = 0;

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                using (SqlCommand cmd = new SqlCommand("BondsStatusCount", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            activeCount = (reader.GetInt32(reader.GetOrdinal("active_bond_count")));
                            inActiveCount = (reader.GetInt32(reader.GetOrdinal("inactive_bond_count")));
                        }
                    }
                    conn.Close();
                }
                _logger.LogInformation("Active Securities Counts was feteched");
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error counting active securities: " + ex.Message);
                _logger.LogError(ex.Message);
                throw;
            }

            return new { activeCount, inActiveCount };
        }
        public void SoftDeleteBond(int sid)
        {

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                using (SqlCommand cmd = new SqlCommand("SoftDeleteSecurity", conn))
                {
                    conn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@security_id", sid);
                    int a = cmd.ExecuteNonQuery();
                    if (a > 0) Console.WriteLine("Record Soft Deleted Successfully");
                    else Console.WriteLine("Not successfull");
                    conn.Close();
                }
                _logger.LogInformation($"Bond with SID {sid} was Disabled");
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error updating Bond Data " + ex.Message);
                _logger.LogError(ex.Message);   
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public void UpdateBondData(int sid, BondWithUpdateProps bond)
        {

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                using (SqlCommand cmd = new SqlCommand("UpdateBond", conn))
                {
                    conn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@security_id", sid);
                    cmd.Parameters.AddWithValue("@description", bond.Description);
                    cmd.Parameters.AddWithValue("@coupon_rate", bond.CouponRate);
                    cmd.Parameters.AddWithValue("@is_callable", bond.IsCallable);
                    cmd.Parameters.AddWithValue("@penultimate_cpn_date", bond.PenultimateCouponDate);
                    cmd.Parameters.AddWithValue("@pf_credit_rating", bond.PfCreditRating);
                    cmd.Parameters.AddWithValue("@ask_price", bond.AskPrice);
                    cmd.Parameters.AddWithValue("@bid_price", bond.BidPrice);
                    int a = cmd.ExecuteNonQuery();
                    if (a > 0) Console.WriteLine("Record Updated Successfully");
                    else Console.WriteLine("Not successfull");
                    conn.Close();
                }
                _logger.LogInformation($"Bond with SID {sid} was Updated");
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error updating Bond Data " + ex.Message);
                _logger.LogError(ex.Message);
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                _logger.LogError(ex.Message);
                throw;
            }
        }

    }
}

