var URL;
if (process.env.NODE_ENV === "production") {
    URL="https://whats-app-backend-pi.vercel.app"
} 
else{
    URL = "http://localhost:8080"
}
var headers = (process.env.NODE_ENV ==="production")?{}:{  'Access-Control-Allow-Origin' : '*',
'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE','Access-Control-Allow-Headers': 'Content-Type'}

export {URL,headers}