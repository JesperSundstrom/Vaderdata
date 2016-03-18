using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HtmlAgilityPack;

namespace VäderAPI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            HtmlDocument page = new HtmlWeb().Load("http://83.255.197.77/");

            var windSpeed = page.DocumentNode.SelectSingleNode("//p[@id='windSpeed']");
            string windSpeedValue = windSpeed.InnerText;
            ViewData["windSpeed"] = windSpeedValue;

            



            return View();
        }
    }
}
