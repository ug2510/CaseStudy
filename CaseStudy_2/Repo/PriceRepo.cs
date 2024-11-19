using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;

namespace CaseStudy_2.Repo
{
    public class PriceRepo
    {
        private readonly string _connectionString;
        private readonly string _filePath;
        private readonly char _delimiter;

        public PriceRepo(string connectionString, string filePath, char delimiter = ',')
        {
            _connectionString = connectionString;
            _filePath = filePath;
            _delimiter = delimiter;
        }

        public void LoadFileAndInsertData()
        {
            var data = LoadFile();
            BulkInsertData(data);
        }

        private List<string[]> LoadFile()
        {
            var data = new List<string[]>();

            using (var reader = new StreamReader(_filePath))
            {
                bool isFirstLine = true;
                string line;

                while ((line = reader.ReadLine()) != null)
                {
                    if (isFirstLine)
                    {
                        isFirstLine = false; 
                        continue;
                    }

                    if (string.IsNullOrWhiteSpace(line)) continue;

                    string[] fields = line.Split(_delimiter);

                    // Ensure the file has exactly 8 columns 
                    if (fields.Length == 8)
                    {
                        data.Add(fields);
                    }
                    else
                    {
                        Console.WriteLine($"Skipping invalid line: {line}");
                    }
                }
            }

            return data;
        }

        private void BulkInsertData(List<string[]> data)
        {
            DataTable dataTable = new DataTable();
            dataTable.Columns.Add("Date", typeof(string));       
            dataTable.Columns.Add("Open", typeof(string));
            dataTable.Columns.Add("High", typeof(string));
            dataTable.Columns.Add("Low", typeof(string));
            dataTable.Columns.Add("Close", typeof(string));
            dataTable.Columns.Add("Adj_Close", typeof(string));
            dataTable.Columns.Add("Volume", typeof(string));
            dataTable.Columns.Add("Ticker", typeof(string));

            // Add rows to the DataTable
            foreach (var row in data)
            {
                dataTable.Rows.Add(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7]);
            }

            // Perform the bulk insert using SqlBulkCopy
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                using (SqlBulkCopy bulkCopy = new SqlBulkCopy(connection))
                {
                    bulkCopy.DestinationTableName = "Staging_SP500_Prices"; 

                    
                    bulkCopy.ColumnMappings.Add("Date", "Date");
                    bulkCopy.ColumnMappings.Add("Open", "Open");
                    bulkCopy.ColumnMappings.Add("High", "High");
                    bulkCopy.ColumnMappings.Add("Low", "Low");
                    bulkCopy.ColumnMappings.Add("Close", "Close");
                    bulkCopy.ColumnMappings.Add("Adj_Close", "Adj_Close");
                    bulkCopy.ColumnMappings.Add("Volume", "Volume");
                    bulkCopy.ColumnMappings.Add("Ticker", "Ticker");

                 
                    bulkCopy.WriteToServer(dataTable);
                }
            }
        }
    }
}


