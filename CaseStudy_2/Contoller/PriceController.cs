using CaseStudy_2.Repo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaseStudy_2.Contoller
{
    public class PriceController
    {
            private readonly PriceRepo _pricesRepo;

            public PriceController(PriceRepo pricesRepo)
            {
                _pricesRepo = pricesRepo;
            }

            public void LoadFileToDatabase(string storedProcedureName)
            {
                try
                {
                    _pricesRepo.LoadFileAndInsertData(storedProcedureName);

                    Console.WriteLine("SP500 prices data successfully loaded into the database.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred: {ex.Message}");
                }
            }
        }
    }
