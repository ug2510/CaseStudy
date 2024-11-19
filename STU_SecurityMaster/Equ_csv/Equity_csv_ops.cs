using CsvHelper.Configuration;
using CsvHelper;
using System.Globalization;
using ChoETL;
using System.Data.SqlClient;
using System.Data;
using System.Data.Common;
using Model;
using STU_SecurityMaster.Bonds_csv;
using System.Configuration;

namespace STU_SecurityMaster.Equ_csv
{
    public class Equity_csv_ops : IEquity
    {
        private readonly ILogger<Equity_csv_ops> _logger;
        private readonly string _connectionString;
        public Equity_csv_ops(ILogger<Equity_csv_ops> logger, IConfiguration configuration)
            {
            _logger = logger;
            _connectionString = configuration.GetConnectionString("IVPConn");
        }

      
       
        public string FetchDataFromCSV(string path)
        {
            try
            {
                using (var reader = new ChoCSVReader(path).WithFirstLineHeader())
                {
                    using (SqlConnection conn = new SqlConnection(_connectionString))
                    {
                        conn.Open();

                     
                        foreach (dynamic item in reader)
                        {
                            using (SqlCommand cmd = new SqlCommand("InsertEquityCsvData", conn))
                            {
                                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                               
                                cmd.Parameters.AddWithValue("@SecurityName", item["Security Name"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@SecurityDescription", item["Security Description"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@HasPosition", item["Has Position"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@IsActiveSecurity", item["Is Active Security"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@LotSize", item["Lot Size"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@BBGUniqueName", item["BBG Unique Name"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@CUSIP", item["CUSIP"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@ISIN", item["ISIN"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@SEDOL", item["SEDOL"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@BloombergTicker", item["Bloomberg Ticker"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@BloombergUniqueID", item["Bloomberg Unique ID"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@BBGGlobalID", item["BBG Global ID"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@TickerAndExchange", item["Ticker and Exchange"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@IsADRFlag", item["Is ADR Flag"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@ADRUnderlyingTicker", item["ADR Underlying Ticker"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@ADRUnderlyingCurrency", item["ADR Underlying Currency"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@SharesPerADR", item["Shares Per ADR"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@IPODate", item["IPO Date"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PricingCurrency", item["Pricing Currency"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@SettleDays", item["Settle Days"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@TotalSharesOutstanding", item["Total Shares Outstanding"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@VotingRightsPerShare", item["Voting Rights Per Share"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@AverageVolume20D", item["Average Volume - 20D"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@Beta", item["Beta"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@ShortInterest", item["Short Interest"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@ReturnYTD", item["Return - YTD"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@Volatility90D", item["Volatility - 90D"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFAssetClass", item["PF Asset Class"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFCountry", item["PF Country"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFCreditRating", item["PF Credit Rating"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFCurrency", item["PF Currency"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFInstrument", item["PF Instrument"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFLiquidityProfile", item["PF Liquidity Profile"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFMaturity", item["PF Maturity"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFNAICCode", item["PF NAICS Code"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFRegion", item["PF Region"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFSector", item["PF Sector"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PFSubAssetClass", item["PF Sub Asset Class"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@CountryOfIssuance", item["Country of Issuance"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@Exchange", item["Exchange"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@Issuer", item["Issuer"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@IssueCurrency", item["Issue Currency"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@TradingCurrency", item["Trading Currency"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@BBGIndustrySubGroup", item["BBG Industry Sub Group"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@BloombergIndustryGroup", item["Bloomberg Industry Group"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@BloombergSector", item["Bloomberg Sector"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@CountryOfIncorporation", item["Country of Incorporation"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@RiskCurrency", item["Risk Currency"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@OpenPrice", item["Open Price"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@ClosePrice", item["Close Price"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@Volume", item["Volume"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@LastPrice", item["Last Price"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@AskPrice", item["Ask Price"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@BidPrice", item["Bid Price"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@PERatio", item["PE Ratio"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@DividendDeclaredDate", item["Dividend Declared Date"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@DividendExDate", item["Dividend Ex Date"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@DividendRecordDate", item["Dividend Record Date"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@DividendPayDate", item["Dividend Pay Date"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@DividendAmount", item["Dividend Amount"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@Frequency", item["Frequency"] ?? DBNull.Value);
                                cmd.Parameters.AddWithValue("@DividendType", item["Dividend Type"] ?? DBNull.Value);

                               
                                cmd.ExecuteNonQuery();
                            }
                        }
                    }
                }
                _logger.LogInformation("Equity Data was transferred from CSV to SQL SERVER");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return $"Error: {ex.Message}";
            }

            return "Success";

            
        }

        public dynamic FetchEquityDataFromDbbyID(int sid)
        {
            SqlConnection conn;
            SqlCommand cmd;
            SqlDataAdapter da;

            try
            {
                conn = new SqlConnection(_connectionString);
                cmd = new SqlCommand("GetEquityDataBySID", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@SID", SqlDbType.Int));
                cmd.Parameters["@SID"].Value = sid;

                da = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                
                DataTable dt = ds.Tables[0];
                _logger.LogInformation($"Equity Data with SID {sid} was fetched");

                return dt;
            }
            catch (SqlException sqlerror)
            {
                Console.WriteLine("Cannot get Equity details " + sqlerror.Message);
                _logger.LogError(sqlerror.Message);
                return sqlerror.Message;
            }
        }
        public dynamic FetchEquitySector()
        {
            SqlConnection conn;
            SqlCommand cmd;
            SqlDataAdapter da;
            try
            {
                conn = new SqlConnection(_connectionString);
                cmd = new SqlCommand("EquitySectors", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                da = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                DataTable dt = ds.Tables[0];

                _logger.LogInformation("Equity Sector data Was Fetched");
                return dt;

            }
            catch (SqlException sqlerror)
            {
                Console.WriteLine("Cannot get Equity details " + sqlerror.Message);
                _logger.LogError(sqlerror.Message);
                return sqlerror.Message;
            }
        

        }
        public dynamic FetchEquityDataFromDb()
        {
            SqlConnection conn;
            SqlCommand cmd;
            SqlDataAdapter da;
            try
            {
                conn = new SqlConnection(_connectionString);
                cmd = new SqlCommand("GetAllEquityData", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                da = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                DataTable dt = ds.Tables[0];
     
                _logger.LogInformation("ALl Equity Data Was Fetched");
                return dt;
            }
            catch (SqlException sqlerror)
            {
                Console.WriteLine("Cannot get Equity details " + sqlerror.Message);
                _logger.LogError(sqlerror.Message); 
                return sqlerror.Message;
            }
        }
        public object CountActiveSecurities()
        {
            int activeCount = 0;
            int inActiveCount = 0;

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                using (SqlCommand cmd = new SqlCommand("EquitiesStatusCount", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            activeCount= (reader.GetInt32(reader.GetOrdinal("active_equity_count")));
                            inActiveCount =(reader.GetInt32(reader.GetOrdinal("inactive_equity_count")));
                        }
                    }
                    conn.Close();
                }
                _logger.LogInformation("Active Equities count was Fetched");
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error counting active securities: " + ex.Message);
                _logger.LogError(ex.Message);   
                throw;
            }

            return new { activeCount,inActiveCount};
        }

        public void UpdateEquityData(int sid,EquityWithUpdateProps equity)
        {

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                using (SqlCommand cmd = new SqlCommand("UpdateSecurity", conn))
                {
                    conn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@security_id", sid);
                    cmd.Parameters.AddWithValue("@description", equity.Description);
                    cmd.Parameters.AddWithValue("@shares_outs", equity.SharesOutstanding);
                    cmd.Parameters.AddWithValue("@price_curr", equity.PriceCurrency);
                    cmd.Parameters.AddWithValue("@open_price", equity.OpenPrice);
                    cmd.Parameters.AddWithValue("@close_price", equity.ClosePrice);
                    cmd.Parameters.AddWithValue("@div_declared_date", equity.DividendDeclaredDate);
                    cmd.Parameters.AddWithValue("@pf_credit_rating", equity.PFCreditRating);
                    int a = cmd.ExecuteNonQuery();
                    if (a > 0) Console.WriteLine("Record Updated Successfully");
                    else Console.WriteLine("Not successfull");
                    conn.Close();
                }
                _logger.LogInformation($"Equity with SID {sid} was Updated");
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error updating Equity Data " + ex.Message);
                _logger.LogError(ex.Message);
                throw;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                _logger.LogError(ex.Message);

                throw;
            }
        }

        public void SoftDeleteEquity(int sid)
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
                _logger.LogInformation($"Equity with SID {sid} was disabled");
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error updating Equity Data " + ex.Message);
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

