using CaseStudy_2.Repo;
using System;

namespace CaseStudy_2.Controller
{
    public class FileToDatabaseController
    {
        private readonly HolidayRepo _fileToDatabaseAdapter;

        public FileToDatabaseController(HolidayRepo fileToDatabaseAdapter)
        {
            _fileToDatabaseAdapter = fileToDatabaseAdapter;
        }

        public void LoadFileToDatabase(string storedProcedureName)
        {
            try
            {
                _fileToDatabaseAdapter.LoadFileAndInsertData(storedProcedureName);

                Console.WriteLine("Data successfully loaded into the database.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
        }
    }
}
