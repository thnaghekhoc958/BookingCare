const mysql = require('mysql2');

const email = "' OR 1=1 --";
const password = "test";

const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'medical appointment',
});

let ConnectDB = async () => {
  return new Promise((resolve, reject) => {
    dbConnection.connect((err) => {
      if (err) {
        console.error('Không thể kết nối đến cơ sở dữ liệu:', err);
        reject(err);
      } else {
        console.log('Kết nối đến cơ sở dữ liệu thành công.');
        resolve();
      }
    });
  });
};

// const sqlQuery = `
// SELECT email, roleId, password, name
// FROM Users
// WHERE email = :email AND password = :password
// `;

let handleUserLogin = async (email, password) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("your email:", email);
      console.log("your password:", password);
      console.log('===================ở trên là input đầu vào của người dùng nhập vào!========');
      let userData = {};

      // Chèn trực tiếp giá trị vào câu truy vấn SQL mà không kiểm tra hoặc escape, dễ bị SQL Injection
      const sqlQuery = `
        SELECT email, roleId, password, name
        FROM Users
        WHERE email = '${email}' AND password = '${password}'
      `;
      
      console.log("SQL query đang chạy: ", sqlQuery);

      // Thực hiện truy vấn SQL mà không có bất kỳ biện pháp bảo vệ nào
      dbConnection.execute(sqlQuery, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            userData.errcode = 0;
            userData.errMessage = `Users found success!!!!`;
            userData.user = results[0];
          } else {
            userData.errcode = 1;
            userData.errMessage = `Wrong email or password!`;
          }
          resolve(userData);
        }
      });

    } catch (error) {
      console.error("Error caught:", error);
      reject(error);  // Reject promise nếu có lỗi trong block try-catch
    }
  });
};






// Xuất module
module.exports = { ConnectDB,dbConnection , handleUserLogin };
