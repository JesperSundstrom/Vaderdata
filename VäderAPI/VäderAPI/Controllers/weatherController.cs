﻿using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using VäderAPI.Models;

namespace VäderAPI.Controllers
{
    public class weatherController : ApiController
    {


        // GET: api/weather       

        public VäderAPIContext db = new VäderAPIContext();

        public IEnumerable<weather> Get(int value)
        {

                var db = new VäderAPIContext();

           
                return db.weathers.ToList().OrderByDescending(x => x.Id).Take(value).Reverse();


            
        }
        public IEnumerable<weather> UpdateDatabase()
        {
            var db = new VäderAPIContext();
            HtmlDocument page = new HtmlWeb().Load("http://83.255.197.77/");

            var windSpeed = page.DocumentNode.SelectSingleNode("//p[@id='windSpeed']").InnerText;
            var windDirection = page.DocumentNode.SelectSingleNode("//p[@id='windDirection']").InnerText;
            var gustSpeed = page.DocumentNode.SelectSingleNode("//p[@id='gustSpeed']").InnerText;
            var airTemp = page.DocumentNode.SelectSingleNode("//p[@id='airTemp']").InnerText;
            var waterTemp = page.DocumentNode.SelectSingleNode("//p[@id='water']").InnerText;
            var battery = page.DocumentNode.SelectSingleNode("//p[@id='battery']").InnerText;
            var latestUpdate = page.DocumentNode.SelectSingleNode("//p[@id='latestUpdate']").InnerText;

            windSpeed = windSpeed.Remove(windSpeed.Length - 5);
            windDirection = windDirection.Remove(windDirection.Length - 6);
            gustSpeed = gustSpeed.Remove(gustSpeed.Length - 5);
            airTemp = airTemp.Remove(airTemp.Length - 7);
            waterTemp = waterTemp.Remove(waterTemp.Length - 8);
            battery = battery.Remove(battery.Length - 3);
            db.weathers.Add(new weather
            {
                windSpeed = windSpeed,
                windDirection = windDirection,
                airTemp = airTemp,
                battery = battery,
                gustSpeed = gustSpeed,
                lastUpdate = latestUpdate,
                waterTemp = waterTemp
            });
            db.SaveChanges();


            
            return db.weathers.ToList();
        }

        // GET: api/weather/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/weather
        public void Post(string value)
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
