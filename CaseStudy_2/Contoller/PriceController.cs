﻿using CaseStudy_2.Repo;
using System;

namespace CaseStudy_2.Controller
{
    public class PriceController
    {
        private readonly PriceRepo _pricesRepo;

        public PriceController(PriceRepo pricesRepo)
        {
            _pricesRepo = pricesRepo;
        }

        // Load data from file and insert into the database
        public void LoadFileToDatabase()
        {
            try
            {
                // Call the method in PriceRepo that performs bulk insert
                _pricesRepo.LoadFileAndInsertData();

                Console.WriteLine("SP500 prices data successfully loaded into the database.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
        }
    }
}
