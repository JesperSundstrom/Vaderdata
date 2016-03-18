using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VäderAPI.Models;

namespace VäderAPI.Controllers
{
    public class weatherController : ApiController
    {
        // GET: api/weather       
        weather[] Weather = new weather[] 
        { 


            new weather { Id = 1, windSpeed = "Tomato Soup", windDirection = "Groceries"}
        };



        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };

        }

        // GET: api/weather/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/weather
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/weather/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/weather/5
        public void Delete(int id)
        {
        }
    }
}
