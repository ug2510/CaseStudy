using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;

namespace CaseStudy_2.Repo
{
    public class HolidayRepo
    {
        private readonly string _connectionString;
        private readonly string _filePath;
        private readonly char _delimiter;

        public HolidayRepo(string connectionString, string filePath, char delimiter)
        {
            _connectionString = connectionString;
            _filePath = filePath;
            _delimiter = delimiter;
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
                while ((line = reader.ReadLine()) != null)
                {
                    if (string.IsNullOrWhiteSpace(line)) continue;

                    string[] fields = line.Split(_delimiter);

                    if (fields.Length == 2 && !string.IsNullOrWhiteSpace(fields[0]) && !string.IsNullOrWhiteSpace(fields[1]))
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

                        // Assuming row[0] is HolidayDate and row[1] is HolidayDescription
                        command.Parameters.AddWithValue("@HolidayDate", row[0]);
                        command.Parameters.AddWithValue("@HolidayDescription", row[1]);

                        // Execute the stored procedure
                        command.ExecuteNonQuery();
                    }
                }
            }
        }
    }
}
