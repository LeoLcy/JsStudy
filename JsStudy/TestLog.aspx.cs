using System;
using Utility.LogHelper;

namespace JsStudy
{
    public partial class TestLog : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            TestLogFunc();
        }

        public void TestLogFunc()
        {
            Log4netHelper.Info("info");
            Log4netHelper.Info("info",new Exception("这是info"));
            Log4netHelper.InfoFormat("info{0}{1}{2}","这个","---","info","test");
            Log4netHelper.Debug("Debug");
            Log4netHelper.Debug("Debug", new Exception("测试debug"));
            Log4netHelper.Fatal("Fatal");
            Log4netHelper.Error("Error");
            Log4netHelper.Warn("Warn");
        }
    }
}