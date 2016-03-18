using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VäderAPI.Models;

namespace VäderAPI.Controllers
{
    public class WeathersController : ApiController
    {
        weather[] Weather = new weather[] 
        { 


            new weather { Id = 1, windSpeed = "Tomato Soup", windDirection = "Groceries"}
        };


        public IEnumerable<weather> GetAllProducts()
        {
            return Weather;
        }

        public IHttpActionResult GetProduct(int id)
        {
            var product = Weather.FirstOrDefault((p) => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
    }
}