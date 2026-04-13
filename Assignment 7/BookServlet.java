import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/books")
public class BookServlet extends HttpServlet {

    private static final String DB_URL = "jdbc:mysql://localhost:3307/ebookshop";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        renderPage(request, response, null, null);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");

        String title = trimOrEmpty(request.getParameter("book_title"));
        String author = trimOrEmpty(request.getParameter("book_author"));
        String priceText = trimOrEmpty(request.getParameter("book_price"));
        String quantityText = trimOrEmpty(request.getParameter("quantity"));

        String message;
        String insertedRecordCard = null;

        if (title.isEmpty() || author.isEmpty() || priceText.isEmpty() || quantityText.isEmpty()) {
            message = "Please fill in all fields before adding a book.";
            renderPage(request, response, message, null);
            return;
        }

        try {
            double price = Double.parseDouble(priceText);
            int quantity = Integer.parseInt(quantityText);

            Class.forName("com.mysql.cj.jdbc.Driver");

            try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
                 Statement idStmt = conn.createStatement();
                 ResultSet idRs = idStmt.executeQuery("SELECT COALESCE(MAX(book_id), 0) + 1 AS next_id FROM books");
                 PreparedStatement ps = conn.prepareStatement(
                         "INSERT INTO books (book_id, book_title, book_author, book_price, quantity) VALUES (?, ?, ?, ?, ?)")) {

                int bookId = 1;
                if (idRs.next()) {
                    bookId = idRs.getInt("next_id");
                }

                ps.setInt(1, bookId);
                ps.setString(2, title);
                ps.setString(3, author);
                ps.setDouble(4, price);
                ps.setInt(5, quantity);
                ps.executeUpdate();

                insertedRecordCard = renderInsertedRecordCard(bookId, title, author, price, quantity);
                message = "Book added successfully.";
            }
        } catch (NumberFormatException e) {
            message = "Price must be a number and quantity must be a whole number.";
        } catch (ClassNotFoundException e) {
            message = "Error: MySQL JDBC Driver not found! " + e.getMessage();
        } catch (SQLException e) {
            message = "Database Error: " + e.getMessage();
        }

        renderPage(request, response, message, insertedRecordCard);
    }

    private void renderPage(HttpServletRequest request, HttpServletResponse response, String message, String insertedRow)
            throws IOException {

        response.setContentType("text/html; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();
        String contextPath = request.getContextPath();

        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head>");
        out.println("<meta charset='UTF-8'>");
        out.println("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        out.println("<title>E-Bookshop - Book List</title>");
        out.println("<style>");
        out.println(":root {");
        out.println("  --mint: #CFF5E7;");
        out.println("  --seafoam: #A0E4CB;");
        out.println("  --teal: #59C1BD;");
        out.println("  --navy: #0D4C92;");
        out.println("  --text: #17324d;");
        out.println("  --card: rgba(255,255,255,0.82);");
        out.println("}");
        out.println("* { box-sizing: border-box; }");
        out.println("body { margin: 0; font-family: Arial, sans-serif; color: var(--text); background: linear-gradient(135deg, var(--mint), var(--seafoam), var(--mint)); min-height: 100vh; }");
        out.println(".shell { max-width: 1200px; margin: 0 auto; padding: 32px 20px 48px; }");
        out.println(".hero { background: linear-gradient(135deg, var(--navy), var(--teal)); color: white; border-radius: 24px; padding: 28px; box-shadow: 0 20px 40px rgba(13,76,146,0.18); }");
        out.println(".hero h1 { margin: 0 0 8px; font-size: 2rem; }");
        out.println(".hero p { margin: 0; opacity: 0.95; }");
        out.println(".grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin-top: 20px; }");
        out.println(".panel { background: var(--card); backdrop-filter: blur(10px); border: 1px solid rgba(13,76,146,0.12); border-radius: 20px; padding: 20px; box-shadow: 0 16px 30px rgba(13,76,146,0.10); }");
        out.println(".panel h2 { margin-top: 0; color: var(--navy); }");
        out.println(".message { padding: 14px 16px; border-radius: 14px; font-weight: bold; margin-bottom: 18px; }");
        out.println(".message.success { background: #e8fff6; color: #0c6b4d; border: 1px solid #9fe8cf; }");
        out.println(".message.error { background: #fff0f0; color: #a21b1b; border: 1px solid #f0b3b3; }");
        out.println("form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }");
        out.println("label { display: block; font-size: 0.95rem; font-weight: bold; margin-bottom: 6px; color: var(--navy); }");
        out.println("input { width: 100%; padding: 12px 14px; border-radius: 12px; border: 1px solid rgba(13,76,146,0.18); background: white; font-size: 1rem; }");
        out.println(".full { grid-column: 1 / -1; }");
        out.println(".actions { grid-column: 1 / -1; display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }");
        out.println(".btn { display: inline-block; border: none; border-radius: 999px; padding: 12px 20px; font-size: 1rem; font-weight: bold; cursor: pointer; text-decoration: none; transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease; }");
        out.println(".btn:hover { transform: translateY(-1px); }");
        out.println(".btn-primary { background: var(--navy); color: white; box-shadow: 0 10px 22px rgba(13,76,146,0.22); }");
        out.println(".btn-secondary { background: var(--teal); color: white; box-shadow: 0 10px 22px rgba(89,193,189,0.22); }");
        out.println(".table-wrap { overflow-x: auto; }");
        out.println("table { width: 100%; border-collapse: collapse; background: white; border-radius: 16px; overflow: hidden; }");
        out.println("th, td { padding: 14px 16px; text-align: left; }");
        out.println("th { background: var(--navy); color: white; }");
        out.println("tr:nth-child(even) td { background: rgba(207,245,231,0.45); }");
        out.println("tr:hover td { background: rgba(160,228,203,0.35); }");
        out.println(".added-record { margin: 16px 0 20px; padding: 16px; border-radius: 16px; background: rgba(207,245,231,0.7); border: 1px solid rgba(13,76,146,0.12); }");
        out.println(".added-record h3 { margin: 0 0 10px; color: var(--navy); }");
        out.println(".record-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 18px; }");
        out.println(".record-item { background: rgba(255,255,255,0.75); border-radius: 12px; padding: 10px 12px; }");
        out.println(".record-label { display: block; font-size: 0.8rem; color: rgba(23,50,77,0.8); margin-bottom: 4px; }");
        out.println(".record-value { font-weight: bold; color: var(--navy); }");
        out.println(".toolbar { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 14px; }");
        out.println(".pill { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 999px; background: rgba(89,193,189,0.15); color: var(--navy); font-weight: bold; }");
        out.println("@media (max-width: 720px) { form { grid-template-columns: 1fr; } .hero h1 { font-size: 1.6rem; } }");
        out.println("</style>");
        out.println("</head>");
        out.println("<body>");
        out.println("<div class='shell'>");
        out.println("<section class='hero'>");
        out.println("<h1>&#128218; E-Bookshop</h1>");
        out.println("<p>Add new books, then review the full catalog below.</p>");
        out.println("</section>");

        if (message != null) {
            String cssClass = message.toLowerCase().startsWith("book added successfully") ? "success" : "error";
            out.println("<div class='message " + cssClass + "'>" + escapeHtml(message) + "</div>");
        }

        out.println("<div class='grid'>");
        out.println("<section class='panel'>");
        out.println("<h2>Add Book</h2>");
        out.println("<form method='post' action='" + contextPath + "/books'>");
        out.println("<div>");
        out.println("<label for='book_title'>Book Title</label>");
        out.println("<input id='book_title' name='book_title' type='text' placeholder='Enter book title' required>");
        out.println("</div>");
        out.println("<div>");
        out.println("<label for='book_author'>Author</label>");
        out.println("<input id='book_author' name='book_author' type='text' placeholder='Enter author name' required>");
        out.println("</div>");
        out.println("<div>");
        out.println("<label for='book_price'>Price</label>");
        out.println("<input id='book_price' name='book_price' type='number' step='0.01' min='0' placeholder='Enter price' required>");
        out.println("</div>");
        out.println("<div>");
        out.println("<label for='quantity'>Quantity</label>");
        out.println("<input id='quantity' name='quantity' type='number' step='1' min='0' placeholder='Enter quantity' required>");
        out.println("</div>");
        out.println("<div class='actions'>");
        out.println("<button class='btn btn-primary' type='submit'>Add Book</button>");
        out.println("<a class='btn btn-secondary' href='" + contextPath + "/books'>Refresh List</a>");
        out.println("</div>");
        out.println("</form>");
        out.println("</section>");

        out.println("<section class='panel'>");
        out.println("<h2>Available Books</h2>");

        if (insertedRow != null) {
            out.println("<div class='pill'>New book was added successfully</div>");
            out.println(insertedRow);
        }

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
                 PreparedStatement ps = conn.prepareStatement(
                         "SELECT book_id, book_title, book_author, book_price, quantity FROM books ORDER BY book_id DESC");
                 ResultSet rs = ps.executeQuery()) {

                out.println("<div class='table-wrap'>");
                out.println("<table>");
                out.println("<tr>");
                out.println("<th>Book ID</th>");
                out.println("<th>Title</th>");
                out.println("<th>Author</th>");
                out.println("<th>Price (&#8377;)</th>");
                out.println("<th>Quantity</th>");
                out.println("</tr>");

                while (rs.next()) {
                    int bookId = rs.getInt("book_id");
                    String title = rs.getString("book_title");
                    String author = rs.getString("book_author");
                    double price = rs.getDouble("book_price");
                    int quantity = rs.getInt("quantity");
                    out.println(renderRow(bookId, title, author, price, quantity));
                }

                out.println("</table>");
                out.println("</div>");
            }
        } catch (ClassNotFoundException e) {
            out.println("<p style='color:#a21b1b;'>Error: MySQL JDBC Driver not found! " + escapeHtml(e.getMessage()) + "</p>");
        } catch (SQLException e) {
            out.println("<p style='color:#a21b1b;'>Database Error: " + escapeHtml(e.getMessage()) + "</p>");
        }

        out.println("</section>");
        out.println("</div>");
        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }

    private String renderRow(int bookId, String title, String author, double price, int quantity) {
        return "<tr>"
                + "<td>" + bookId + "</td>"
                + "<td>" + escapeHtml(title) + "</td>"
                + "<td>" + escapeHtml(author) + "</td>"
                + "<td>&#8377;" + price + "</td>"
                + "<td>" + quantity + "</td>"
                + "</tr>";
    }

    private String renderInsertedRecordCard(int bookId, String title, String author, double price, int quantity) {
        return "<div class='added-record'>"
                + "<h3>Added Record</h3>"
                + "<div class='record-grid'>"
                + recordItem("Book ID", escapeHtml(String.valueOf(bookId)))
                + recordItem("Title", escapeHtml(title))
                + recordItem("Author", escapeHtml(author))
                + recordItem("Price", "&#8377;" + price)
                + recordItem("Quantity", escapeHtml(String.valueOf(quantity)))
                + "</div>"
                + "</div>";
    }

    private String recordItem(String label, String valueHtml) {
        return "<div class='record-item'><span class='record-label'>" + escapeHtml(label) + "</span><span class='record-value'>" + valueHtml + "</span></div>";
    }

    private String trimOrEmpty(String value) {
        return value == null ? "" : value.trim();
    }

    private String escapeHtml(String value) {
        if (value == null) {
            return "";
        }
        return value
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}
