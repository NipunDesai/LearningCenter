using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LearningCenter.Core.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if (Request.IsAuthenticated)
            {
                return RedirectToAction("LoginIndex");

            }
            else
            {
                return View();
            }
           
        }

        [Authorize]
        public ActionResult LoginIndex()
        {
            return View();
        }

    }
}