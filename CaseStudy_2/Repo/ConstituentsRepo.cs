using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Text;

namespace CaseStudy_2.Repo
{
    public class ConstituentsRepo
    {
        private readonly string _connectionString;
        private readonly string _filePath;
        private readonly char _delimiter;

        public ConstituentsRepo(string connectionString, string filePath, char delimiter = ',')
        {
            _connectionString = connectionString;
            _filePath = filePath;
            _delimiter = delimiter; // Default delimiter is ',' for CSV
        }

        public void LoadFileAndInsertData(string storedProcedureName)
        {
            var data = LoadFile();
            InsertDataUsingStoredProcedure(storedProcedureName, data);
        }

        private List<string[]> LoadFile()
        {
            var data = new List<string[]>();

            using (var reader = new StreamReader(_filePath))
            {
                string line;

                bool isFirstLine = true;

                while ((line = reader.ReadLine()) != null)
                {
                    if (string.IsNullOrWhiteSpace(line)) continue;

                    if (isFirstLine)
                    {
                        isFirstLine = false;
                        continue;
                    }

                    string[] fields = ParseCsvLine(line);

                    if (fields.Length == 8 && !string.IsNullOrWhiteSpace(fields[0]) && !string.IsNullOrWhiteSpace(fields[1]))
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

        private string[] ParseCsvLine(string line)
        {
            var values = new List<string>();
            bool insideQuote = false;
            StringBuilder currentValue = new StringBuilder();

            for (int i = 0; i < line.Length; i++)
            {
                char currentChar = line[i];

                if (currentChar == '"')
                {
                    insideQuote = !insideQuote;
                }
                else if (currentChar == _delimiter && !insideQuote)
                {
                    values.Add(currentValue.ToString());
                    currentValue.Clear();
                }
                else
                {
                    currentValue.Append(currentChar);
                }
            }

            values.Add(currentValue.ToString());

            return values.ToArray();
        }

        private void InsertDataUsingStoredProcedure(string storedProcedureName, List<string[]> data)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                foreach (var row in data)
                {
                    using (SqlCommand command = new SqlCommand(storedProcedureName, connection))
                    {
                        command.CommandType = System.Data.CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@Symbol", row[0]);  
                        command.Parameters.AddWithValue("@Security", row[1]); 
                        command.Parameters.AddWithValue("@GICS_Sector", row[2]);
                        command.Parameters.AddWithValue("@GICS_Sub_Industry", row[3]); 
                        command.Parameters.AddWithValue("@Headquarters_Location", row[4]);
                        command.Parameters.AddWithValue("@Date_first_added", row[5]); 
                        command.Parameters.AddWithValue("@CIK", row[6]); 
                        command.Parameters.AddWithValue("@Founded", row[7]); 

                        command.ExecuteNonQuery();
                    }
                }
            }
        }
    }
}
