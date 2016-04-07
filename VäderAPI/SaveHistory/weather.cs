using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VäderAPI.Models
{
    public class weather
    {
        public int Id { get; set; }

        public string windSpeed { get; set; }

        public string windDirection { get; set; }

        public string gustSpeed { get; set; }

        public string airTemp { get; set; }

        public string waterTemp { get; set; }

        public string battery { get; set; }

        public string lastUpdate { get; set; }

    }
}