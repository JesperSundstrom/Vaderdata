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
    


        public IEnumerable<weather> Get()
        {
            HtmlDocument page = new HtmlWeb().Load("http://83.255.197.77/");

            var windSpeed = page.DocumentNode.SelectSingleNode("//p[@id='windSpeed']");
            var windDirection = page.DocumentNode.SelectSingleNode("//p[@id='windDirection']");
            var gustSpeed = page.DocumentNode.SelectSingleNode("//p[@id='gustSpeed']");
            var airTemp = page.DocumentNode.SelectSingleNode("//p[@id='airTemp']");


            string windSpeedValue = windSpeed.InnerText;

            weather[] Weather = new weather[] 
        { 
            new weather { Id = 1, windSpeed = windSpeedValue, windDirection = "Groceries"}
        };


            return Weather;
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
