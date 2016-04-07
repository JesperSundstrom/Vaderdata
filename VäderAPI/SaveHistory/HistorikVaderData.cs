using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Timers;
using VäderAPI.Models;
using System.Data;
using System.Data.SqlClient;


namespace SaveHistory
{
    public partial class HistorikVaderData : ServiceBase
    {


        Timer timer = new Timer();
        private static string VäderAPIContext = "Data Source=(LocalDB)\v11.0;AttachDbFilename=C:\Users\xjesun26\Documents\GitHub\Vaderdata\VäderAPI\VäderAPI\App_Data\VäderAPIContext-20160318172933.mdf;Integrated Security=True";
        public SqlConnection db = new SqlConnection(VäderAPIContext);

            
            
        public HistorikVaderData()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            //add this line to text file during start of service
            TraceService("start service");

            //handle Elapsed event
            timer.Elapsed += new ElapsedEventHandler(OnElapsedTime);

            //This statement is used to set interval to 1 minute (= 60,000 milliseconds)

            timer.Interval = 60000;

            //enabling the timer
            timer.Enabled = true;


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


        }

        protected override void OnStop()
        {
            timer.Enabled = false;
            TraceService("stopping service");

        }
        private void OnElapsedTime(object source, ElapsedEventArgs e)
        {
            TraceService("Another entry at " + DateTime.Now);
        }
        private void TraceService(string content)
        {

            //set up a filestream
            FileStream fs = new FileStream(@"d:\ScheduledService.txt", FileMode.OpenOrCreate, FileAccess.Write);

            //set up a streamwriter for adding text
            StreamWriter sw = new StreamWriter(fs);

            //find the end of the underlying filestream
            sw.BaseStream.Seek(0, SeekOrigin.End);

            //add the text
            sw.WriteLine(content);
            //add the text to the underlying filestream

            sw.Flush();
            //close the writer
            sw.Close();
        }

    }
}
