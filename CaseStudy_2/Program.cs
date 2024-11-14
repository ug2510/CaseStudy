using CaseStudy_2.Repo;
using CaseStudy_2.Controller;
using CaseStudy_2.Contoller;

namespace CaseStudy_2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //string filePath = @"C:\Users\uagaundalkar\Downloads\Holidays2021.txt"; 
            //char delimiter = '\t'; 
            //string connectionString = @"Server= 192.168.0.13\sqlexpress,49753; Database= STU_SecurityMaster; User Id= sa; Password= sa@12345678; TrustServerCertificate= True"; // Database connection string

            //HolidayRepo fileToDatabaseAdapter = new HolidayRepo(connectionString, filePath, delimiter);

            //FileToDatabaseController controller = new FileToDatabaseController(fileToDatabaseAdapter);
            //string storedProcedureName = "InsertStagingHoliday"; 
            //controller.LoadFileToDatabase(storedProcedureName);

            //string filePath = @"C:\Users\uagaundalkar\Downloads\S_P500 constituents.xlsx - S&P500 constituents.csv"; // Path to the file
            //char delimiter = ','; // Use tab as delimiter
            //string connectionString = @"Server= 192.168.0.13\sqlexpress,49753; Database= STU_SecurityMaster; User Id= sa; Password= sa@12345678; TrustServerCertificate= True"; // Your connection string

            //ConstituentsRepo constituencyRepo = new ConstituentsRepo(connectionString, filePath, delimiter);

            //// Instantiate the controller with the ConstituencyRepo
            //ConstituentsController controller = new ConstituentsController(constituencyRepo);

            //// Call the method to load data and insert it using the specified stored procedure
            //controller.LoadFileToDatabase("InsertStagingConstituent");

            //Console.WriteLine("Constituency data loading process is complete.");

            string filePath = @"C:\Users\uagaundalkar\Downloads\SP - 20201231-20211231 S_P 500 Prices.csv";
            char delimiter = ',';
            string connectionString = @"Server=192.168.0.13\sqlexpress,49753; Database=STU_SecurityMaster; User Id=sa; Password=sa@12345678; TrustServerCertificate=True";

            PriceRepo pricesRepo = new PriceRepo(connectionString, filePath, delimiter);

            PriceController controller = new PriceController(pricesRepo);

            controller.LoadFileToDatabase("InsertSP500Prices");

            Console.WriteLine("SP500 prices data loading process is complete.");


        }
    }
}
