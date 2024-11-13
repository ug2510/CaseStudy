using CaseStudy_2.Repo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaseStudy_2.Contoller
{
    public class ConstituentsController
    {
            private readonly ConstituentsRepo _constituencyRepo;

            public ConstituentsController(ConstituentsRepo constituencyRepo)
            {
                _constituencyRepo = constituencyRepo;
            }

            public void LoadFileToDatabase(string storedProcedureName)
            {
                try
                {
                    _constituencyRepo.LoadFileAndInsertData(storedProcedureName);

                    Console.WriteLine("Constituency data successfully loaded into the database.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred: {ex.Message}");
                }
            }
        }
    }

