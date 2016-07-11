using Moq;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;




namespace LearningCenter.Test.MockObjects
{
   public static class MvcMockHelpers
    {
       public static HttpContextBase FakeHttpContext()
       {
           var context = new Mock<HttpContextBase>();
           var request = new Mock<HttpRequestBase>();
           var response = new Mock<HttpResponseBase>();
           var server = new Mock<HttpServerUtilityBase>();


           context.Setup(ctx => ctx.Request).Returns(request.Object);
           context.Setup(ctx => ctx.Response).Returns(response.Object);

           context.Setup(ctx => ctx.Server).Returns(server.Object);

           return context.Object;
       }
    }
}
