//using CsvHelper;
//using DataAccess;
//using DataAccess.Data;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Data.SqlClient;
//using System.Data;
//using System.Globalization;
//using CsvHelper.Configuration;
//namespace STU_SecurityMaster.Equity_csv
//{
//    public class Equity_csv_operations : IEquity_csv
//    {
    
//        public async List<List<string>> FetchDataFromCSV(string path)
//        {
//            var result = new List<List<string>>();

//            try
//            {
//                using (var reader = new StreamReader(path))
//                using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
//                {
//                    var records = csv.GetRecords<dynamic>().ToList();

//                    foreach (var record in records)
//                    {
//                        var row = record as IDictionary<string, object>;
//                        var rowValues = row?.Values.Select(value => value.ToString()).ToList();
//                        result.Add(rowValues);

//                    }
                    
//                }
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"Error reading file: {ex.Message}");
//            }

//            return result;
//        }
//    }
//    }
