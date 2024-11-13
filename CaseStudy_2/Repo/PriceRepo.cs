using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

            // Method to load file and insert data into the database using the stored procedure
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
                    bool isFirstLine = true;
                    string line;

                    while ((line = reader.ReadLine()) != null)
                    {
                        if (isFirstLine)
                        {
                            isFirstLine = false; // Skip the header row
                            continue;
                        }

                        if (string.IsNullOrWhiteSpace(line)) continue;

                        string[] fields = line.Split(_delimiter);

                        // Ensure the file has exactly 8 columns (or adjust based on your file structure)
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

                            command.Parameters.AddWithValue("@Date", row[0]);
                            command.Parameters.AddWithValue("@Open", row[1]);
                            command.Parameters.AddWithValue("@High", row[2]);
                            command.Parameters.AddWithValue("@Low", row[3]);
                            command.Parameters.AddWithValue("@Close", row[4]);
                            command.Parameters.AddWithValue("@Adj_Close", row[5]);
                            command.Parameters.AddWithValue("@Volume", row[6]);
                            command.Parameters.AddWithValue("@Ticker", row[7]);

                            command.ExecuteNonQuery();
                        }
                    }
                }
            }
        }
    }

