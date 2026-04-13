import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

@WebServlet("/books")
public class BookServlet extends HttpServlet {
    
    // Database connection parameters
    private static final String DB_URL = "jdbc:mysql://localhost:3306/ebookshop";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = ""; // Change this to your MySQL password
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        // HTML page header
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head>");
        out.println("<title>E-Bookshop - Book List</title>");
        out.println("<style>");
        out.println("body { font-family: Arial, sans-serif; margin: 40px; background-color: #f5f5f5; }");
        out.println("h1 { color: #333; text-align: center; }");
        out.println("table { width: 100%; border-collapse: collapse; background-color: white; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }");
        out.println("th { background-color: #4CAF50; color: white; padding: 15px; text-align: left; }");
        out.println("td { padding: 12px 15px; border-bottom: 1px solid #ddd; }");
        out.println("tr:hover { background-color: #f1f1f1; }");
        out.println(".container { max-width: 1000px; margin: 0 auto; }");
        out.println("</style>");
        out.println("</head>");
        out.println("<body>");
        out.println("<div class='container'>");
        out.println("<h1>📚 E-Bookshop - Available Books</h1>");
        
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        
        try {
            // Load MySQL JDBC Driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            
            // Establish connection
            conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            
            // Create statement and execute query
            stmt = conn.createStatement();
            String sql = "SELECT book_id, book_title, book_author, book_price, quantity FROM books";
            rs = stmt.executeQuery(sql);
            
            // Create HTML table
            out.println("<table>");
            out.println("<tr>");
            out.println("<th>Book ID</th>");
            out.println("<th>Title</th>");
            out.println("<th>Author</th>");
            out.println("<th>Price (₹)</th>");
            out.println("<th>Quantity</th>");
            out.println("</tr>");
            
            // Display each book record
            while (rs.next()) {
                int bookId = rs.getInt("book_id");
                String title = rs.getString("book_title");
                String author = rs.getString("book_author");
                double price = rs.getDouble("book_price");
                int quantity = rs.getInt("quantity");
                
                out.println("<tr>");
                out.println("<td>" + bookId + "</td>");
                out.println("<td>" + title + "</td>");
                out.println("<td>" + author + "</td>");
                out.println("<td>₹" + price + "</td>");
                out.println("<td>" + quantity + "</td>");
                out.println("</tr>");
            }
            
            out.println("</table>");
            out.println("<p style='text-align:center; color:#666; margin-top:20px;'>Total books retrieved from database</p>");
            
        } catch (ClassNotFoundException e) {
            out.println("<p style='color:red;'>Error: MySQL JDBC Driver not found!</p>");
            out.println("<p>" + e.getMessage() + "</p>");
        } catch (SQLException e) {
            out.println("<p style='color:red;'>Database Error!</p>");
            out.println("<p>" + e.getMessage() + "</p>");
        } finally {
            // Close resources
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                out.println("<p style='color:red;'>Error closing connection: " + e.getMessage() + "</p>");
            }
        }
        
        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}
