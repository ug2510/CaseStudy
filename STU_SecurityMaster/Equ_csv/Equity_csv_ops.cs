using CsvHelper.Configuration;
using CsvHelper;
using System.Globalization;
using ChoETL;
using System.Data.SqlClient;

namespace STU_SecurityMaster.Equ_csv
{
    public class Equity_csv_ops:IEquity
    {
        public string FetchDataFromCSV(string path)
        {

            string connectionString = "Server=192.168.0.13\\sqlexpress,49753;Database=STU_SecurityMaster;User Id=sa;Password=sa@12345678;TrustServerCertificate=True";

            // Read CSV file using ChoCSVReader
            try
            {
                using (var reader = new ChoCSVReader(path).WithFirstLineHeader())
                {
                    using (SqlConnection conn = new SqlConnection(connectionString))
                    {
                        conn.Open();

                        // Iterate through each record in the CSV file
                        foreach (dynamic item in reader)
                        {
                            using (SqlCommand cmd = new SqlCommand("InsertEquityCsvData", conn))
                            {
                                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                                // Add parameters for each column from CSV to the stored procedure
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

                                // Execute the stored procedure
                                cmd.ExecuteNonQuery();
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }

            return "Success";

            //string _connectionString = "Server = 192.168.0.13\\\\\\\\sqlexpress,49753 ;DataBase = STU_SecurityMaster ; User Id = sa;Password =sa@12345678;TrustServerCertificate = True";



            //using (var reader = new ChoCSVReader("C:\\Users\\spbhuva\\Downloads\\Data for securities.xlsx - Equities.csv").WithFirstLineHeader())
            //{
            //    foreach (dynamic item in reader)
            //    {
            //        Console.WriteLine(item["Security Name"]);
            //    }

            //}
            //return "success";
        }
    }
    }

