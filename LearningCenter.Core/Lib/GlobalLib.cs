using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using Microsoft.Office;
using Microsoft.Office.Interop.Word;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using LearningCenter.Utility.GlobalUtilities;
using System.Diagnostics.CodeAnalysis;



namespace LearningCenter.Core.Lib
{
    [ExcludeFromCodeCoverage]
    public class GlobalLib
    {
        /// <summary>
        /// upload picture on server
        /// </summary>
        /// <param name="postedFile"></param>
        /// <param name="path"></param>
        /// <returns>return uploaded file name in guid</returns>
        public string UploadPictures(HttpPostedFile postedFile, string path)
        {
            
            // map path to directory in which images to be saved on server.
            string savepath = HttpContext.Current.Server.MapPath(path);
            string filename = postedFile.FileName;

            //Check for existance of directory. if not then create it.
            if (!Directory.Exists(savepath))
                Directory.CreateDirectory(savepath);

            // Create new GUID to rename file.
            var guid = Guid.NewGuid().ToString();
           

            //rename file with new GUID.
            string newFilename = guid + Path.GetExtension(filename);
            // map physical path on server in which images to be saved with new name.
            string physicalPath = Path.Combine(savepath, newFilename);
            postedFile.SaveAs(physicalPath);
            string fileExtensions = Path.GetExtension(physicalPath);
            if (fileExtensions == ".doc" || fileExtensions == ".docx" || fileExtensions == ".txt" || fileExtensions == ".pdf")
            {

                string fileName = ConvertTextFileIntoHtml(physicalPath, path);
                return fileName;

            }
          
            //Return url of image.
            return string.Concat(path, newFilename);
              

        }

        ///// <summary>
        ///// generate html file and upload it in server
        ///// </summary>
        ///// <param name="data"></param>
        ///// <param name="path"></param>
        ///// <returns>uploaded html file name in guid </returns>
        //public string GenerateHtmlAndUploadIt(string data, string path)
        //{
        //    try { 
        //    string TextFileGUID = string.Empty;
        //    if (data != null)
        //    {
        //        TextFileGUID = Guid.NewGuid().ToString() + ".html";
        //        var filePath = HttpContext.Current.Server.MapPath(path);
        //        if (!Directory.Exists(filePath))
        //            Directory.CreateDirectory(filePath);
        //        filePath = filePath + "\\" + TextFileGUID;
        //        StringBuilder sbText = new StringBuilder();
        //        string strTextContent = string.Empty;
        //        strTextContent = data;
        //        using (FileStream fst = new FileStream(filePath, FileMode.Create, FileAccess.Write))
        //        {
        //            using (StreamWriter writer = new StreamWriter(fst))
        //            {
        //                writer.AutoFlush = true;
        //                sbText.Append(strTextContent);
        //                writer.Write(sbText.ToString().Trim());
        //                long lentgh = fst.Length;
        //                decimal size = (decimal)(lentgh * 0.0009765625);
                       
        //                writer.Close();
        //            }
        //        }

                

        //    }
        //    return TextFileGUID;
        //}
        //    catch(Exception ex)
        //    {
        //        GlobalUtil.HandleAndLogException(ex, this);
        //        throw;

        //    }
        //}


        /// <summary>
        /// convert text file into html
        /// </summary>
        /// <param name="sourceFile"></param>
        /// <param name="path"></param>
        /// <returns>converted html file name in guid</returns>
        public string ConvertTextFileIntoHtml(string sourceFile, string path)
        {


            var textFileGUID = Guid.NewGuid().ToString() + ".html";
            var targetPath = Path.Combine(path, textFileGUID);
           
            //Creating the instance of Word Application
            Microsoft.Office.Interop.Word.Application newApp = new Microsoft.Office.Interop.Word.Application(); 
            // specifying the Source & Target file names
            object Source = sourceFile;
            object Target = HttpContext.Current.Server.MapPath(targetPath);
            object Unknown = Type.Missing;
           

            // Source document open here
            // Additional Parameters are not known so that are  
            // set as a missing type
            newApp.Documents.Open(ref Source, ref Unknown,
                     ref Unknown, ref Unknown, ref Unknown,
                     ref Unknown, ref Unknown, ref Unknown,
                     ref Unknown, ref Unknown, ref Unknown,
                     ref Unknown, ref Unknown, ref Unknown, ref Unknown);

          
            // Specifying the format in which you want the output file 
            object format = Microsoft.Office.Interop.Word.WdSaveFormat.wdFormatHTML;


            //Changing the format of the document
            newApp.ActiveDocument.SaveAs(ref Target, ref format,
                       ref Unknown, ref Unknown, ref Unknown,
                       ref Unknown, ref Unknown, ref Unknown,
                       ref Unknown, ref Unknown, ref Unknown,
                       ref Unknown, ref Unknown, ref Unknown,
                       ref Unknown, ref Unknown);

            newApp.Quit(ref Unknown, ref Unknown, ref Unknown);
            //Return url of image.
            return string.Concat(path, textFileGUID);

        }

       
    }
}
